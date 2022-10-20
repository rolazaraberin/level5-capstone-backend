import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = configureStore({ reducer: reducer });

export default store;

//CONFIGURE STORE - https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#using-configurestore
