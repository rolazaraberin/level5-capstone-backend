import { matchIsEqual } from "scripts/utilityFunctions";
import { item, action, state } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import { findLastIndex } from "lodash";
import { getItems } from "./database";

const slice = createSlice({
  name: "cart",
  // initialState: getInitialState(),
  initialState: getInitialState,
  reducers: {
    addItem: _addItem as any,
    removeItem: _removeItem as any,
  },
});

export default slice.reducer;
export const { addItem, removeItem } = slice.actions;

/*****************************************/

function getInitialState() {
  // async function getInitialState() {
  // const items = await getItems();
  const items: item[] = [
    { name: "laptop", price: 1000 },
    { name: "case", price: 30 },
    { name: "charger", price: 15 },
    { name: "stylus", price: 35 },
    { name: "mouse", price: 10 },
    { name: "keyboard", price: 15 },
  ];
  const cart: item[] = [];
  const total = 0;
  return { items, cart, total };
}

function _addItem(state: state, action: action<item>) {
  state.cart.push(action.payload);
  state.total += action.payload.price;
}

function _removeItem(state: state, action: action<item>) {
  const index = findLastIndex(state.cart, matchIsEqual(action.payload));
  if (index >= 0) {
    state.cart.splice(index, 1);
    state.total -= action.payload.price;
  }
}
