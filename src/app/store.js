import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import canvasReducer from '../components/Canvas/canvasSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    canvas: canvasReducer
  },
});
