import { useState } from "react";
import { useDataContext, useDataContextReset, useDataContextUpdate } from "../../context/DataContext";
import { getCellState } from "../../utils/dataHelper";
import { FiboCoordinates, findFibonacci } from "../../utils/fibonacciHelper";
import Cell from "../Cell/Cell";
import './Grid.css';

const Grid = () => {
  const data = useDataContext();
  const updateCells = useDataContextUpdate();
  const resetData = useDataContextReset();

  const [col, setCol] = useState<number>(-1);
  const [row, setRow] = useState<number>(-1);
  const [fib, setFib] = useState<FiboCoordinates[]>([]);

  const handleCellClick = (row: number, col: number) => {
    updateCells(row, col);
    setRow(row);
    setCol(col);

    const fibArray = findFibonacci(data, row, col);
    setFib(fibArray);

    setTimeout(() => {
      setRow(-1);
      setCol(-1);
      setTimeout(() => {
        resetData(fibArray)
        setFib([]);
      }, 500)
    }, 100)
  }


  return (
    <div className="container">
      <table>
        <tbody>
          {data.map((cells: number[], i: number) => (
            <tr key={i}>
              {cells.map((cell: number, j: number) => (
                <td key={j}>
                  <Cell data={cell} onClick={() => handleCellClick(i, j)} state={getCellState(row, col, i, j, fib)}/>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Grid