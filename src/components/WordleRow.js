import Card from '../UI/Card'

const WordleRow = (props) => {
  // const classobj=`letter ${props.checkLetterArray[0]}`
  const letterList = props.letters
    .padEnd(props.maxNumbersOfLetters)
    .split('')
    .map((letter,i) => (
      <Card className={`square ${props.checkLetterArray[i]}`} key={Math.random()}>
        <div className={`letter`}>{letter.toUpperCase()}</div>
        {/* <div>{props.checkLetterArray[i]}</div> */}
      </Card>
    ))
  return <div className="row">{letterList}</div>
}
export default WordleRow
