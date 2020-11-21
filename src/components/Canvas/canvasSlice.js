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
      // {
      //   id: utils.uid(),
      //   x: 200,
      //   y: 200,
      //   type: "frame",
      //   background: ["#cccccc"],
      //   width: 200,
      //   height: 100,
      //   children: [
      //     {
      //       id: utils.uid(),
      //       x: 10,
      //       y: 10,
      //       type: "rectangle",
      //       background: ["#aa99bcc"],
      //       width: 50,
      //       height: 80,
      //     },
      //   ],
      // },
      {
        id: utils.uid(),
        x: 120,
        y: 50,
        type: "rectangle",
        background: ["#ccff99"],
        width: 500,
        height: 200,
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
        background: ["#abcdef"],
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
