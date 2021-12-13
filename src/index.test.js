const { shipFactory, gameboardFactory } = require('./index');

describe('ship factory tests', () => {
  const ship = shipFactory(5);

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
  const gameboard = gameboardFactory(size);

  const shipList = [];
  const ship1 = shipFactory(3, 'vertical');
  shipList.push(ship1);
  const ship2 = shipFactory(3, 'horizontal');
  shipList.push(ship2);

  test('testing board creation', () => {
    expect(gameboard.board[0]).toEqual(testArray);
    expect(gameboard.board[size - 1]).toEqual(testArray);
  });

  test('testing vertical ship placement', () => {
    gameboard.placeShip(ship1, 5, 5);
    expect(gameboard.board).toEqual([
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
    expect(gameboard.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
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
    expect(gameboard.board).toEqual([
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
