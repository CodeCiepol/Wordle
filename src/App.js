import { useState,useEffect} from "react";
import "./App.css";
import WordleGrid from "./components/WordleGrid";

export default function App() {
  const [word, setWord] = useState("");

  useEffect(()=>{
    document.addEventListener("keydown", detectKeyDown,true)},[])

  const detectKeyDown = (event) =>{
      if(event.repeat) return
    console.log(event)
    setWord((prevWord) => prevWord + event.key)
  }
  return (
    <div className="App">
      <WordleGrid letters={word}/>
    </div>
  );
}
