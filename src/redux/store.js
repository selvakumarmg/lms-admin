import { configureStore } from '@reduxjs/toolkit';
import customerSlice from './slices/customerSlice';

import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";
import { combineReducers, } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";


const encryptor = encryptTransform({
  secretKey: "101DDDJJNN@34444444~`T`+Tll",
  onError: function (error) {
    console.error("Encryption Error:", error);
  },
});


const persistConfig = {
  key: 'root0091',
  version: 1,
  transforms: [encryptor],
  storage
}

const rootReducer = combineReducers({

  customer: customerSlice
})

const persitedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persitedReducer,

})
