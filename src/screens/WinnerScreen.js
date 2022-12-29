import PopUp from "../UI/PopUp";
const WinnerScreen=(props)=>{
return(
    <PopUp onClose={props.newGame}>
        <div>Correct answer is:</div>
        <div>{props.randomWord}</div>

        <button onClick={props.newGame}>new game</button>
    </PopUp>
)
}
export default WinnerScreen