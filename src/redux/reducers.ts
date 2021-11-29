import { SET_WORKOUT } from './action';

const initialState = {
  workout: [],
};

function workoutReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_WORKOUT:
      return { ...state, workout: action.payload };
    default:
      return state;
  }
}

export default workoutReducer;
