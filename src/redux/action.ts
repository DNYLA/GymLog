import { PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { Workout } from '../utils/types';
import { AppDispatch } from './store';

export const SET_PROGRAM = 'SET_PROGRAM';

export const setProgram = (program: Workout[]) => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_PROGRAM,
    payload: program,
  });
};
