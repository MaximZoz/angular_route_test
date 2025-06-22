const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Указываем правильное окружение
  transform: {
    "^.+\\.(ts|js|mjs|html)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.spec.json",
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "^@angular/(.*)$": "<rootDir>/node_modules/@angular/$1", // Исправляем путь к модулям Angular
  },
  transformIgnorePatterns: [
    "node_modules/(?!@angular|rxjs)", // Указываем, какие модули нужно трансформировать
  ],
  extensionsToTreatAsEsm: [".ts"], // Указываем, что TypeScript-файлы являются ES-модулями
};
