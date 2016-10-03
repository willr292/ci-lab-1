function Model() {}

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

Model.prototype.applyClick = function(rowClicked, columnClicked) {
      	console.log('clicked '+rowClicked+columnClicked);

        if(this.board[rowClicked][columnClicked] !== "empty") {
          console.log('cell already taken');
        } else {
          this.board[rowClicked][columnClicked] = this.isNoughtToPlay ? "nought" : "cross";
          this.isNoughtToPlay = !this.isNoughtToPlay;
        }

      };

exports.createModel = function() {
  var model = new Model();
  model.reset();
  return model;
}
