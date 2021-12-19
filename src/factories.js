import { getRandomIntInclusive, create2DArray } from './functions';

const shipFactory = (shipList, size, shipOrient) => {
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

const gameboardFactory = (gameboardList, boardSize = 10) => {
  const boardArray = create2DArray({ rows: boardSize, columns: boardSize, defaultValue: 0 });
  const boardID = gameboardList.length + 1;
  const shipsOnBoard = [];

  const emptyTheBoard = () => {
    for (let i = 0; i < boardArray.length; i += 1) {
      for (let j = 0; j < boardArray[i].length; j += 1) {
        boardArray[i][j] = 0;
      }
    }
    return boardArray;
  };

  const placeShip = (shipObject, yCoord = false, xCoord = false) => {
    // if (!yCoord) {
    //   do {
    //     yCoord = getRandomIntInclusive(0, boardSize - 1);
    //   } while (((boardSize - 1) - xCoord) > shipObject.size || shipObject.shipOrient === 'vertical');
    // }

    // if (!xCoord) {
    //   do {
    //     xCoord = getRandomIntInclusive(0, boardSize - 1);
    //   } while (((boardSize - 1) - xCoord) > shipObject.size || shipObject.shipOrient === 'vertical');
    // }

    for (let i = 0; i < shipObject.size; i += 1) {
      if (shipObject.shipOrient === 'vertical') {
        boardArray[yCoord + i][xCoord] = shipObject.shipID;
      } else {
        boardArray[yCoord][xCoord + i] = shipObject.shipID;
      }
    }

    shipsOnBoard.push(shipObject);

    // console.log(shipObject);
    // console.log(yCoord);
    // console.log(xCoord);
  };

  // eslint-disable-next-line consistent-return
  const identifyShipHitPosition = (shipObject, yCoord, xCoord) => {
    let shipHitPosition = 1;
    for (let i = 1; i < shipObject.size + 1; i += 1) {
      if (shipObject.shipOrient === 'vertical') {
        if (boardArray[yCoord - i][xCoord] === boardArray[yCoord][xCoord]) {
          shipHitPosition += 1;
        } else return shipHitPosition;
      }
      if (shipObject.shipOrient === 'horizontal') {
        if (boardArray[yCoord][xCoord - i] === boardArray[yCoord][xCoord]) {
          shipHitPosition += 1;
        } else return shipHitPosition;
      }
    }
  };

  // eslint-disable-next-line consistent-return
  const receiveAttack = (shipArray, yAttackCoord, xAttackCoord) => {
    if (boardArray[yAttackCoord][xAttackCoord] < 0) return 'already tried';

    if (boardArray[yAttackCoord][xAttackCoord] === 0) {
      boardArray[yAttackCoord][xAttackCoord] = -10;
      return 'missed';
    }

    if (boardArray[yAttackCoord][xAttackCoord] > 0) {
      const shipID = boardArray[yAttackCoord][xAttackCoord];
      const hitPos = identifyShipHitPosition(shipArray[shipID], yAttackCoord, xAttackCoord);
      shipArray[shipID].hit(hitPos);
      boardArray[yAttackCoord][xAttackCoord] = -100;
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
    boardArray,
    boardID,
    boardSize,
    placeShip,
    emptyTheBoard,
    receiveAttack,
    allShipsSunk,
    shipsOnBoard,
  };
};

const playerFactory = (shipList, playerID, name, isAI = false) => {
  let score = 0;
  const AIMemory = [];

  const win = () => {
    score += 1;
  };

  const computerPlay = (gameboard) => {
    let yCoord = 0;
    let xCoord = 0;

    do {
      yCoord = getRandomIntInclusive(0, gameboard.boardSize - 1);
      xCoord = getRandomIntInclusive(0, gameboard.boardSize - 1);
    } while (!AIMemory.contains(`${yCoord}, ${xCoord}`));
    gameboard.receiveAttack(shipList, yCoord, xCoord);
    AIMemory.push(`${yCoord}, ${xCoord}`);
  };

  // const playerPlay = (gameboard) => {

  // };

  return {
    playerID, name, isAI, score, win, computerPlay,
  };
};

export { shipFactory, gameboardFactory, playerFactory };
