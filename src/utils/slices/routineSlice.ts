import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Day } from '../types';

export const defaultDay: Day = {
  name: 'Default',
  exercises: [],
};

export const routineSlice = createSlice({
  name: 'routine',
  initialState: {
    value: [defaultDay],
  },
  reducers: {
    setRoutine: (state, action: PayloadAction<Day[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setRoutine } = routineSlice.actions;
