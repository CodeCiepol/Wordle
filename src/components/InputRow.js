import Card from '../UI/Card'

const InputRow = (props) => {
  const letterList = props.letters
    .padEnd(props.maxNumbersOfLetters)
    .split('')
    .map((letter) => (
      <Card className="square" key={Math.random()}>
        <div className="letter">{letter.toUpperCase()}</div>
      </Card>
    ))
  return <div className="row">{letterList}</div>
}
export default InputRow
