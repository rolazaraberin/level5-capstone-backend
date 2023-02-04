"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logState = exports.unproxy = exports.combineMiddleware = exports.combineExtraReducers = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
//MORE REDUX UTILITIES
//https://redux-toolkit.js.org/api/matching-utilities
//https://redux-toolkit.js.org/api/other-exports
function combineExtraReducers(...extraReducers) {
    return function (builder) {
        return extraReducers.forEach((reducer) => {
            // builder.addCase(reducer.fulfilled, (_state: any, _action: any) => {
            builder.addCase(reducer.fulfilled, reducer.after);
        });
    };
}
exports.combineExtraReducers = combineExtraReducers;
function combineMiddleware(...customMiddleware) {
    //ADD CUSTOM MIDDLEWARE TO BUILT-IN MIDDLEWARE
    return function (getDefaultMiddleware) {
        const defaultMiddleware = getDefaultMiddleware();
        let combinedMiddleware = defaultMiddleware;
        customMiddleware.forEach((middleware) => {
            // combinedMiddleware = combinedMiddleware.prepend(middleware);
            combinedMiddleware = combinedMiddleware.concat(middleware);
        });
        return combinedMiddleware;
    };
}
exports.combineMiddleware = combineMiddleware;
function unproxy(state) {
    return (0, toolkit_1.current)(state);
    // return original(state);
}
exports.unproxy = unproxy;
function logState(state) {
    console.log(unproxy(state));
}
exports.logState = logState;
