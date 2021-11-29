import { PayloadAction } from '@reduxjs/toolkit';
import { Day } from '../utils/types';
import { SET_PROGRAM } from './action';

export type stateType = {
  program: Day[];
};

const initialState: stateType = {
  program: new Array<Day>(),
};

function programReducer(state = initialState, action: PayloadAction<Day[]>) {
  switch (action.type) {
    case SET_PROGRAM:
      return { ...state, program: action.payload };
    default:
      return state;
  }
}

export default programReducer;
