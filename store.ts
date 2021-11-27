import { configureStore } from '@reduxjs/toolkit';
import { routineSlice } from './src/utils/slices/routineSlice';

export const store = configureStore({
  reducer: {
    routine: routineSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
