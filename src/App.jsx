import { useState } from "react";
import Frontpage from "./Frontpage";
import "./table.css";

const App = () => {
  const [grid, setGrid] = useState([]);
  const [originalGrid, setOriginalGrid] = useState([]);
  const [showGame, setGame] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [solvedGrid, setSolvedGrid] = useState([]);
  const [chancesLeft, setChancesLeft] = useState(5);
  const [wrongCells, setWrongCells] = useState({});

  async function handleStartGame() {
    try {
      const result = await fetch("http://127.0.0.1:8000/generate");
      const data = await result.json();
      console.log(data.solution)

      setSolvedGrid(data.solution);
      setGrid(data.puzzle);
      setOriginalGrid(data.puzzle);

      setWrongCells({});
      setChancesLeft(5);
      setSelectedCell(null);

      setGame(true);
    } catch (e) {
      console.error("error fetching", e);
    }
  }

  function handleInputChange(e, i, j) {
    if (chancesLeft === 0) return;

    const value = Number(e.target.value);

    const newGrid = grid.map((row, rowIndex) =>
      row.map((c, colIndex) =>
        rowIndex === i && colIndex === j ? value : c
      )
    );

    setGrid(newGrid);

    const key = `${i}-${j}`;
    const isCorrect = value === solvedGrid[i][j];

    if (isCorrect) {
      setWrongCells(prev => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    } else {
      setChancesLeft(prev => {
        const next = prev - 1;
        if (next === 0) alert("Game Over");
        return next;
      });

      setWrongCells(prev => ({
        ...prev,
        [key]: true
      }));
    }
  }

  function handleSelectionHighlight(i, j) {
    setSelectedCell({ row: i, col: j });
  }

  function getCellClass(currentRow, currentCol) {
    let classes = ["sudoku-cell"];

    const key = `${currentRow}-${currentCol}`;

    if (solvedGrid[currentRow][currentCol] === grid[currentRow][currentCol]) {
      classes.push("correct");
    }

    if (wrongCells[key]) {
      classes.push("wrong");
    }

    if (selectedCell) {
      const { row, col } = selectedCell;

      if (currentRow === row && currentCol === col) {
        classes.push("selected");
      }

      if (currentRow === row || currentCol === col) {
        classes.push("highlight");
      }
    }

    return classes.join(" ");
  }

  return (
    <div>
      {!showGame ? (
        <Frontpage handleStartGame={handleStartGame} />
      ) : (
        <div className="backgroundApp">
          
          <div style={{ fontSize: "24px", marginBottom: "10px" } } className="hearts">
            {"❤️".repeat(chancesLeft)}
          </div>

          <table className="sudoku-table">
            <tbody>
              {grid.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={getCellClass(i, j)}
                      onClick={() => handleSelectionHighlight(i, j)}
                    >
                      {originalGrid[i] && originalGrid[i][j] === 0 ? (
                        <input
                          type="number"
                          min={1}
                          max={9}
                          value={cell === 0 ? "" : cell}
                          onChange={(e) => handleInputChange(e, i, j)}
                          className="sudoku-input"
                          disabled={grid[i][j] === solvedGrid[i][j]}
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
        </div>
      )}
    </div>
  );
};

export default App;