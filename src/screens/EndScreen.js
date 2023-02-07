import PopUp from '../UI/PopUp'
const EndScreen = (props) => {
  return (
    <PopUp onClose={props.newGame}>
      {props.isWin ? <div>Gratulacje!</div> : <div>Może następnym razem!</div>}
      <div>Poprawne słowo to:</div>
      <div>{props.randomWord}</div>

      <button onClick={props.newGame}>new game</button>
    </PopUp>
  )
}
export default EndScreen
