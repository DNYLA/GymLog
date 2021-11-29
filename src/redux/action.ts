import { Dispatch } from 'react';
import { Day } from '../utils/types';

export const SET_WORKOUT = 'SET_WORKOUT';

export const setWorkout = (workout: Day[]) => (dispatch: any) => {
  dispatch({
    type: SET_WORKOUT,
    payload: workout,
  });
};
