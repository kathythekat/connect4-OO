/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
class Game {
  constructor(width, height, p1, p2) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.currPlayer = p1;
    this.p1 = p1;
    this.p2 = p2;
    this.makeBoard();
    this.makeHtmlBoard();
  }

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  makeHtmlBoard() {
    const htmlBoard = document.getElementById('board');
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));
  
    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
    htmlBoard.append(top);

    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
      htmlBoard.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.colorName;
    piece.style.top = -50 * (y + 2);
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    setTimeout(() => {
      const board = document.getElementById("board");
      board.innerHTML = "";
      this.board = [];
      this.makeHtmlBoard();
      this.makeBoard();
      alert(msg);
    },200);
  }

    /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    const x = +evt.target.id;
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer.colorName;
    this.placeInTable(y, x);
    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer.colorName} won!`);
    }
    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
    // switch players
    this.currPlayer = this.currPlayer === this.p1 ? this.p2 : this.p1;
  }
    /** checkForWin: check board cell-by-cell for "does a win start here?" */

    checkForWin() {
      function _win (cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer
    
        return cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < this.height &&
            x >= 0 &&
            x < this.width &&
            this.board[y][x] === this.currPlayer.colorName
        );
      }
      _win = _win.bind(this);
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          // get "check list" of 4 cells (starting here) for each of the different
          // ways to win
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
    
          // find winner (only checking each win-possibility as needed)
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true;
          }
        }
      }
    }
}

class Player {
  constructor (colorName) {
    this.colorName = colorName;
  }
}

let currGame;

let startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
  let p1Color = document.getElementById('p1Color').value;
  let p2Color = document.getElementById('p2Color').value;
  let player1 = new Player(p1Color);
  let player2 = new Player(p2Color);
  const rowInput = document.getElementById('gameRows').value;
  const columnInput = document.getElementById('gameColumns').value;
  if(!(currGame)) {
    currGame = new Game(columnInput, rowInput,player1, player2);
  }
})




 





