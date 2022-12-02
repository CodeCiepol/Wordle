import Card from "../UI/Card";

const WordleGrid = (props) => {
    
    const letterList = props.letters.padEnd(5).split("").map((letter) => (
      <Card className="square">
        <div className="letter">{letter}</div>
      </Card>
    ));
  return <div className="row">{letterList}</div>;
};
export default WordleGrid;
