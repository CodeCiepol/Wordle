import { useState, useEffect, useCallback } from 'react'
import './App.css'
import InputRow from './components/InputRow'
import WordleGrid from './components/WordleGrid'
import dummyWords from './components/dummyWords'

export default function App() {
  const [newWord, setNewWord] = useState('')
  const [numberOfAttemps, setNumberOfAttemps] = useState(0)
  const maxNumbersOfRows = 5
  const [wordsHodler, setWordsHodler] = useState([])
  const [randomWord, setRandomWord] = useState(dummyWords[Math.floor(Math.random() * dummyWords.length)])
  const maxNumbersOfLetters = randomWord.length

  const enterIsClicked = useCallback(() => {
    console.log({ wordsHodler, newWord, numberOfAttemps })
    setNumberOfAttemps((prev) => prev + 1)
    setWordsHodler((prev) => [...prev, newWord])
    setNewWord('')
    // setRandomWord(dummyWords[Math.floor(Math.random() * dummyWords.length)])
  }, [newWord, numberOfAttemps, wordsHodler])

  const backspaceIsClicked = () => {
    setNewWord((prevWord) => prevWord.slice(0, -1))
  }

  const enterIsAvaible = useCallback(
    (event) => {
      return event.key === 'Enter' && newWord.length === maxNumbersOfLetters && numberOfAttemps < maxNumbersOfRows
    },
    [newWord.length, numberOfAttemps, maxNumbersOfLetters]
  )
  // console.log('dummyWords', dummyWords.length, dummyWords[dummyWords.length - 1])
  console.log('randomWord', randomWord)
  const detectKeyDown = useCallback(
    (event) => {
      if (enterIsAvaible(event)) enterIsClicked()
      console.log(enterIsAvaible(event))
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
        <div>zgadnij jakie to słowo, masz na to {maxNumbersOfRows} prób!</div>
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
