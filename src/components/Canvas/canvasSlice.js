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
    value: 0,
  },
  reducers: {
    add: (state, action) => {
      // console.log(action)
      const node = {
        id: uid(12),
        type: action.payload,
        x: Math.random() * 200,
        y: Math.random() * 200,
        width: Math.random() * 200,
        height: Math.random() * 200,
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
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
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
