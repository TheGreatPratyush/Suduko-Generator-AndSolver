import { useState } from "react";
import Frontpage from "./Frontpage";
import "./table.css";




const App = () => {
  const [grid, setGrid] = useState([]);
  const [originalGrid, setOriginalGrid] = useState([]);
  const [showGame,setGame]=useState(false)
  const [selectedCell, setSelectedCell] = useState(null);

  async function handleStartGame() {
    try {
      const result = await fetch("http://127.0.0.1:8000/generate");
      const data = await result.json();

      setGrid(data.puzzle);
      setOriginalGrid(data.puzzle); 
      setGame(true)
    } catch (e) {
      console.error("error fetching", e);
    }
  }

  function handleInputChange(e, i, j) {
    const value = e.target.value;

    const newGrid = grid.map((row, rowIndex) =>
      row.map((c, colIndex) => {

        if (rowIndex === i && colIndex === j) {
          return Number(value); 
        } else {
          return c;
        }
      })
    );

    setGrid(newGrid);
  }



  function handleSelectionHighlight(i,j){
    setSelectedCell({row:i,col:j})
  }


  function getCellClass(curretRow,currentCol){
    if (selectedCell==null){
      return ""
    }
    const {row,col}= selectedCell

  if (curretRow === row && currentCol === col) {
    return "selected";
  }
    if (curretRow==row || currentCol==col){
      return "highlight"
    }
  
    return ""

  }

  return (
    <div>
      {!showGame?<Frontpage handleStartGame={handleStartGame} />:(
      <div className="backgroundApp">
          <table className="sudoku-table">
            <tbody>
              {grid.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={`sudoku-cell ${getCellClass(i,j)}`} onClick={()=>{handleSelectionHighlight(i,j)}}>
                      {originalGrid[i] && originalGrid[i][j] === 0 ? (
                        <input
                          type="number"
                          min={1}
                          max={9}
                          value={cell === 0 ? "" : cell}
                          onChange={(e) => handleInputChange(e, i, j)}
                          className="sudoku-input"
                        />
                      ) : (
                        <span className="fixed-cell">{cell}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
      </div>)}
    </div>
  );
};

export default App;