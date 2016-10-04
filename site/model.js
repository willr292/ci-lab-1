/*
A module that creates and manages a model of the game.
*/

function Model() {}

/*
Initialise the state to a fresh game.
*/
Model.prototype.reset = function() {
        // TODO is it wrong to use 'this' here?
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
        console.log('clicked '+rowClicked+columnClicked);

        if(this.board[rowClicked][columnClicked] !== "empty") {
          console.log('cell already taken');
        } else {
          this.board[rowClicked][columnClicked] = this.isNoughtToPlay ? "nought" : "cross";
          this.isNoughtToPlay = !this.isNoughtToPlay;

          // check rows for a winner
          for (var row = 0; row <= 2; row++) {
            var token = this.board[row][0];
            if(token!=="empty" && token === this.board[row][1]
              && token === this.board[row][2]) {
                this.winner = token;
                this.isGameOver = true;
                return;
              }
          }

          // check cols for a winner
          for (var col = 0; col <= 2; col++) {
            var token = this.board[0][col];
            if(token!=="empty" && token === this.board[1][col]
              && token === this.board[2][col]) {
                this.winner = token;
                this.isGameOver = true;
                return;
              }
          }

          // check for draw
          var isDraw = true;
          for (var row = 0; row <= 2; row++) {
            for (var col = 0; col <= 2; col++) {
              var token = this.board[row][col];
              if(token === "empty") {
                isDraw = false;
              }
            }
          }

          if(isDraw) {
            this.winner = false;
            this.isGameOver = true;
            return;
          }
        }
      };

/*
Factory method to create a model in an initial state.
*/
exports.createModel = function() {
  var model = new Model();
  model.reset();
  return model;
}
