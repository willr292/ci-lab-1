

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
					console.log('crossAt called')

					// TODO have I used 'this' correctly?
					this.board[row][col] = "cross";
					return this;
				}
	    };
}

describe("updateModel", function() {
	// TODO google for common js module format
	var controller = require('../controller.js');
  var beforeModel;
	// var beforeModel = createModel();//.crossAt(0, 0);

  beforeEach(function() {
    beforeModel = createModel().crossAt(0, 0);
		// beforeModel = createModel();
  });

	it("initialises the board in beforeAll", function() {
		expect(beforeModel).toBeTruthy();
		expect(beforeModel.board[0][0]).toEqual("cross");
	});

  // afterAll(function() {
  //   foo = 0;
  // });

  it("does nothing if the cell is already taken", function() {

		var afterModel = controller.updateModel(beforeModel, 0, 0);

    expect(afterModel.isGameOver).toEqual(false);
    // foo += 1;
  });

});
