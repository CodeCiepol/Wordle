import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'
import InputRow from './components/InputRow'
import WordleGrid from './components/WordleGrid'
import KeyboardGrid from './components/KeyboardGrid'
import useFetch from './hooks/useFetch'
import useCheckLetterHandler from './hooks/checkLetterHandler'
import Card from './UI/Card'

export default function App() {
  const { sendRequest, error } = useFetch()
  const { newWord, setNewWord, checkLetterArray, setCheckLetterArray, randomWord, setRandomWord, checkLetterHandler } =
    useCheckLetterHandler()
    const [isInclude, setisInclude] = useState(true)
  const [wordsHodler, setWordsHodler] = useState([])
  const maxNumbersOfRows = 5
  const [numberOfAttemps, setNumberOfAttemps] = useState(0)
  const [dictionary, setDictionary] = useState([])
  const [targets, setTargets] = useState([])

  const maxNumbersOfLetters = randomWord.length

  /* fetching dictionaries */
  const fetchTargetsHandler = useCallback(() => {
    const getTargets = (data) => {
      setTargets(data['-NJHz-ZGZ0JKFZzBSXwA'])
      console.log('Targets downloaded')
    }
    sendRequest(getTargets, 'https://wordle-dafa9-default-rtdb.europe-west1.firebasedatabase.app/targets.json')
  }, [sendRequest])

  const fetchDictionaryHandler = useCallback(() => {
    const getTargets = (data) => {
      const dataArray = []
      for (const key in data) {
        dataArray.push(...data[key])
      }
      setDictionary(dataArray)
      console.log('Dictionary downloaded')
    }
    sendRequest(getTargets, 'https://wordle-dafa9-default-rtdb.europe-west1.firebasedatabase.app/dictionary.json')
  }, [sendRequest])

  const wordIncludeHandler =()=>{
    if(dictionary.includes(newWord)){
      console.log("zawarte!")
      return true
    }
    setisInclude(false)
    return false
  }

  const enterIsClicked = useCallback(() => {
    if(wordIncludeHandler()){
      setNumberOfAttemps((prev) => prev + 1)
      setWordsHodler((prev) => [...prev, newWord])
      checkLetterHandler()
      setNewWord('')
      return
    }

    // console.log('słowo jest zawarte w słowniku')
  }, [newWord, setNewWord, checkLetterHandler])

  const backspaceIsClicked = useCallback(() => {
    setNewWord((prevWord) => prevWord.slice(0, -1))
  }, [setNewWord])

  const enterIsAvaible = useCallback(() => {
    return newWord.length === maxNumbersOfLetters && numberOfAttemps < maxNumbersOfRows
  }, [newWord.length, numberOfAttemps, maxNumbersOfLetters])

  const detectKeyDown = useCallback(
    (event) => {
      setisInclude(true)
      if (event.key === 'Enter' && enterIsAvaible()) enterIsClicked()
      if (event.key === 'Backspace' && newWord) backspaceIsClicked()
      if (event.key === 'Delete') backspaceIsClicked()
      if (event.keyCode < 65 || event.keyCode > 90) return
      if (newWord.length > maxNumbersOfLetters - 1) return
      setNewWord((prevWord) => prevWord + event.key.toLowerCase())
    },
    [newWord, setNewWord, backspaceIsClicked, enterIsClicked, maxNumbersOfLetters, enterIsAvaible]
  )
  if (error) {
    console.log('error!', error)
  }

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown)
    return () => document.removeEventListener('keydown', detectKeyDown)
  }, [newWord.length, detectKeyDown])

  const newWordHandler = useCallback(() => {
    let chosenWord = ''
    // console.log(targets)
    for (let i = 0; i < 100; i++) {
      chosenWord = targets[Math.floor(Math.random() * targets.length)]
      if (chosenWord.length === 5) {
        setRandomWord(chosenWord)
        break
      }
    }
    setWordsHodler([])
    setCheckLetterArray([])
    setNumberOfAttemps(0)
  }, [targets, setCheckLetterArray, setNumberOfAttemps, setRandomWord])

  useEffect(() => {
    fetchDictionaryHandler()
    fetchTargetsHandler()
  }, [fetchDictionaryHandler, fetchTargetsHandler])

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    newWordHandler()
    // console.log('wykonano!')
  }, [newWordHandler, targets])

  // console.log('loading?', isLoading)
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
        {!isInclude? 
        <div style={{ color: 'white', backgroundColor: 'red', borderRadius: 10 }}>słowa nie ma w słowniku!</div>
        :<></>
        }
        <Card className="whiteBackground">
          zgadnij jakie to słowo, masz na to {maxNumbersOfRows - numberOfAttemps} prób!
        </Card>
        <button onClick={newWordHandler}>Nowe słowo</button>
        <KeyboardGrid
          wordsHodler={['qwertyuiop', 'asdfghjkl', 'zxcvbnm', 'ąęćśłóżź']}
          clickHandler={detectKeyDown}
        ></KeyboardGrid>
      </div>
    </div>
  )
}
