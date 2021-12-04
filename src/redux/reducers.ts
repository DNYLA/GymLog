import { PayloadAction } from '@reduxjs/toolkit';
import { Workout } from '../utils/types';
import { SET_PROGRAM } from './action';

export type stateType = {
  program: Workout[];
};

const initialState: stateType = {
  program: new Array<Workout>(),
};

function programReducer(
  state = initialState,
  action: PayloadAction<Workout[]>
) {
  switch (action.type) {
    case SET_PROGRAM:
      return { ...state, program: action.payload };
    default:
      return state;
  }
}

export default programReducer;
