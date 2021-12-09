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

// const gameboardFactory = (size) => {

//   };
module.exports = { ship1, ship2 };
