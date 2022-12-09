import WordleRow from './WordleRow'

const WordleGrid = (props) => {
  console.log(props.checkLetterArray[0])
  const LettersGrid = props.wordsHodler.map((word,i) => (
    <WordleRow letters={word} maxNumbersOfLetters={props.maxNumbersOfLetters} key={Math.random()} checkLetterArray={props.checkLetterArray[i]}/>
  ))
  return <div>{LettersGrid}</div>
}
export default WordleGrid
