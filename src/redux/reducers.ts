import { PayloadAction } from '@reduxjs/toolkit';
import { ProgramType, Workout } from '../utils/types';
import { SET_PROGRAM } from './action';

const initialState: ProgramType = {
  name: 'Generic Program',
  owner: '0',
  items: new Array<Workout>(),
};

function programReducer(
  state = initialState,
  action: PayloadAction<ProgramType>
) {
  switch (action.type) {
    case SET_PROGRAM:
      return action.payload;
    default:
      return state;
  }
}

export default programReducer;
