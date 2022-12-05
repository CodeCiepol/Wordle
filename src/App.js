import { useState, useEffect, useCallback } from 'react'
import './App.css'
import WordleGrid from './components/WordleGrid'

export default function App() {
  const [word, setWord] = useState('')
  const maxNumbersOfLetters = 10

  const enterIsClicked = () => {
    console.log('Enter clicked')
  }

  const backspaceIsClicked = () => {
    setWord((prevWord) => prevWord.slice(0, -1))
    console.log('Enter clicked')
  
  }

  const detectKeyDown = useCallback(
    (event) => {
      console.log(event)
      if (event.key === 'Enter') enterIsClicked()
      if (event.key === 'Backspace'&&word) backspaceIsClicked() 
      if (event.key === 'Delete') backspaceIsClicked()
      if (event.keyCode < 65 || event.keyCode > 90) return
      if (word.length > maxNumbersOfLetters - 1) return
      setWord((prevWord) => prevWord + event.key.toLowerCase())
    },
    [word]
  )

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown)
    return () => document.removeEventListener('keydown', detectKeyDown)
  }, [word.length, detectKeyDown])

  return (
    <div className="App">
      <WordleGrid letters={word} numbersOfLetters={maxNumbersOfLetters} />
    </div>
  )
}
