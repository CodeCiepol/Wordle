import Card from '../UI/Card'

function clickHandler(letter) {
  console.log(letter)
}

const KeyboardGrid = (props) => {
  const singleKeyboardRow = (word) =>
    word.split('').map((letter, j) => (
      <div onClick={()=>clickHandler(letter)}>
        <Card className="square keyboard">
          <div className={`letter keyboard`}>{letter.toUpperCase()}</div>
        </Card>
      </div>
    ))

  const LettersGrid = props.wordsHodler.map((word, i) => <div className="row">{singleKeyboardRow(word)}</div>)

  return <div style={{ marginTop: 10 }}>{LettersGrid}</div>
}
export default KeyboardGrid
