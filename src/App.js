import { useState, useEffect, useCallback } from 'react'
import './App.css'
import InputRow from './components/InputRow'
import WordleGrid from './components/WordleGrid'
import dummyWords from './components/dummyWords'
import Card from './UI/Card'

export default function App() {
  const [newWord, setNewWord] = useState('')
  const [numberOfAttemps, setNumberOfAttemps] = useState(0)
  const maxNumbersOfRows = 5
  const [wordsHodler, setWordsHodler] = useState([])
  const [checkLetter, setCheckLetter] = useState([{}])
  const [randomWord, setRandomWord] = useState(dummyWords[Math.floor(Math.random() * dummyWords.length)])
  const maxNumbersOfLetters = randomWord.length

  const stateHandler = (letter, i, randomWordTemp) => {
    if (randomWordTemp[i] === letter) {
      console.log("randomWordTemp in stateHandlerze slice", randomWordTemp.slice(i))//tępa pało slice działa na arrey, ty masz string
      console.log("randomWordTemp in stateHandlerze",randomWordTemp)
      return {state:'bingo', randomWordTemp: randomWordTemp }
    }
    
    if (randomWordTemp.includes(letter)) return { state: 'include', randomWordTemp: randomWordTemp }

    return { state: 'none', randomWordTemp }
  }

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
    let state = ''
    const checkLetterTemp = []
    let newWordTemp = newWord
    let randomWordTemp = randomWord
    let obj={}
    newWordTemp.split('').forEach((letter, i) => {
      obj = stateHandler(letter, i, randomWordTemp)
      console.log("obj",obj)
      randomWordTemp=obj.randomWordTemp
      console.log(randomWordTemp) 
      // checkLetterTemp.push({ letter, state })

      // for (const taskKey in checkLetter) {
      //   if (!(letter === checkLetter[taskKey].letter)) {
      //     state = stateHandler(letter, i)
      //     checkLetterTemp.push({ letter, state })
      //   }
      // }
    })
    setCheckLetter(checkLetterTemp)
  }, [newWord, stateHandler, checkLetter, randomWord])

  const enterIsClicked = useCallback(() => {
    setNumberOfAttemps((prev) => prev + 1)
    setWordsHodler((prev) => [...prev, newWord])
    checkLetterHandler()
    setNewWord('')
  }, [newWord, checkLetterHandler])
  console.log(checkLetter)

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
        />
        <InputRow letters={newWord} maxNumbersOfLetters={maxNumbersOfLetters}></InputRow>
        <Card>zgadnij jakie to słowo, masz na to {maxNumbersOfRows} prób!</Card>
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
