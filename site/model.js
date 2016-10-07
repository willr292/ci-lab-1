/**
A module that creates and manages a model of the game.
*/

/**
Constructor for models.
*/
function Model() {}

/*
Initialise the state to a fresh game.
*/
Model.prototype.reset = function() {
  this.isNoughtToPlay = true;
  this.winner = false;
  this.isGameOver = false;

  this.board = [
      ["empty", "empty", "empty"],
      ["empty", "empty", "empty"],
      ["empty", "empty", "empty"]
  ];

  console.log("model has been reset");
};

/*
Update the model to apply the user's action to place a token on a given cell.
If the cell is already taken, this function does nothing.
*/
Model.prototype.applyClick = function(rowClicked, columnClicked) {
  console.log('clicked ' + rowClicked + columnClicked);

  if (this.board[rowClicked][columnClicked] === "empty") {
    this.board[rowClicked][columnClicked] =
      this.isNoughtToPlay ? "nought" : "cross";
    this.isNoughtToPlay = !this.isNoughtToPlay;

    // the variables for this state detection algorithm
    var row, col, token, isDraw;

    // check rows for a winner
    for (row = 0; row <= 2; row++) {
      token = this.board[row][0];
      if (token !== "empty" && token === this.board[row][1] &&
        token === this.board[row][2]) {
        this.winner = token;
        this.isGameOver = true;
        return;
      }
    }
    // check cols for a winner
    for (col = 0; col <= 2; col++) {
      token = this.board[0][col];
      if (token !== "empty" && token === this.board[1][col] &&
        token === this.board[2][col]) {
        this.winner = token;
        this.isGameOver = true;
        return;
      }
    }

    // check for draw
    isDraw = true;
    for (row = 0; row <= 2; row++) {
      for (col = 0; col <= 2; col++) {
        token = this.board[row][col];
        if (token === "empty") {
          isDraw = false;
        }
      }
    }

    if (isDraw) {
      this.winner = false;
      this.isGameOver = true;
      return;
    }
  } else {
    console.log('cell already taken');
  }
};

/*
Factory method to create a model in an initial state.
*/
exports.createModel = function() {
  var model = new Model();
  model.reset();
  return model;
};

