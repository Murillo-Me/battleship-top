import './index.html';
import './style.css';

console.log('test');

const shipList = [];
const gameboardList = [];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function create2DArray({
  rows,
  columns,
  defaultValue,
}) {
  return Array.from({ length: rows }, () => (
    Array.from({ length: columns }, () => defaultValue)
  ));
}

const shipFactory = (size, shipOrient) => {
  const shipID = shipList.length + 1;

  if (!shipOrient) {
    if (Math.random() < 0.5) shipOrient = 'vertical';
    else shipOrient = 'horizontal';
  }

  const hitsTaken = Array(size).fill(false);

  const hit = (hitPosition) => {
    if (hitPosition > (size - 1)) {
      return 'error';
      // throw new Error('hitPosition > size');
    }

    if (!hitsTaken[hitPosition]) {
      hitsTaken[hitPosition] = true;
      return 'success';
    }
    return 'already hit before';
  };

  const isSunk = () => (hitsTaken.reduce((total, curr) => total + curr) >= size);

  return {
    shipID, size, shipOrient, hit, isSunk,
  };
};

const gameboardFactory = (boardSize = 10) => {
  const board = create2DArray({ rows: boardSize, columns: boardSize, defaultValue: 0 });
  const boardID = gameboardList.length + 1;
  const shipsOnBoard = [];

  const emptyTheBoard = () => {
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        board[i][j] = 0;
      }
    }
    return board;
  };

  const placeShip = (shipObject, yCoord, xCoord) => {
    if (!yCoord) {
      do {
        yCoord = getRandomIntInclusive(0, boardSize - 1);
      } while (((boardSize - 1) - xCoord) > shipObject.size || shipObject.shipOrient === 'vertical');
    }

    if (!xCoord) {
      do {
        xCoord = getRandomIntInclusive(0, boardSize - 1);
      } while (((boardSize - 1) - xCoord) > shipObject.size || shipObject.shipOrient === 'vertical');
    }

    for (let i = 0; i < shipObject.size; i += 1) {
      if (shipObject.shipOrient === 'vertical') {
        board[yCoord + i][xCoord] = shipObject.shipID;
      } else {
        board[yCoord][xCoord + i] = shipObject.shipID;
      }
    }

    shipsOnBoard.push(shipObject);
  };

  // eslint-disable-next-line consistent-return
  const identifyShipHitPosition = (shipObject, yCoord, xCoord) => {
    let shipHitPosition = 1;
    for (let i = 1; i < shipObject.size + 1; i += 1) {
      if (shipObject.shipOrient === 'vertical') {
        if (board[yCoord - i][xCoord] === board[yCoord][xCoord]) {
          shipHitPosition += 1;
        } else return shipHitPosition;
      }
      if (shipObject.shipOrient === 'horizontal') {
        if (board[yCoord][xCoord - i] === board[yCoord][xCoord]) {
          shipHitPosition += 1;
        } else return shipHitPosition;
      }
    }
  };

  // eslint-disable-next-line consistent-return
  const receiveAttack = (shipArray, yAttackCoord, xAttackCoord) => {
    if (board[yAttackCoord][xAttackCoord] < 0) return 'already tried';

    if (board[yAttackCoord][xAttackCoord] === 0) {
      board[yAttackCoord][xAttackCoord] = -10;
      return 'missed';
    }

    if (board[yAttackCoord][xAttackCoord] > 0) {
      const shipID = board[yAttackCoord][xAttackCoord];
      const hitPos = identifyShipHitPosition(shipArray[shipID], yAttackCoord, xAttackCoord);
      shipArray[shipID].hit(hitPos);
      board[yAttackCoord][xAttackCoord] = -100;
      return 'success';
    }
  };

  const allShipsSunk = () => {
    let shipsSunkState = true;
    shipsOnBoard.forEach((ship) => {
      shipsSunkState *= ship.isSunk();
    });

    return shipsSunkState;
  };

  return {
    board, boardID, boardSize, placeShip, emptyTheBoard, receiveAttack, allShipsSunk, shipsOnBoard,
  };
};

const playerFactory = (playerID, name, isAI = false) => {
  let score = 0;
  const AIMemory = [];

  const win = () => {
    score += 1;
  };

  const AIPlay = (gameboard) => {
    let yCoord = 0;
    let xCoord = 0;

    do {
      yCoord = getRandomIntInclusive(0, gameboard.boardSize - 1);
      xCoord = getRandomIntInclusive(0, gameboard.boardSize - 1);
    } while (!AIMemory.contains(`${yCoord}, ${xCoord}`));
    gameboard.receiveAttack(shipList, yCoord, xCoord);
    AIMemory.push(`${yCoord}, ${xCoord}`);
  };

  return {
    playerID, name, isAI, score, win, AIPlay,
  };
};

function createBoardDOM(gameboard) {
  const gameboardElement = document.querySelector(`.gb-id-${gameboard.boardID}`);
  for (let i = 0; i < gameboard.boardSize; i += 1) {
    for (let j = 0; j < gameboard.boardSize; j += 1) {
      const boardUnitElement = document.createElement('div');
      boardUnitElement.classList.add('board-unit', `.r${i}-c${j}`);
      gameboardElement.appendChild(boardUnitElement);
    }
  }
}

function receiveAttackDOM() {

}

const gameboard1 = gameboardFactory(10);
gameboardList.push(gameboard1);
const gameboard2 = gameboardFactory(10);
gameboardList.push(gameboard2);

createBoardDOM(gameboard1);
createBoardDOM(gameboard2);

const allBoardUnits = document.querySelectorAll('.board-unit');
allBoardUnits.forEach((unit) => unit.addEventListener('click', (e) => { e.currentTarget.style['background-color'] = 'white'; }));

export { shipFactory, gameboardFactory, playerFactory };

// module.exports = { shipFactory, gameboardFactory, playerFactory };
