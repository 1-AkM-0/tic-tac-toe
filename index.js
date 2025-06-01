// vou ter players, o game board e o placar
let turn = "X";
let switchTime = 0;
const gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getGameboard = () => {
    return [...board];
  };

  const resetGameboard = () => {
    for (op in board) {
      board.pop();
      board.unshift(" ");
    }
    return board;
  };

  const addMark = (mark, location) => {
    board.splice(location, 1, mark);
    // console.log(board);
  };

  const updateBoard = () => {
    console.table(board);
  };

  return { getGameboard, resetGameboard, addMark, updateBoard };
})();

const Player = function (name) {
  this.name = name;

  this.makeAplay = function () {
    local = window.prompt("posi");
    gameboard.addMark(name, local);
    gameboard.updateBoard();
  };
};
let p1;
let p2;

const gameController = (function () {
  const copy = gameboard.getGameboard();
  let result = [];
  const setPlayer = () => {
    p1 = new Player("X");
    p2 = new Player("O");
  };
  const verifyRow = () => {
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

      if (total.X == 3) {
        console.log("X wins");
      }

      if (total.O == 3) {
        console.log("O wins");
      }
      console.log(total);
      console.log("-----");
    }
  };
  const startGame = () => {
    let winner = "";
    let cont = 0;
    gameController.setPlayer();
    while (cont < 3) {
      p1.makeAplay();
      cont++;
      p2.makeAplay();
      cont++;

      if (cont == 3) {
        while (winner == "" || cont != 9) {
          gameController.verifyRow();
          p1.makeAplay();
          cont++;
          p2.makeAplay();
          cont++;
        }
      }
    }
  };
  return { setPlayer, startGame, verifyRow };
})();

// gameController.startGame();
let squares = document.querySelectorAll(".square");

squares.forEach((square) => {
  square.addEventListener("click", () => {
    handleChoice(square);
  });
});

function checkChoice(square) {
  if (!square.getHTML()) {
    return true;
  }
  return false;
}

function handleChoice(square) {
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
    }
    square.innerHTML = turn;
    gameboard.addMark(turn, square.dataset.position);
    gameController.verifyRow();
  }
}
