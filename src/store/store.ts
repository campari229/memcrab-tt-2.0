import { AnyAction } from 'redux';
import { Cell } from '../Interfaces';
import { getAverageValues, findClosest } from '../lib/Helpers';

const SET_CELLS = 'SET_CELLS';
const ADD_ROW = 'ADD_ROW';
const REMOVE_ROW = 'REMOVE_ROW';
const INCREMENT = 'INCREMENT';
const PERCENTS_TOGGLE = 'PERCENTS_TOGGLE';
const SET_NUMBER_OF_CLOSEST = 'SET_NUMBER_OF_CLOSEST';
const SHOW_CLOSEST = 'SHOW_CLOSEST';

export const setCells = (cells: Cell[][]) => ({
  type: SET_CELLS,
  cells,
});
export const addRow = (row: Cell[]) => ({
  type: ADD_ROW,
  row,
})
export const removeRow = (number: number) => ({
  type: REMOVE_ROW,
  number,
})
export const increment = (id: number, rowIndex: number) => ({
  type: INCREMENT,
  id,
  rowIndex,
})
export const percentsToggle = (rowIndex: number) => ({
  type: PERCENTS_TOGGLE,
  rowIndex,
})
export const showClosest = (target: Cell) => ({
  type: SHOW_CLOSEST,
  target,
})
export const setNumberOfClosest = (numberOfClosest: number) => ({
  type: SET_NUMBER_OF_CLOSEST,
  numberOfClosest,
})

export const getCells = (state: InitialState) => state.cells;
export const getTableFooter = (state: InitialState) => state.tableFooter;

type InitialState = {
  cells: Cell[][];
  tableFooter: Cell[];
  numberOfClosest: number;
};

const initialState = {
  cells: [],
  tableFooter: [],
  numberOfClosest: 0,
};



export const reducer = (state: InitialState = initialState, action: AnyAction ) => {
  switch (action.type) {
    case 'SET_CELLS':
      return {
        ...state,
        cells: action.cells,
        tableFooter: getAverageValues(action.cells),
      };

    case 'ADD_ROW':
      return {
        ...state,
        cells: [
          ...state.cells,
          action.row,
        ],
        tableFooter: getAverageValues([...state.cells, action.row])
      };

    case 'REMOVE_ROW':
      const filteredCells = state.cells.filter((_, index) => index !== action.number)
      return {
        ...state,
        cells: filteredCells,
        tableFooter: getAverageValues(filteredCells),
      }

    case 'INCREMENT':
      const cells = [...state.cells]
      const incrementedCell = cells[action.rowIndex].find(cell => cell.id === action.id);
      if (incrementedCell) {
        incrementedCell.amount++;
      }
      return {
        ...state,
        ...cells,
        tableFooter: getAverageValues(cells),
      }

      case 'PERCENTS_TOGGLE':
        const percentsCells = [...state.cells]
        percentsCells[action.rowIndex] = percentsCells[action.rowIndex].map(cell => ({
          ...cell,
          isPercentsShown: !cell.isPercentsShown
        }))
        return {
          ...state,
          cells: percentsCells,
        }

      case 'SET_NUMBER_OF_CLOSEST':
        return {
          ...state,
          numberOfClosest: action.numberOfClosest,
        }

      case 'SHOW_CLOSEST':
        const closest = findClosest(state.cells, action.target, state.numberOfClosest);
        const closestCells = [...state.cells];
        closestCells.forEach(row => {
          row.forEach(cell => {
            if (closest.includes(cell)) {
              cell.isCloser = !cell.isCloser
            }
          })
        })
        return {
          ...state,
          cells: closestCells,
        };

    default:
      return state;
  }
};
