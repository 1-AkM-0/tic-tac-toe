// vou ter players, o game board e o placar
let turn = "X";
let switchTime = 0;
let isWinner = false;
let winner = document.querySelector(".winner");
const gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getGameboard = () => {
    return board;
  };

  const resetGameboard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    return board;
  };

  const updateBoard = (squares) => {
    squares.forEach((square) => {
      square.innerHTML = "";
    });
  };

  const addMark = (mark, location) => {
    board.splice(location, 1, mark);
  };

  return { getGameboard, resetGameboard, addMark, updateBoard };
})();

const Player = function (name) {
  this.name = name;

  this.makeAplay = function () {
    local = window.prompt("posi");
    gameboard.addMark(name, local);
  };
};
let p1;
let p2;

const gameController = (function () {
  let copy = gameboard.getGameboard();
  let squares = document.querySelectorAll(".square");
  let turnDisplay = document.querySelector(".turn");

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      handleChoice(square);
    });
  });

  const startGame = () => {
    p1 = new Player("X");
    p2 = new Player("O");
  };

  const handleTurn = () => {
    if (turn === "X") {
      turnDisplay.innerHTML = `Turn: O turn's`;
    } else {
      turnDisplay.innerHTML = `Turn: X turn's`;
    }
  };

  const checkChoice = (square) => {
    if (isWinner == false) {
      if (!square.getHTML()) {
        return true;
      }
    }
    return false;
  };

  const handleChoice = (square) => {
    let canChange;
    canChange = checkChoice(square);
    if (canChange == true) {
      if (switchTime == 0) {
        switchTime++;
      } else {
        if (turn == "X") {
          turn = "O";
        } else {
          turn = "X";
        }
        switchTime++;
      }
      square.innerHTML = turn;
      gameboard.addMark(turn, square.dataset.position);

      verifyWin();
    }
  };
  const verifyWin = () => {
    handleTurn();
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [6, 4, 2], // diagonals
    ];
    for (let combination of combinations) {
      const total = combination.reduce((obj, positions) => {
        if (!obj[copy[positions]]) {
          obj[copy[positions]] = 1;
        } else {
          obj[copy[positions]]++;
        }
        return obj;
      }, {});

      if (total.X == 3 || total.O == 3) {
        winner.innerHTML = `Winner: ${turn} is the winner`;
        isWinner = true;
      }
      if (switchTime === 9 && isWinner === false) {
        winner.innerHTML = "Draw!";
      }
    }
  };

  const resetBtn = document.querySelector(".reset");

  const resetGame = () => {
    gameboard.resetGameboard();
    isWinner = false;
    gameboard.updateBoard(squares);
    winner.innerHTML = "Winner: ";
    turn = "X";
    switchTime = 0;
    copy = gameboard.getGameboard();
  };
  resetBtn.addEventListener("click", resetGame);
  return { startGame };
})();

gameController.startGame();
