import { useState, useEffect, useCallback } from 'react'
import './App.css'
import WordleGrid from './components/WordleGrid'

export default function App() {
  const [newWord, setNewWord] = useState('')
  const [numberOfAttemps, setNumberOfAttemps] = useState(0)
  const maxNumbersOfLetters = 8
  const maxNumbersOfRows = 5
  const wordsHodler = [...(new Array(5)).keys()].map(()=>'')
  // let numberOfAttemps = 0
  // for (let i = 0; i < maxNumbersOfLetters; i++) {
  //   wordsHodler.push('')
  // }

  const enterIsClicked = () => {
    console.log({ wordsHodler, newWord, numberOfAttemps })
    setNumberOfAttemps((prev) => prev + 1)
    setNewWord('')
  }

  const backspaceIsClicked = () => {
    setNewWord((prevWord) => prevWord.slice(0, -1))
    // console.log('Enter clicked')
  }

  const detectKeyDown = useCallback(
    (event) => {
      console.log(event)
      if (event.key === 'Enter') enterIsClicked()
      if (event.key === 'Backspace' && newWord) backspaceIsClicked()
      if (event.key === 'Delete') backspaceIsClicked()
      if (event.keyCode < 65 || event.keyCode > 90) return
      if (newWord.length > maxNumbersOfLetters - 1) return
      setNewWord((prevWord) => prevWord + event.key.toLowerCase())
    },
    [newWord,]
  )
  // console.log("numberOfAttemp",numberOfAttemps)
  wordsHodler[numberOfAttemps] = newWord
  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown)
    return () => document.removeEventListener('keydown', detectKeyDown)
  }, [newWord.length, detectKeyDown])

  return (
    <div className="App">
      <WordleGrid
        letters={newWord}
        maxNumbersOfLetters={maxNumbersOfLetters}
        maxNumbersOfRows={maxNumbersOfRows}
        wordsHodler={wordsHodler}
      />
    </div>
  )
}
