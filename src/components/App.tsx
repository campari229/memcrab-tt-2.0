import React from 'react';
import { useSelector } from 'react-redux';
import { getCells } from '../store/store';
import './App.scss';

import { Matrix } from './Matrix/Matrix';
import { Form } from './Form/Form';

export const App = () => {
  const cells = useSelector(getCells);

  return (
    <div className="App"> 
      <Form />
      {
        cells.length
          ? <Matrix />
          : <></>
      }
    </div>
  );
}