import { PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { ProgramType } from '../utils/types';
import { AppDispatch } from './store';

export const SET_PROGRAM = 'SET_PROGRAM';

export const setProgram = (program: ProgramType) => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_PROGRAM,
    payload: program,
  });
};
