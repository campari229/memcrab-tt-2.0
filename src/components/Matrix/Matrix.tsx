import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCells, getTableFooter, addRow, removeRow, increment, percentsToggle, showClosest } from '../../store/store';
import { rowCreator } from '../../lib/Helpers';

import './Matrix.scss';

export const Matrix: React.FC = () => {
  const dispatch = useDispatch();
  const cells = useSelector(getCells);
  const tableFooter = useSelector(getTableFooter);

  return (
    <table className="table">
      <tbody className="table__body">
        {cells.map((row, i)=> (
          <tr className="table__row" key={i}>
            <td className="table__button-wrapper">
              <button className="table__button-remove" onClick={() => dispatch(removeRow(i))}>Remove row</button>
            </td>
            {row.map(cell => (
              <td
                key={cell.id}
                onClick={() => dispatch(increment(cell.id, i))}
                onMouseOver={() => dispatch(showClosest(cell))}
                onMouseOut={() => dispatch(showClosest(cell))}
                className={cell.isCloser ? 'table__cell table__cell-closest' : 'table__cell'}
              >
                <p className="table__text">
                  {cell.isPercentsShown
                    ? `${Math.round((cell.amount / row.reduce((acumulator, cell) => acumulator + cell.amount, 0)) * 100)}%`
                    : cell.amount
                  }
                </p>
                <div
                  className="table__percents"
                  style={
                    cell.isPercentsShown
                      ? {height: `${Math.round((cell.amount / row.reduce((acumulator, cell) => acumulator + cell.amount, 0)) * 100)}%`}
                      : {height: "0"}
                  }
                />
              </td>
            ))}
            <td
              className="table__cell-sum"
              onMouseOver={() => dispatch(percentsToggle(i))}
              onMouseOut={() => dispatch(percentsToggle(i))}
            >
              {row.reduce((acumulator, cell) => acumulator + cell.amount, 0)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot className="table__footer">
        <tr className ="table__row">
          {tableFooter.map(cell => (
            <td key={cell.id} className="table__cell-avarange">
              {cell.amount}
            </td>
          ))}
          <td className="table__button-wrapper">
            <button className="table__button-new" onClick={() => dispatch(addRow(rowCreator(cells[0].length)))}>add row</button>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

