import { createSlice } from "@reduxjs/toolkit";
import { utils } from "pixi.js";
import { uid } from "uid";
import * as jsonutils from './utils/json';

const createInitState = () => {
  return {
    id: uid(12),
    x: 0,
    y: 0,
    type: "artboard",
    children: [
      {
        id: uid(12),
        x: 100,
        y: 20,
        type: "rectangle",
        background: ["#cccccc"],
        width: 200,
        height: 100,
        children: [
          {
            x: 10,
            y: 10,
            type: "rectangle",
            background: ["#aa99bcc"],
            width: 50,
            height: 80,
          },
        ],
      },
      {
        id: uid(12),
        x: 120,
        y: 50,
        type: "rectangle",
        background: ["#008899"],
        width: 100,
        height: 100,
      },
    ],
  };
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    json: createInitState(),
    select: [],
    hover: [],
    activednav: 'frame',
  },
  reducers: {
    add: (state, action) => {
      const { payload = {} } = action;
      const { type, x, y, width, height } = payload;
      const node = {
        id: uid(12),
        type,
        x,
        y,
        width,
        height,
        background: ["#abcdef"],
        children: [],
      };

      state.json.children.push(node);
    },
    select: (state, action) => {
      state.select = [action.payload];
    },
    propchange: (state, action) => {
      const newjson = JSON.parse(JSON.stringify(state.json));
      jsonutils.changeprops(newjson, action.payload);
      state.json = newjson;
    },
  },
});

export const {
  add,
  select,
  propchange,
  increment,
  decrement,
  incrementByAmount,
} = canvasSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export default canvasSlice.reducer;
