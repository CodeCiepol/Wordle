import { useCallback, useState } from 'react'
import dummyWords from '../components/dummyWords'

const useCheckLetterHandler = () => {
  const [newWord, setNewWord] = useState('')
  const [randomWord, setRandomWord] = useState(dummyWords[Math.floor(Math.random() * dummyWords.length)])
  const [checkLetterArray, setCheckLetterArray] = useState([])

  const replaceCharString = (string, index, char) => {
    if (index >= string.length) return string
    return string.substring(0, index) + char + string.substring(index + char.length)
  }

  const findAndReplace = (string, charToFind, CharToReplace) => {
    let stringTemp = string.split('')
    string.split('').every((leter, j) => {
      if (leter === charToFind) {
        stringTemp[j] = CharToReplace
        stringTemp = stringTemp.join('')
        // console.log('znaleziono i podmieniono na:', stringTemp)
        return false
      }
      return true
    })
    return stringTemp
  }

  const stateHandlerBingo = useCallback((letter, i, randomWordTemp,newWordTemp) => {
    if (randomWordTemp[i] === letter) {
      return {
        state: 'bingo',
        randomWordTemp: replaceCharString(randomWordTemp, i, '0'),
        newLetterTemp: "1",
      }
    }
    return { state: 'none', randomWordTemp, newLetterTemp:letter}
  }, [])

  const stateHandlerInclude = useCallback((state, letter, i, randomWordTemp) => {
    if (randomWordTemp.includes(letter)) {
      return { state: 'include', randomWordTemp: findAndReplace(randomWordTemp, letter, '0') }
    }
    return { state: state[i], randomWordTemp }
  }, [])

  const checkLetterHandler = useCallback(() => {
    const checkLetterTemp = []
    let newWordTemp = newWord.split('')
    let randomWordTemp = randomWord
    let obj = {}

    newWordTemp.forEach((letter, i) => {
      obj = stateHandlerBingo(letter, i, randomWordTemp)
      // {state,randomWordTemp}=obj
      randomWordTemp = obj.randomWordTemp
      checkLetterTemp[i] = obj.state
      newWordTemp[i] = obj.newLetterTemp
      console.log('stateHandlerBingo:', randomWordTemp)
    })
    // console.log('BINGO randomWordTemp:', randomWordTemp, 'checkLetterTemp', checkLetterTemp)
    console.log('przedInclude:', randomWordTemp)
    newWordTemp.forEach((letter, i) => {
      obj = stateHandlerInclude(checkLetterTemp, letter, i, randomWordTemp)
      // console.log('objINCLUDE', obj)
      randomWordTemp = obj.randomWordTemp
      checkLetterTemp[i] = obj.state
      console.log('stateHandlerInclude:', randomWordTemp)
    })
    // console.log('INCLUDE randomWordTemp:', randomWordTemp, 'checkLetterTemp', checkLetterTemp)

    let checkLetterArrayTemp = checkLetterArray
    checkLetterArrayTemp.push(checkLetterTemp)
    // console.log('checckLetterArrayTemp', checkLetterArrayTemp)
    setCheckLetterArray(checkLetterArrayTemp)
  }, [newWord, stateHandlerInclude, stateHandlerBingo, randomWord, checkLetterArray])
  return { newWord, setNewWord, checkLetterArray, setCheckLetterArray, randomWord, setRandomWord, checkLetterHandler }
}
export default useCheckLetterHandler
