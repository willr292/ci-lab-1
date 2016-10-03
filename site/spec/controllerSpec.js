

function createModel() {
	return {
	      isNoughtToPlay: true,
	      winner: false,
	      isGameOver: false,

	      board: [
	          ["empty", "empty", "empty"],
	          ["empty", "empty", "empty"],
	          ["empty", "empty", "empty"]
	      ],

				crossAt: function(row, col) {
					// TODO have I used 'this' correctly?
					this.board[row][col] = "cross";
					return this;
				},
				noughtAt: function(row, col) {
					// TODO have I used 'this' correctly?
					this.board[row][col] = "nought";
					return this;
				}
	    };
}

describe("updateModel", function() {
	var controller = require('../controller.js');

  it("does nothing if the cell is already taken", function() {
		var beforeModel = createModel().noughtAt(0, 0);
		beforeModel.isNoughtToPlay = false;
		var afterModel = controller.applyClick(beforeModel, 0, 0);
    expect(afterModel.isGameOver).toEqual(false);
		expect(afterModel.isNoughtToPlay).toEqual(false);
  });

});
