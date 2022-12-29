import ReactDOM from "react-dom";
import classes from "./PopUp.module.css"
const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}/>;
  };
  const PopUpOverlay = (props) => {
    return (
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    );
  };
const portalElement = document.getElementById('overlays');
const PopUp =(props)=>{
return <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
      {ReactDOM.createPortal(<PopUpOverlay>{props.children}</PopUpOverlay>, portalElement)}
</>
}

export default PopUp