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

  function renderShips(gameboardList) {
    gameboardList.forEach((board) => {
      board.boardArray.forEach((row, r) => {
        row.forEach((column, c) => {
          if (board.boardArray[r][c] === 0) return;
          const colorChanger = 255 - 40 * board.boardArray[r][c];
          const shipUnitElement = document.querySelector(`.gb-id-${board.boardID} > .r${r}-c${c}`);
          shipUnitElement.classList.add('ship-unit');
          shipUnitElement.style['background-color'] = `rgb(${colorChanger},${colorChanger},${colorChanger})`;
        });
      });
    });
  }

  return { createBoardDOM, toggleBoardPlayingState, renderShips };
}());

export { gameboardDOM };
