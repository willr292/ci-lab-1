function modelBuilder() {
	var result = require('../model').createModel();
	return {
		// TODO have I used 'this' correctly in this function?
		build: function() {
			return result;
		},
		crossAt: function(row, col) {

			result.board[row][col] = "cross";
			return this;
		},
		noughtAt: function(row, col) {
			result.board[row][col] = "nought";
			return this;
		},
		crossToPlay: function() {
			result.isNoughtToPlay = false;
			return this;
		},
		noughtToPlay: function() {
			result.isNoughtToPlay = true;
			return this;
		}
  };
}

describe("updateModel", function() {
	// var controller = require('../controller.js');

  it("does nothing if the cell is already taken", function() {
		// var beforeModel = createModel().noughtAt(0, 0);
		var model = modelBuilder().noughtAt(0, 0).crossToPlay().build();
		// beforeModel.isNoughtToPlay = false;
		model.applyClick(0, 0);
    expect(model.isGameOver).toEqual(false);
		expect(model.isNoughtToPlay).toEqual(false);
  });

	it("changes whose turn it is on every move", function() {
		var model = modelBuilder().build();
		model.applyClick(0, 0);
		expect(model.isGameOver).toEqual(false);
		expect(model.isNoughtToPlay).toEqual(false);
	});

});
