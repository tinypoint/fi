import { createSlice } from "@reduxjs/toolkit";
import { utils } from "pixi.js";
import * as jsonutils from "./utils/json";

const createInitState = () => {
  return {
    id: utils.uid(),
    x: 0,
    y: 0,
    type: "artboard",
    children: [
      {
        id: utils.uid(),
        x: 50,
        y: 50,
        type: "rectangle",
        alpha: 1,
        visible: true,
        backgrounds: [
          {
            colorType: "solid",
            color: "#ffccaa",
            visible: true,
            alpha: 1,
          },
        ],
        strokeAlignment: 0,
        strokeWidth: 1,
        strokes: [
          {
            color: "#000000",
            colorType: "solid",
            visible: true,
          },
        ],
        width: 200,
        height: 180,
        angle: 0,
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
    activednav: "cursor",
    cacheposi: {},
  },
  reducers: {
    add: (state, action) => {
      const { payload = {} } = action;
      const { type, x, y, width, height } = payload;
      const node = {
        id: utils.uid(),
        type,
        x,
        y,
        width,
        height,
        backgrounds: ["#abcdef"],
        children: [],
      };

      state.json.children.push(node);
      state.select = [node.id];
      state.activednav = "cursor";
    },
    select: (state, action) => {
      state.select = [action.payload];
    },
    clearSelect: (state) => {
      state.select = [];
    },
    hover: (state, action) => {
      state.hover = action.payload;
    },
    clearHover: (state) => {
      state.sehoverlect = [];
    },
    changeCachePosi: (state, action) => {
      state.cacheposi = {
        ...(action.payload || {}),
      };
    },
    propchange: (state, action) => {
      const newjson = JSON.parse(JSON.stringify(state.json));
      jsonutils.changeprops(newjson, action.payload);
      state.json = newjson;
    },
    changeActivedNav: (state, action) => {
      state.activednav = action.payload;
    },
  },
});

export const {
  add,
  select,
  clearSelect,
  hover,
  clearHover,
  propchange,
  increment,
  decrement,
  incrementByAmount,
  changeActivedNav,
  changeCachePosi,
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
