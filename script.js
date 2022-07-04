'use strict';
const gameBoard = (function () {
  const board = ['', '', '', '', '', '', '', '', ''];
  const addToBoard = function (index, value) {
    board[index] = value;
  };
  const getBoard = function () {
    return board;
  };
  return { getBoard, addToBoard };
})();

const Player = function (name = 'MisterX', sign) {
  return { name, sign };
};

const displayController = (function () {
  const restartBtn = document.querySelector('.restart');
  const boardCells = document.querySelectorAll('.cell');
  const winnerText = document.querySelector('.winner');
  const board = gameBoard.getBoard();
  const renderBoard = () => {
    boardCells.forEach((cell, i) => {
      cell.textContent = board[i];
    });
  };

  const clearBoard = (event) => {
    event.preventDefault();
    boardCells.forEach((_, i) => gameBoard.addToBoard(i, ''));
    renderBoard();
    winner = '';
    winnerText.textContent = 'FIGHT';
  };

  restartBtn.addEventListener('click', clearBoard);
  return { renderBoard };
})();

let winner;
let player1 = Player('player1', 'x');
let player2 = Player('player2', 'o');
displayController.renderBoard();

const gameController = (function () {
  let activePlayer = player1;
  const boardCells = document.querySelectorAll('.cell');
  const form = document.querySelector('form');

  const congrats = () => {
    const winnerText = document.querySelector('.winner');
    winnerText.textContent = `${
      winner === 'TIE' ? 'TIE' : winner.name.toUpperCase() + ' WIN!!!11'
    }`;
  };

  const turn = function (event) {
    if (winner) return;
    if (event.target.textContent) return;
    event.target.textContent = activePlayer.sign;
    console.log(event.target.textContent);
    gameBoard.addToBoard(event.target.dataset.id, activePlayer.sign);
    checkWinner();
    if (winner) congrats();
    activePlayer = activePlayer === player1 ? player2 : player1;
  };
  boardCells.forEach((cell) => cell.addEventListener('click', turn));

  form.addEventListener('submit', (event) => {
    const player1Name = document.querySelector('#player1').value || 'MisterX';
    const player2Name = document.querySelector('#player2').value || 'MisterX';
    event.preventDefault();
    player1 = Player(player1Name, 'x');
    player2 = Player(player2Name, 'o');
    console.log('SUBMIIIIT', player1.name, player2.name);
  });

  const checkWinner = function () {
    const board = gameBoard.getBoard();
    if (board.every((cell) => cell)) winner = 'TIE';
    if (
      board[0] &&
      board[1] &&
      board[2] &&
      board[0] === board[1] &&
      board[1] === board[2]
    )
      winner = activePlayer;
    if (
      board[0] &&
      board[3] &&
      board[6] &&
      board[0] === board[3] &&
      board[3] === board[6]
    )
      winner = activePlayer;
    if (
      board[3] &&
      board[4] &&
      board[5] &&
      board[3] === board[4] &&
      board[4] === board[5]
    )
      winner = activePlayer;
    if (
      board[6] &&
      board[7] &&
      board[8] &&
      board[6] === board[7] &&
      board[7] === board[8]
    )
      winner = activePlayer;
    if (
      board[1] &&
      board[4] &&
      board[7] &&
      board[1] === board[4] &&
      board[4] === board[7]
    )
      winner = activePlayer;
    if (
      board[2] &&
      board[5] &&
      board[8] &&
      board[2] === board[5] &&
      board[5] === board[8]
    )
      winner = activePlayer;
    if (
      board[0] &&
      board[4] &&
      board[8] &&
      board[0] === board[4] &&
      board[4] === board[8]
    )
      winner = activePlayer;
    if (
      board[2] &&
      board[4] &&
      board[6] &&
      board[2] === board[4] &&
      board[4] === board[6]
    )
      winner = activePlayer;
  };
})();

/* 
board[0] === board[1] && board[1] === board[2]
board[0] === board[3] && board[3] === board[6]
board[3] === board[4] && board[4] === board[5]
board[6] === board[7] && board[7] === board[8]
board[1] === board[4] && board[4] === board[7]
board[2] === board[5] && board[5] === board[8]
board[0] === board[4] && board[4] === board[8]
board[2] === board[4] && board[4] === board[6]




*/
