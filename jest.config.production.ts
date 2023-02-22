/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "build",
  testPathIgnorePatterns: ["bak", "index.test.js"],
};
