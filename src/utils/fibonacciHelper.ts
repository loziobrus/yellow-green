export interface FiboCoordinates {
  start: {
    row: number,
    col: number
  },
  end: {
    row: number,
    col: number
  },
}

export const findFibonacci = (data: number[][], row: number, col: number) => {
  let fiboIndexes: FiboCoordinates[] = []

  //check row
  const checkRow = checkArray(data[row], 2, data[row].length - 1);
  checkRow.forEach(r => {
    fiboIndexes.push({ start: { row, col: r.start }, end: { row, col: r.end }})
  })

  //check adjacent columns
  data[row].forEach((c, index) => {
    //taking closest 8 closest cells from top and bottom
    const checkAdjCols = checkArray(data.map(r => r[index]), row - 4, row + 5);
    checkAdjCols.forEach(r => {
      fiboIndexes.push({ start: { row: r.start, col: index }, end: { row: r.end, col: index }})
    })
  }) 

  //check column
  const checkCol = checkArray(data.map(r => r[col]), 2, data.length - 1);
  checkCol.forEach(r => {
    fiboIndexes.push({ start: { row: r.start, col }, end: { row: r.end, col }})
  })

  //check adjacent rows
  data.forEach((r, index) => {
    //taking closest 8 closest cells from left and right
    const checkAdjRows = checkArray(r, col - 4, col + 5);
    checkAdjRows.forEach(ar => {
      fiboIndexes.push({ start: { row: index, col: ar.start }, end: { row: index, col: ar.end }})
    })
    console.log(checkAdjRows)
  }) 

  return fiboIndexes;
}

//checks if an array has a fibonacci sequence of 5 elements
const checkArray = (array: number[], startIndex: number, endIndex: number) => {  
  let count = 2, start = startIndex;
  let range: { start: number, end: number }[] = []

  if(array[startIndex] > array[startIndex + 1] || array[startIndex] === 0)
    return range;

  for (let i = startIndex + 2; i <= endIndex; i++) {
    if ((array[i - 1] + array[i - 2]) === array[i] && array[i] !== 0) {
      if(count === 2) {
        start = i - 2
      }

      count++;

      if(count === 5) {
        range.push({ start, end: i });
        count = 2; 
        start = 0; 
      }
    } else {
      count = 2; 
      start = 0; 
    }
  }

  return range;
}

// checks if the cell is a part of any fibonacci sequence
export const isFibonacciPart = (fib: FiboCoordinates[], i: number, j: number) => {
  for(let k = 0; k < fib.length; k++) {
    //if it is a row sequence
    if(fib[k].start.row === fib[k].end.row && fib[k].start.row === i) {
      if(fib[k].start.col <= j && fib[k].end.col >= j) {
        return true;
      }
    }
    //if it is a column sequence
    if(fib[k].start.col === fib[k].end.col && fib[k].start.col === j) {
      if(fib[k].start.row <= i && fib[k].end.row >= i) {
        return true;
      }
    }
  }

  return false;
}