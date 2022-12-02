import ReactDOM from "react-dom";
import Card from "./Card";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onReset} />;
};

const Overlay = (props) =>{
    return(
        <Card className="modal">
            <div>{props.winner==="3"? "Draw!": `Player ${props.winner} wins!`}</div>
            <button className="button" onClick={props.onReset}>New Game</button>
        </Card>
    )
}

const WinnerWindow = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onReset={props.newGame} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Overlay winner={props.winner} onReset={props.newGame} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
export default WinnerWindow;
