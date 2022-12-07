import WordleRow from './WordleRow'

const WordleGrid = (props) => {
  const LettersGrid = props.wordsHodler.map((word) => (
    <WordleRow letters={word} maxNumbersOfLetters={props.maxNumbersOfLetters} key={Math.random()} />
  ))
  return <div>{LettersGrid}</div>
}
export default WordleGrid