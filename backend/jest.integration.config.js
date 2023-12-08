module.exports = {
  ...require("./jest.config.js"),
  testMatch: ["**/*.test.ts"],
  roots: ["<rootDir>/src", "<rootDir>/tests/external"],
};
