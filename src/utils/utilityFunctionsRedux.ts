import { current, original } from "@reduxjs/toolkit";

//MORE REDUX UTILITIES
//https://redux-toolkit.js.org/api/matching-utilities
//https://redux-toolkit.js.org/api/other-exports

export function combineExtraReducers(
  ...extraReducers: { after: Function; [property: string]: any }[]
) {
  return function (builder: any) {
    return extraReducers.forEach((reducer: any) => {
      // builder.addCase(reducer.fulfilled, (_state: any, _action: any) => {
      builder.addCase(reducer.fulfilled, reducer.after);
    });
  };
}

export function combineMiddleware(...customMiddleware: any) {
  //ADD CUSTOM MIDDLEWARE TO BUILT-IN MIDDLEWARE
  return function (getDefaultMiddleware: any) {
    const defaultMiddleware = getDefaultMiddleware();
    let combinedMiddleware = defaultMiddleware;
    customMiddleware.forEach((middleware: any) => {
      // combinedMiddleware = combinedMiddleware.prepend(middleware);
      combinedMiddleware = combinedMiddleware.concat(middleware);
    });
    return combinedMiddleware;
  };
}

export function unproxy(state: any) {
  return current(state);
  // return original(state);
}

export function logState(state: any) {
  console.log(unproxy(state));
}
