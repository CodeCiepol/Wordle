import Card from '../UI/Card'

const WordleRow = (props) => {
  const letterList = props.letters
    .padEnd(props.maxNumbersOfLetters)
    .split('')
    .map((letter) => (
      <Card className="square" key={Math.random()}>
        <div className="letter">{letter}</div>
      </Card>
    ))
  return <div className="row">{letterList}</div>
}
export default WordleRow
