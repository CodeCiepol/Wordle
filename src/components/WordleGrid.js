import Card from "../UI/Card";

const WordleGrid = (props) => {
    
    const letterList = props.letters.padEnd(props.numbersOfLetters).split("").map((letter) => (
      <Card className="square" key={Math.random()}>

        <div className="letter">{letter}</div>
      </Card>
    ));
  return <div className="row">{letterList}</div>;
};
export default WordleGrid;
