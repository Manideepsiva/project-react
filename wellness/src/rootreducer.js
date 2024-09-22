import testnamereducer from './slices/testnameslice'
import booknamereducer from './slices/booktestslice';
import patientDetailsreducer from './slices/patientDetailsSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    test: testnamereducer,  
    appBook:booknamereducer,
    patbook:patientDetailsreducer,
   
  });

export default rootReducer;
