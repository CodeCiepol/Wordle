import Card from '../UI/Card'

const KeyboardGrid = (props) => {
  const singleKeyboardRow = (word) =>
    word.split('').map((letter, j) => (
      // {const obj={key: letter, keyCode=70}}
      <div key={Math.random()} onClick={() => props.clickHandler({ key: letter, keyCode: 70 })}>
        <Card className="square keyboard">
          <div className={`letter keyboard`}>{letter.toUpperCase()}</div>
        </Card>
      </div>
    ))
  // function display(){
  //   {console.log("siema")}
  //   <div>spacja</div>
  // }

  const LettersGrid = props.wordsHodler.map((word, i) => (
    <div key={Math.random()} className="row">
      {i === 2 ? (
        <div onClick={() => props.clickHandler({ key: 'Backspace', keyCode: '1' })}>
          <Card className="square additional backspace">Delete</Card>
        </div>
      ) : (
        <></>
      )}
      {singleKeyboardRow(word)}
      {i === 2 ? (
        <div onClick={() => props.clickHandler({ key: 'Enter', keyCode: '1' })}>
          <Card className="square additional">Enter</Card>
        </div>
      ) : (
        <></>
      )}
    </div>
  ))

  return <div style={{ marginTop: 10 }}>{LettersGrid}</div>
}
export default KeyboardGrid
