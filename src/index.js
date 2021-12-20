import './index.html';
import './style.css';
import { shipFactory, gameboardFactory, playerFactory } from './factories';
import { gameboardDOM } from './battleshipDOM';

const standardShipSizes = [5, 4, 3, 3, 2];
const shipList = [];
const gameboardList = [];

standardShipSizes.forEach((shipSize) => {
  shipList.push(shipFactory(shipList, shipSize));
});

for (let i = 0; i < 2; i += 1) {
  gameboardList.push(gameboardFactory(gameboardList, 10));
}

gameboardList.forEach((gameboard) => {
  shipList.forEach((ship) => gameboard.placeShip(ship));
  gameboardDOM.createBoardDOM(gameboard);
});

gameboardDOM.renderShips(gameboardList[0]);

gameboardDOM.renderShips(gameboardList[1]);

gameboardDOM.toggleBoardPlayingState(gameboardList[1]);
gameboardDOM.addAttackEventListener(gameboardList[1], shipList);
