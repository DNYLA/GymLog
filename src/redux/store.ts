import { createStore, combineReducers, applyMiddleware } from 'redux';
import workoutReducer from './reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ workoutReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
