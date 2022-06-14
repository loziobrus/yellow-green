import { FC } from 'react';
import './Cell.css' 

const Cell: FC<CellProps> = ({ data, onClick, state }) => (
  <div className={state} onClick={onClick}>{data}</div>
);

interface CellProps {
  data: number,
  onClick: () => void,
  state?: string
}

export default Cell