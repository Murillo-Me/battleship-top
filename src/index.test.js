const { shipFactory, gameboardFactory } = require('./factories');

describe('ship factory tests', () => {
  const shipList = [];
  const ship = shipFactory(shipList, 5);
  shipList.push(ship);

  test('testing ship size', () => {
    expect(ship.size).toBe(5);
  });

  test('testing ship hit method success', () => {
    for (let i = 0; i < ship.size; i += 1) {
      expect(ship.hit(i)).toBe('success');
    }
  });

  test('testing if ship sinks', () => {
    for (let i = 0; i < (ship.size - 1); i += 1) {
      ship.hit(i);
    }
    expect(ship.isSunk()).toBe(true);
  });

  test('testing ship hit method fail', () => {
    expect(ship.hit(15)).toBe('error');
  });
});

describe('gameboard factory tests', () => {
  const size = 10;
  const testArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const gameboardList = [];
  const gameboard = gameboardFactory(gameboardList, size);
  gameboardList.push(gameboard);

  const shipList = [];
  const ship1 = shipFactory(shipList, 3, 'vertical');
  shipList.push(ship1);
  const ship2 = shipFactory(shipList, 3, 'horizontal');
  shipList.push(ship2);

  test('testing board creation', () => {
    expect(gameboard.boardArray[0]).toEqual(testArray);
    expect(gameboard.boardArray[size - 1]).toEqual(testArray);
  });

  test('testing vertical ship placement', () => {
    gameboard.placeShip(ship1, 5, 5);
    expect(gameboard.boardArray).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    gameboard.emptyTheBoard();
  });

  test('testing horizontal ship placement', () => {
    gameboard.placeShip(ship2, 5, 5);
    expect(gameboard.boardArray).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    gameboard.emptyTheBoard();
  });

  test('testing emptying the board', () => {
    expect(gameboard.emptyTheBoard()).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
  });

  test('testing receiveAttack method success', () => {
    const yAttackCoord = 2;
    const xAttackCoord = 3;
    gameboard.placeShip(ship1, 2, 3);

    expect(gameboard.receiveAttack(shipList, yAttackCoord, xAttackCoord)).toBe('success');
    expect(gameboard.boardArray).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, -100, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
  });
});
