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

  test('testing if ship sunks', () => {
    for (let i = 0; i < (ship.size - 1); i += 1) {
      ship.hit(i);
    }
    expect(ship.isSunk()).toBe(true);
  });

  test('testing ship hit method fail', () => {
    expect(ship.hit(15)).toBe('error');
  });
});
