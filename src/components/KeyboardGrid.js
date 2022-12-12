import Card from '../UI/Card'


const KeyboardGrid = (props) => {
  const singleKeyboardRow = (word) =>
    word.split('').map((letter, j) => (
      // {const obj={key: letter, keyCode=70}}
      <div key={Math.random()} onClick={()=>props.clickHandler({key: letter, keyCode: 70})}>
        <Card className="square keyboard" >
          <div className={`letter keyboard`}>{letter.toUpperCase()}</div>
        </Card>
      </div>
    ))

  const LettersGrid = props.wordsHodler.map((word, i) => <div key={Math.random()} className="row">{singleKeyboardRow(word) }</div>)

  return <div style={{ marginTop: 10 }}>{LettersGrid}</div>
}
export default KeyboardGrid
