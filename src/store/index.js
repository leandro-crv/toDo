import { configureStore } from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import toDoReducer from './reducers/toDoReducer';
import { combineReducers } from "redux";

const persistConfig = {
    key:'root',
    storage:storage,
    stateReconciler: hardSet
    
}

const appReducer = combineReducers({
    toDoReducer
  })
  
  export const rootReducer = (state,action) => {
    return appReducer(state,action);
  }

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);

export {store, persistor};