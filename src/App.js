import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'
import InputRow from './components/InputRow'
import WordleGrid from './components/WordleGrid'
import KeyboardGrid from './components/KeyboardGrid'
import useFetch from './hooks/useFetch'
import useCheckLetterHandler from './hooks/checkLetterHandler'
import Card from './UI/Card'
import EndScreen from './screens/EndScreen'

export default function App() {
  const { sendRequest, error } = useFetch()
  const { newWord, setNewWord, checkLetterArray, setCheckLetterArray, randomWord, setRandomWord, checkLetterHandler } =
    useCheckLetterHandler()
  const [isWrongWord, setIsWrongWord] = useState(false)
  const [wordsHodler, setWordsHodler] = useState([])
  const maxNumbersOfRows = 5
  const [numberOfAttemps, setNumberOfAttemps] = useState(0)
  const [dictionary, setDictionary] = useState([])
  const [targets, setTargets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [nrSolved, setNrSolved] = useState(0)
  const [nrTried, setNrTried] = useState(0)
  const [endScreenApperance, setEndScreenApperance] = useState(false)
  const [isWin, setIsWin] = useState(false)

  const maxNumbersOfLetters = randomWord.length

  /* fetching dictionaries */
  const fetchTargetsHandler = useCallback(() => {
    const getTargets = (data) => {
      setTargets(data['-NJHz-ZGZ0JKFZzBSXwA'])
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
    }
    sendRequest(getTargets, 'https://wordle-dafa9-default-rtdb.europe-west1.firebasedatabase.app/dictionary.json')
  }, [sendRequest])

  const fetchUsersHandler = useCallback(() => {
    const getTargets = (data) => {
      setNrSolved(data['solved'])
      setNrTried(data['tried'])
    }
    sendRequest(getTargets, 'https://wordle-dafa9-default-rtdb.europe-west1.firebasedatabase.app/users.json')
  }, [sendRequest])

  //popraw tą funkcje zrefaktoruj is in dicitonary
  const wordIncludeHandler = useCallback(() => {
    if (dictionary.includes(newWord)) {
      return true
    }
    setIsWrongWord(true)
    return false
  }, [newWord, dictionary])

  const enterIsClicked = useCallback(() => {
    if (wordIncludeHandler()) {
      setNumberOfAttemps((prev) => prev + 1)
      setWordsHodler((prev) => [...prev, newWord])
      checkLetterHandler()
      setNewWord('')
      if (newWord === randomWord) {
        setEndScreenApperance(true)
        setIsWin(true)
      }
      return
    }
  }, [newWord, randomWord, setNewWord, checkLetterHandler, wordIncludeHandler])

  const backspaceIsClicked = useCallback(() => {
    setNewWord((prevWord) => prevWord.slice(0, -1))
  }, [setNewWord])

  const enterIsAvaible = useCallback(() => {
    return newWord.length === maxNumbersOfLetters && numberOfAttemps < maxNumbersOfRows
  }, [newWord.length, numberOfAttemps, maxNumbersOfLetters])

  const detectKeyDown = useCallback(
    (event) => {
      setIsWrongWord(false)
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
  function showDataHandler() {
    console.log(nrSolved)
    console.log(nrTried)
  }

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown)
    return () => document.removeEventListener('keydown', detectKeyDown)
  }, [newWord.length, detectKeyDown])

  useEffect(() => {
    if (numberOfAttemps === maxNumbersOfRows) {
      setEndScreenApperance(true)
    }
  }, [numberOfAttemps])

  const find5LettersWord = useCallback(() => {
    const chosenWord = targets[Math.floor(Math.random() * targets.length)]
    if (chosenWord.length === 5) {
      setRandomWord(chosenWord)
      return
    }
    return find5LettersWord()
  }, [targets, setRandomWord])

  const newWordHandler = useCallback(() => {
    find5LettersWord()
    setWordsHodler([])
    setCheckLetterArray([])
    setNumberOfAttemps(0)
    setEndScreenApperance(false)
    setIsWin(false)
  }, [setCheckLetterArray, setNumberOfAttemps, find5LettersWord])

  useEffect(() => {
    fetchDictionaryHandler()
    fetchTargetsHandler()
    fetchUsersHandler()
  }, [fetchDictionaryHandler, fetchTargetsHandler, fetchUsersHandler])

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    newWordHandler()
    setIsLoading(false)
  }, [newWordHandler, targets])

  return (
    <div className="App">
      {isLoading ? (
        <Card className="loadingScreen">ładowanie...</Card>
      ) : (
        <div className="Game">
          {endScreenApperance && <EndScreen newGame={newWordHandler} randomWord={randomWord} isWin={isWin} />}
          <WordleGrid
            maxNumbersOfLetters={maxNumbersOfLetters}
            maxNumbersOfRows={maxNumbersOfRows}
            wordsHodler={wordsHodler}
            checkLetterArray={checkLetterArray}
          />
          <InputRow letters={newWord} maxNumbersOfLetters={maxNumbersOfLetters}></InputRow>
          {isWrongWord ? (
            <div style={{ color: 'white', backgroundColor: 'red', borderRadius: 10 }}>
              tego słowa nie ma w słowniku!
            </div>
          ) : (
            <></>
          )}
          <Card className="whiteBackground">
            zgadnij jakie to słowo, pozostało {maxNumbersOfRows - numberOfAttemps} prób!
          </Card>
          <button onClick={newWordHandler}>Nowe słowo</button>
          {/* <button onClick={showDataHandler}>Poka statystyki</button> */}
          <KeyboardGrid
            wordsHodler={['qwertyuiop', 'asdfghjkl', 'zxcvbnm', 'ąęćśłóżź']}
            clickHandler={detectKeyDown}
          ></KeyboardGrid>
        </div>
      )}
    </div>
  )
}
