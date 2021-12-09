console.log('test');

const shipFactory = (size) => {
  const hitsTaken = Array(size).fill(false);

  const hit = (hitPosition) => {
    if (hitPosition > (size - 1)) return Error('hitPosition > size');

    if (hitsTaken[hitPosition]) {
      hitsTaken[hitPosition] = true;
      return 'success';
    }
    return 'already hit before';
  };

  const isSunk = (size, hitsTaken) => (hitsTaken.reduce((total, curr) => total + curr) >= size);

  return { size, hit, isSunk };
};

const ship1 = shipFactory(5);
const ship2 = shipFactory(2);

ship1.hit(2);
ship2.hit(7);

const gameboardFactory = (boardSize = 10) => {
  // let player1Board =

  const placeShip = (shipSize, shipOrientation, xCoord, yCoord) => {
    if (!shipOrientation) {
      if (Math.random() < 0.5) shipOrientation = 'vertical';
      else shipOrientation = 'horizontal';
    }

    if (!xCoord) {
      do {
        xCoord = getRandomIntInclusive(0, boardSize - 1);
      } while (((boardSize - 1) - xCoord) > shipSize || shipOrientation === 'vertical');
    }

    if (!yCoord) {
      do {
        yCoord = getRandomIntInclusive(0, boardSize - 1);
      } while (((boardSize - 1) - xCoord) > shipSize || shipOrientation === 'vertical');
    }
  };
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { ship1, ship2 };
