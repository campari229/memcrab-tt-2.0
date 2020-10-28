import { Cell } from '../Interfaces';

let id = 1;

const createRandomNumber = () => {
  return Math.floor(Math.random() * (900) + 100);
};

export const rowCreator = (columns: number): Cell[] => {
  const row = []
  for (let i = 0; i < columns; i++) {
    const amount = createRandomNumber()
    row.push({
      amount,
      id: id,
      isPercentsShown: false,
      isCloser: false,
    });
    id++;
  }

  return row;
}



export const cellsCreator = (rows: number, columns: number): Cell[][] => {
  const cells = [];

  for (let i = 0; i < rows; i++) {
    cells.push(rowCreator(columns))
  }

  return cells;
}

export const getAverageValues = (array: Cell[][]): Cell[] => {
  let row = [];
  for (let i = 0; i < array[0].length; i++) {
    let sum = 0;
    for (let j = 0; j < array.length; j++) {
      sum += array[j][i].amount
    }
    row.push({
      amount: Math.round(sum / array.length),
      id
    });

    id++;
  }
  return row
};

export const findClosest = (array: Cell[][], target: Cell, numberOfClosest: number): Cell[] => {
  const fullArray = array.flat()
  const arrayWithoutTarget = fullArray.filter((cell: Cell) => cell.id !== target.id)
  fullArray.sort((a: Cell, b: Cell) => a.amount - b.amount);
  const closestArray: Cell[] = [];
  
  while (closestArray.length < numberOfClosest) {
    let closest = arrayWithoutTarget[0];
    for (let i = 0; i < arrayWithoutTarget.length; i++) {
      if (Math.abs(target.amount - arrayWithoutTarget[i].amount) < Math.abs(target.amount - closest.amount)) {
        closest = arrayWithoutTarget[i];
      }
    }
    arrayWithoutTarget.splice(arrayWithoutTarget.indexOf(closest), 1);
    closestArray.push(closest);
  }

  return closestArray
} 
