import { useState, useEffect, useCallback } from 'react'
import './App.css'
import InputRow from './components/InputRow'
import WordleGrid from './components/WordleGrid'
import dummyWords from './components/dummyWords'
import KeyboardGrid from './components/KeyboardGrid'
// import dictionary 
import Card from './UI/Card'

export default function App() {
  const [newWord, setNewWord] = useState('')
  const maxNumbersOfRows = 5
  const [wordsHodler, setWordsHodler] = useState([])
  const [numberOfAttemps, setNumberOfAttemps] = useState(0)
  const [checkLetterArray, setCheckLetterArray] = useState([])
  const [error, setError] = useState('no error')
  const [randomWord, setRandomWord] = useState(dummyWords[Math.floor(Math.random() * dummyWords.length)])
  const maxNumbersOfLetters = randomWord.length

  const replaceCharString = (string, index, char) => {
    if (index >= string.length) return string
    return string.substring(0, index) + char + string.substring(index + char.length)
  }

  const fetchWordHandler = async () => {
    try {
      const response = await fetch('https://wordlegame.org/files/wordle/pl/dictionary.json', {
        method: 'get',
        // headers:{
        //   "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        //   "Accept-Encoding": "gzip, deflate, br",
        //   "Accept-Language":"pl,en-US;q=0.7,en;q=0.3",
        //   "Connection": "keep-alive",
        //   "Host": "wordlegame.org",
        //   "Sec-Fetch-Dest":"document",
        //   "Sec-Fetch-Mode": "navigate",
        //   "Sec-Fetch-Site": "cross-site",
        //   // "Upgrade-Insecure-Requests":"1",
        //   // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:107.0) Gecko/20100101 Firefox/107.0"
        // }
      })
      if (!response.ok) {
        throw new Error("couldn't fetch")
      }
      const data = await response.json()
      console.log("fetch",data)
    } catch (error) {
      setError(error.message)
    }
  }
  console.log("ERRORS:",error)
  const findAndReplace = (string, charToFind, CharToReplace) => {
    let stringTemp = string.split('')
    string.split('').every((leter, j) => {
      console.log('index', j, 'includes w findAndReplace', string, charToFind, CharToReplace)
      if (leter === charToFind) {
        stringTemp[j] = CharToReplace
        stringTemp = stringTemp.join('')
        console.log('znaleziono i podmieniono na:', stringTemp)
        return false
      }
      return true
    })
    return stringTemp
  }

  const stateHandlerBingo = useCallback((letter, i, randomWordTemp) => {
    if (randomWordTemp[i] === letter) {
      return { state: 'bingo', randomWordTemp: replaceCharString(randomWordTemp, i, '0') }
    }
    return { state: 'none', randomWordTemp }
  }, [])

  const stateHandlerInclude = useCallback((state, letter, i, randomWordTemp) => {
    if (randomWordTemp.includes(letter)) {
      console.log('litera', letter, 'includes w stateHandlerze')
      return { state: 'include', randomWordTemp: findAndReplace(randomWordTemp, letter, '0') }
    }
    return { state: state[i], randomWordTemp }
  }, [])

  // const stateHandler = (letter, i, randomWordTemp) => {
  //   if (randomWordTemp[i] === letter) {
  //     // randomWordTemp.slice(i)
  //     return {state:"bingo",tekst:"dupa"}
  //   }

  //   if (randomWordTemp.includes(letter)) return {state:"bingo",tekst:"dupa"}

  //   return {state:"bingo",tekst:"dupa"}
  // }

  console.log('randomWord', randomWord)

  const checkLetterHandler = useCallback(() => {
    const checkLetterTemp = []
    let newWordTemp = newWord.split('')
    let randomWordTemp = randomWord
    console.log(randomWordTemp.slice(1))
    let obj = {}

    newWordTemp.forEach((letter, i) => {
      obj = stateHandlerBingo(letter, i, randomWordTemp)
      randomWordTemp = obj.randomWordTemp
      checkLetterTemp[i] = obj.state
    })
    console.log('BINGO randomWordTemp:', randomWordTemp, 'checkLetterTemp', checkLetterTemp)

    newWordTemp.forEach((letter, i) => {
      obj = stateHandlerInclude(checkLetterTemp, letter, i, randomWordTemp)
      console.log('objINCLUDE', obj)
      randomWordTemp = obj.randomWordTemp
      checkLetterTemp[i] = obj.state
    })
    console.log('INCLUDE randomWordTemp:', randomWordTemp, 'checkLetterTemp', checkLetterTemp)

    let checkLetterArrayTemp = checkLetterArray
    checkLetterArrayTemp.push(checkLetterTemp)
    console.log('checckLetterArrayTemp', checkLetterArrayTemp)
    setCheckLetterArray(checkLetterArrayTemp)
  }, [newWord, stateHandlerInclude, stateHandlerBingo, randomWord, checkLetterArray])

  const enterIsClicked = useCallback(() => {
    setNumberOfAttemps((prev) => prev + 1)
    setWordsHodler((prev) => [...prev, newWord])
    checkLetterHandler()
    console.log('checkLetterArray', checkLetterArray)
    setNewWord('')
  }, [newWord, checkLetterArray, checkLetterHandler])

  const backspaceIsClicked = () => {
    setNewWord((prevWord) => prevWord.slice(0, -1))
  }

  const enterIsAvaible = useCallback(() => {
    return newWord.length === maxNumbersOfLetters && numberOfAttemps < maxNumbersOfRows
  }, [newWord.length, numberOfAttemps, maxNumbersOfLetters])

  const detectKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' && enterIsAvaible()) enterIsClicked()
      if (event.key === 'Backspace' && newWord) backspaceIsClicked()
      if (event.key === 'Delete') backspaceIsClicked()
      if (event.keyCode < 65 || event.keyCode > 90) return
      if (newWord.length > maxNumbersOfLetters - 1) return
      setNewWord((prevWord) => prevWord + event.key.toLowerCase())
    },
    [newWord, enterIsClicked, maxNumbersOfLetters, enterIsAvaible]
  )

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown)
    return () => document.removeEventListener('keydown', detectKeyDown)
  }, [newWord.length, detectKeyDown])

  const newWordHandler = () => {
    setRandomWord(dummyWords[Math.floor(Math.random() * dummyWords.length)])
    setWordsHodler([])
    setCheckLetterArray([])
    setNumberOfAttemps(0)
  }

  return (
    <div className="App">
      <div className="Game">
        <WordleGrid
          maxNumbersOfLetters={maxNumbersOfLetters}
          maxNumbersOfRows={maxNumbersOfRows}
          wordsHodler={wordsHodler}
          checkLetterArray={checkLetterArray}
        />
        <InputRow letters={newWord} maxNumbersOfLetters={maxNumbersOfLetters}></InputRow>
        <Card className="whiteBackground">
          zgadnij jakie to słowo, masz na to {maxNumbersOfRows - numberOfAttemps} prób!
        </Card>
        <button onClick={newWordHandler}>Nowe słowo</button>
        <button
          style={{ marginLeft: 10, marginTop: 10 }}
          onClick={() => {
            detectKeyDown({ key: 'Backspace', keyCode: '1' })
          }}
        >
          Backspace
        </button>
        <button
          style={{ marginLeft: 10, marginTop: 10 }}
          onClick={() => {
            detectKeyDown({ key: 'Enter', keyCode: '1' })
          }}
        >
          Enter
        </button>
        <button onClick={fetchWordHandler}>pobierz slowa</button>
        <div>{/* <input value={"klawiatura telefonu"}></input> */}</div>
        <KeyboardGrid wordsHodler={['qwertyuiop', 'asdfghjkl', 'zxcvbnm']} clickHandler={detectKeyDown}></KeyboardGrid>
        {/* <WordleGrid
          maxNumbersOfLetters={0}
          maxNumbersOfRows={maxNumbersOfRows}
          wordsHodler={['qwertyuiop','asdfghjkl','zxcvbnm']}
        /> */}
      </div>
    </div>
  )
}
