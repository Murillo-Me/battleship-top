import './index.html';
import './style.css';
import { shipFactory, gameboardFactory, playerFactory } from './factories';
import { gameboardDOM } from './battleshipDOM';

console.log('test');

const shipList = [];
const gameboardList = [];

const gameboard1 = gameboardFactory(gameboardList, 10);
gameboardList.push(gameboard1);
const gameboard2 = gameboardFactory(gameboardList, 10);
gameboardList.push(gameboard2);

const ship1 = shipFactory(shipList, 5, 'vertical');
shipList.push(ship1);
const ship2 = shipFactory(shipList, 4, 'vertical');
shipList.push(ship2);
const ship3 = shipFactory(shipList, 3, 'horizontal');
shipList.push(ship3);
const ship4 = shipFactory(shipList, 3);
shipList.push(ship4);
const ship5 = shipFactory(shipList, 2);
shipList.push(ship5);

// shipList.forEach((ship) => gameboard1.placeShip(ship));
// shipList.forEach((ship) => gameboard2.placeShip(ship));

gameboardDOM.createBoardDOM(gameboard1);
gameboardDOM.createBoardDOM(gameboard2);

console.log(gameboardDOM);
gameboardDOM.toggleBoardPlayingState(gameboard1);
// console.log(gameboardList);
// gameboardDOM.renderShips(gameboardList);

// const allBoardUnits = document.querySelectorAll('.board-unit');
// allBoardUnits.forEach((unit) => unit.addEventListener('click', (e) => { e.currentTarget.style['background-color'] = 'white'; }));
