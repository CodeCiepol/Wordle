import { useState, useEffect, useCallback } from 'react'
import './App.css'
import InputRow from './components/InputRow'
import WordleGrid from './components/WordleGrid'
import dummyWords from './components/dummyWords'
import Card from './UI/Card'

export default function App() {
  const [newWord, setNewWord] = useState('')
  const maxNumbersOfRows = 5
  const [wordsHodler, setWordsHodler] = useState([])
  const [numberOfAttemps, setNumberOfAttemps] = useState(0)
  const [checkLetterArray, setCheckLetterArray] = useState([])
  const [randomWord, setRandomWord] = useState(dummyWords[Math.floor(Math.random() * dummyWords.length)])
  const maxNumbersOfLetters = randomWord.length

  const replaceCharString = (string, index, char) => {
    if (index >= string.length) return string
    return string.substring(0, index) + char + string.substring(index + char.length)
  }

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

  const stateHandler = useCallback((letter, i, randomWordTemp) => {
    if (randomWordTemp[i] === letter) {
      return { state: 'bingo', randomWordTemp: replaceCharString(randomWordTemp, i, '0') }
    }

    if (randomWordTemp.includes(letter)) {
      console.log('litera', letter, 'includes w stateHandlerze')
      return { state: 'include', randomWordTemp: findAndReplace(randomWordTemp, letter, '0') }
    }
    return { state: 'none', randomWordTemp }
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
      obj = stateHandler(letter, i, randomWordTemp)
      // console.log("obj",obj)
      randomWordTemp = obj.randomWordTemp
      checkLetterTemp[i] = obj.state
      // checkLetterTemp.push({ letter, state })

      // for (const taskKey in checkLetter) {
      //   if (!(letter === checkLetter[taskKey].letter)) {
      //     state = stateHandler(letter, i)
      //     checkLetterTemp.push({ letter, state })
      //   }
      // }
    })
    console.log('checkLetterTemp', checkLetterTemp)
    let checkLetterArrayTemp = checkLetterArray
    checkLetterArrayTemp.push(checkLetterTemp)
    console.log('checckLetterArrayTemp', checkLetterArrayTemp)
    setCheckLetterArray(checkLetterArrayTemp)
  }, [newWord, numberOfAttemps, stateHandler, randomWord,checkLetterArray])

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
        <Card className="whiteBackground">zgadnij jakie to słowo, masz na to {maxNumbersOfRows} prób!</Card>
        <button onClick={newWordHandler}>Nowe słowo</button>
        {/* <WordleGrid
          maxNumbersOfLetters={0}
          maxNumbersOfRows={maxNumbersOfRows}
          wordsHodler={['qwertyuiop','asdfghjkl','zxcvbnm']}
        /> */}
      </div>
    </div>
  )
}
