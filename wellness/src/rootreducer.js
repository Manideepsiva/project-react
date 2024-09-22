import testnamereducer from './slices/testnameslice'
import booknamereducer from './slices/booktestslice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    test: testnamereducer,  
    appBook:booknamereducer
   
  });

export default rootReducer;
