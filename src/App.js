import { useState, useEffect, useCallback } from 'react'
import './App.css'
import InputRow from './components/InputRow'
import WordleGrid from './components/WordleGrid'

export default function App() {
  const [newWord, setNewWord] = useState('')
  const [numberOfAttemps, setNumberOfAttemps] = useState(0)
  const maxNumbersOfLetters = 8
  const maxNumbersOfRows = 5
  const [wordsHodler, setWordsHodler] = useState([])

  const enterIsClicked = () => {
    console.log({ wordsHodler, newWord, numberOfAttemps })
    setNumberOfAttemps((prev) => prev + 1)
    setWordsHodler((prev) => [...prev, newWord])
    setNewWord('')
  }
  const backspaceIsClicked = () => {
    setNewWord((prevWord) => prevWord.slice(0, -1))
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
    [newWord]
  )

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown)
    return () => document.removeEventListener('keydown', detectKeyDown)
  }, [newWord.length, detectKeyDown])

  return (
    <div className="App">
      <div className="Game">
        <WordleGrid
          maxNumbersOfLetters={maxNumbersOfLetters}
          maxNumbersOfRows={maxNumbersOfRows}
          wordsHodler={wordsHodler}
        />
        <InputRow letters={newWord} maxNumbersOfLetters={maxNumbersOfLetters}></InputRow>
        {/* <WordleGrid
          maxNumbersOfLetters={0}
          maxNumbersOfRows={maxNumbersOfRows}
          wordsHodler={['qwertyuiop','asdfghjkl','zxcvbnm']}
        /> */}
      </div>
    </div>
  )
}
