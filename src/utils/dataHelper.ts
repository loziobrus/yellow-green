import { FiboCoordinates, isFibonacciPart } from "./fibonacciHelper";

export const getMockData = () => {
  let data: number[][] = [];

  for(let i = 0; i < 50; i++) {
    data.push([])
    for(let j = 0; j < 50; j++)
      data[i].push(0)
  }

  return data;
}

export const dataIncrement = (data: number[][], setData: Function, i: number, j: number) => {
  let newData = [...data];

  newData[i].forEach((value, index) => {
    if(index !== j)
      newData[i][index]++;
  });

  newData.forEach((value, index) => {
    newData[index][j]++;
  });  
  
  setData(newData)
}

export const dataReset = (data: number[][], setData: Function, fib: FiboCoordinates[]) => {
  let newData = [...data];

  newData.forEach((r, i) => {
    r.forEach((c, j) => {
      if(isFibonacciPart(fib, i, j)) {
        newData[i][j] = 0;
      }
    })
  })
  
  setData(newData)
}

export const getCellState = (row: number, col: number, i: number, j: number, fib: FiboCoordinates[]) => {
  if(isFibonacciPart(fib, i, j))
    return 'fibonacci'

  if(i === row || j === col)
    return 'increased';
  
  return 'static';
}