import { PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { Day } from '../utils/types';
import { AppDispatch } from './store';

export const SET_PROGRAM = 'SET_PROGRAM';

export const setProgram = (program: Day[]) => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_PROGRAM,
    payload: program,
  });
};
