import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from '../sections/Canvas/canvasSlice';

export default configureStore({
  reducer: {
    canvas: canvasReducer
  },
});
