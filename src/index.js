import './index.html';
import './style.css';
import { shipFactory, gameboardFactory, playerFactory } from './factories';
import { gameboardDOM } from './battleshipDOM';

const standardShipSizes = [5, 4, 3, 3, 2];

const shipList = [];
const gameboardList = [];

const gameboard1 = gameboardFactory(gameboardList, 10);
gameboardList.push(gameboard1);
const gameboard2 = gameboardFactory(gameboardList, 10);
gameboardList.push(gameboard2);

standardShipSizes.forEach((shipSize) => {
  shipList.push(shipFactory(shipList, shipSize));
});

console.log(shipList);

shipList.forEach((ship) => gameboard1.placeShip(ship, 2, 2));
// shipList.forEach((ship) => gameboard2.placeShip(ship));

gameboardDOM.createBoardDOM(gameboard1);
gameboardDOM.createBoardDOM(gameboard2);

gameboardDOM.toggleBoardPlayingState(gameboard1);

gameboardDOM.renderShips(gameboardList);

// const allBoardUnits = document.querySelectorAll('.board-unit');
// allBoardUnits.forEach((unit) => unit.addEventListener('click', (e) => { e.currentTarget.style['background-color'] = 'white'; }));
