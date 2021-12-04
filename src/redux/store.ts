import { createStore, combineReducers, applyMiddleware } from 'redux';
import programReducer from './reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ programReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
