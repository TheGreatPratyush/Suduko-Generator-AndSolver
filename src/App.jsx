import { useState } from "react";

const App = () => {
  const [grid, setGrid] = useState([]);
  const [originalGrid, setOriginalGrid] = useState([]);

  async function handleStartGame() {
    try {
      const result = await fetch("http://127.0.0.1:8000/generate");
      const data = await result.json();

      setGrid(data.puzzle);
      setOriginalGrid(data.puzzle); // store original

    } catch (e) {
      console.error("error fetching", e);
    }
  }

  function handleInputChange(e, i, j) {
    const value = e.target.value;

    const newGrid = grid.map((row, rowIndex) =>
      row.map((c, colIndex) => {
        if (rowIndex === i && colIndex === j) {
          return Number(value); // "" → 0 automatically
        } else {
          return c;
        }
      })
    );

    setGrid(newGrid);
  }

  return (
    <div>
      <button onClick={handleStartGame}>Start Game</button>

      <table style={{ marginTop: "20px", borderCollapse: "collapse" }}>
        <tbody>
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    border: "1px solid black",
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                  }}
                >
                  {originalGrid[i] && originalGrid[i][j] === 0 ? (
                    <input
                      type="number"
                      min={1}
                      max={9}
                      value={cell === 0 ? "" : cell}
                      onChange={(e) => handleInputChange(e, i, j)}
                      style={{
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        border: "none",
                      }}
                    />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;