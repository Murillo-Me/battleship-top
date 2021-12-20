const gameboardDOM = (function () {
  function createBoardDOM(gameboard) {
    const gameboardElement = document.querySelector(`.gb-id-${gameboard.boardID}`);
    for (let i = 0; i < gameboard.boardSize; i += 1) {
      for (let j = 0; j < gameboard.boardSize; j += 1) {
        const boardUnitElement = document.createElement('div');
        boardUnitElement.classList.add('board-unit', `r${i}-c${j}`);
        gameboardElement.appendChild(boardUnitElement);
      }
    }
  }

  function toggleBoardPlayingState(gameboard) {
    const allBoardUnitElements = document.querySelectorAll(`.gb-id-${gameboard.boardID} > .board-unit`);
    allBoardUnitElements.forEach((unit) => unit.classList.toggle('playing-state'));
  }

  function getAttackCoord(el) {
    const coordClass = el.classList.item(1);
    const yCoord = parseInt(/r+(\d+)/.exec(coordClass)[1], 10);
    const xCoord = parseInt(/c+(\d+)/.exec(coordClass)[1], 10);
    return { yCoord, xCoord };
  }

  function markAttack(event) {
    const hitUnit = event.currentTarget;
    const allBoardUnits = document.querySelectorAll('.playing-state');
    console.log(hitUnit.myShipList);
    const result = hitUnit.myGameboard.receiveAttack(hitUnit.myShipList, getAttackCoord(hitUnit));

    if (result) {
      hitUnit.textContent = 'X';
      hitUnit.style['background-color'] = 'white';
    } else {
      hitUnit.textContent = 'O';
      hitUnit.style['background-color'] = 'black';
    }

    // allBoardUnits.forEach((unit) => unit.removeEventListener('click', markAttack));
    // toggleBoardPlayingState(hitUnit.myGameboard);
  }

  function addAttackEventListener(gameboard, shipList) {
    const allBoardUnits = document.querySelectorAll('.playing-state');
    allBoardUnits.forEach((unit) => {
      unit.myGameboard = gameboard;
      unit.myShipList = shipList;
      unit.addEventListener('click', markAttack);
    });
  }

  function renderShips(board) {
    board.boardArray.forEach((row, r) => {
      row.forEach((column, c) => {
        if (board.boardArray[r][c] === 0) return;
        const colorChanger = 255 - 40 * board.boardArray[r][c];
        const shipUnitElement = document.querySelector(`.gb-id-${board.boardID} > .r${r}-c${c}`);
        shipUnitElement.classList.add('ship-unit');
        shipUnitElement.style['background-color'] = `rgb(${colorChanger},${colorChanger},${colorChanger})`;
      });
    });
  }

  return {
    createBoardDOM, toggleBoardPlayingState, addAttackEventListener, renderShips,
  };
}());

export { gameboardDOM };
