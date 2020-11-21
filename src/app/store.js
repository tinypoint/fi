import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from '../components/Canvas/canvasSlice';

export default configureStore({
  reducer: {
    canvas: canvasReducer
  },
});
