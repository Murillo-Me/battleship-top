/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship-top/./src/style.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"shipFactory\": () => (/* binding */ shipFactory),\n/* harmony export */   \"gameboardFactory\": () => (/* binding */ gameboardFactory),\n/* harmony export */   \"playerFactory\": () => (/* binding */ playerFactory)\n/* harmony export */ });\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n\n// import './assets/images/flames.png';\n\nconsole.log('test');\n\nconst shipList = [];\nconst gameboardList = [];\n\nfunction getRandomIntInclusive(min, max) {\n  min = Math.ceil(min);\n  max = Math.floor(max);\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\nfunction create2DArray({\n  rows,\n  columns,\n  defaultValue,\n}) {\n  return Array.from({ length: rows }, () => (\n    Array.from({ length: columns }, () => defaultValue)\n  ));\n}\n\nconst shipFactory = (size, shipOrient) => {\n  const shipID = shipList.length + 1;\n\n  if (!shipOrient) {\n    if (Math.random() < 0.5) shipOrient = 'vertical';\n    else shipOrient = 'horizontal';\n  }\n\n  const hitsTaken = Array(size).fill(false);\n\n  const hit = (hitPosition) => {\n    if (hitPosition > (size - 1)) {\n      return 'error';\n      // throw new Error('hitPosition > size');\n    }\n\n    if (!hitsTaken[hitPosition]) {\n      hitsTaken[hitPosition] = true;\n      return 'success';\n    }\n    return 'already hit before';\n  };\n\n  const isSunk = () => (hitsTaken.reduce((total, curr) => total + curr) >= size);\n\n  return {\n    shipID, size, shipOrient, hit, isSunk,\n  };\n};\n\nconst gameboardFactory = (boardSize = 10) => {\n  const board = create2DArray({ rows: boardSize, columns: boardSize, defaultValue: 0 });\n  const shipsOnBoard = [];\n\n  const emptyTheBoard = () => {\n    for (let i = 0; i < board.length; i += 1) {\n      for (let j = 0; j < board[i].length; j += 1) {\n        board[i][j] = 0;\n      }\n    }\n    return board;\n  };\n\n  const placeShip = (shipObject, yCoord, xCoord) => {\n    if (!yCoord) {\n      do {\n        yCoord = getRandomIntInclusive(0, boardSize - 1);\n      } while (((boardSize - 1) - xCoord) > shipObject.size || shipObject.shipOrient === 'vertical');\n    }\n\n    if (!xCoord) {\n      do {\n        xCoord = getRandomIntInclusive(0, boardSize - 1);\n      } while (((boardSize - 1) - xCoord) > shipObject.size || shipObject.shipOrient === 'vertical');\n    }\n\n    for (let i = 0; i < shipObject.size; i += 1) {\n      if (shipObject.shipOrient === 'vertical') {\n        board[yCoord + i][xCoord] = shipObject.shipID;\n      } else {\n        board[yCoord][xCoord + i] = shipObject.shipID;\n      }\n    }\n\n    shipsOnBoard.push(shipObject);\n  };\n\n  // eslint-disable-next-line consistent-return\n  const identifyShipHitPosition = (shipObject, yCoord, xCoord) => {\n    let shipHitPosition = 1;\n    for (let i = 1; i < shipObject.size + 1; i += 1) {\n      if (shipObject.shipOrient === 'vertical') {\n        if (board[yCoord - i][xCoord] === board[yCoord][xCoord]) {\n          shipHitPosition += 1;\n        } else return shipHitPosition;\n      }\n      if (shipObject.shipOrient === 'horizontal') {\n        if (board[yCoord][xCoord - i] === board[yCoord][xCoord]) {\n          shipHitPosition += 1;\n        } else return shipHitPosition;\n      }\n    }\n  };\n\n  // eslint-disable-next-line consistent-return\n  const receiveAttack = (shipArray, yAttackCoord, xAttackCoord) => {\n    if (board[yAttackCoord][xAttackCoord] < 0) return 'already tried';\n\n    if (board[yAttackCoord][xAttackCoord] === 0) {\n      board[yAttackCoord][xAttackCoord] = -10;\n      return 'missed';\n    }\n\n    if (board[yAttackCoord][xAttackCoord] > 0) {\n      const shipID = board[yAttackCoord][xAttackCoord];\n      const hitPos = identifyShipHitPosition(shipArray[shipID], yAttackCoord, xAttackCoord);\n      shipArray[shipID].hit(hitPos);\n      board[yAttackCoord][xAttackCoord] = -100;\n      return 'success';\n    }\n  };\n\n  const allShipsSunk = () => {\n    let shipsSunkState = true;\n    shipsOnBoard.forEach((ship) => {\n      shipsSunkState *= ship.isSunk();\n    });\n\n    return shipsSunkState;\n  };\n\n  return {\n    board, boardSize, placeShip, emptyTheBoard, receiveAttack, allShipsSunk, shipsOnBoard,\n  };\n};\n\nconst playerFactory = (playerID, name, isAI = false) => {\n  let score = 0;\n  const AIMemory = [];\n\n  const win = () => {\n    score += 1;\n  };\n\n  const AIPlay = (gameboard) => {\n    let yCoord = 0;\n    let xCoord = 0;\n\n    do {\n      yCoord = getRandomIntInclusive(0, gameboard.boardSize - 1);\n      xCoord = getRandomIntInclusive(0, gameboard.boardSize - 1);\n    } while (!AIMemory.contains(`${yCoord}, ${xCoord}`));\n    gameboard.receiveAttack(shipList, yCoord, xCoord);\n    AIMemory.push(`${yCoord}, ${xCoord}`);\n  };\n\n  return {\n    playerID, name, isAI, score, win, AIPlay,\n  };\n};\n\n\n\n// module.exports = { shipFactory, gameboardFactory, playerFactory };\n\n\n//# sourceURL=webpack://battleship-top/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;