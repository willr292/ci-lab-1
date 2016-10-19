var expect = require('chai').expect;

/*
Creates a builder object to make it easier to prepare models for test.
*/
function modelBuilder() {
  var result = require('../model').createModel();
  return {
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

describe("applyClick", function() {

  it("does nothing if the cell is already taken", function() {
    var model = modelBuilder().noughtAt(0, 0).crossToPlay().build();
    model.applyClick(0, 0);
    expect(model.isGameOver).to.equal(false);
    expect(model.isNoughtToPlay).to.equal(false);
  });

  it("does nothing if the game is already over", function() {
    var model = modelBuilder().noughtToPlay().build();
    model.isGameOver = true;
    model.winner = "cross";

    model.applyClick(0, 0);
    expect(model.board[0][0]).to.equal("empty");
    expect(model.isGameOver).to.equal(true);
    expect(model.winner).to.equal("cross");
    expect(model.isNoughtToPlay).to.equal(true);
  });

  it("places noughts and crosses alternately", function() {
    var model = modelBuilder().build();
    model.applyClick(0, 0);
    model.applyClick(0, 1);
    model.applyClick(1, 2);
    expect(model.board[0][0]).to.equal("nought");
    expect(model.board[0][1]).to.equal("cross");
    expect(model.board[1][2]).to.equal("nought");
  });

  it("changes whose turn it is on every move", function() {
    var model = modelBuilder().build();
    expect(model.isNoughtToPlay).to.equal(true);
    model.applyClick(0, 0);
    expect(model.isNoughtToPlay).to.equal(false);
    model.applyClick(0, 1);
    expect(model.isNoughtToPlay).to.equal(true);
    model.applyClick(0, 2);
    expect(model.isNoughtToPlay).to.equal(false);
  });

  it("indicates the game is not over if it isn't", function() {
    var model = modelBuilder().build();
    model.applyClick(0, 0);
    model.applyClick(0, 1);
    model.applyClick(0, 2);
    expect(model.isGameOver).to.equal(false);
    expect(model.winner).to.equal(false);
  });

  it("recognises a horizontal win for crosses", function() {
    var model = modelBuilder().crossAt(1, 0).crossAt(1, 1).crossToPlay().build();
    model.applyClick(1, 2);
    expect(model.isGameOver).to.equal(true);
    expect(model.winner).to.equal("cross");
  });

  it("recognises a vertical win for crosses", function() {
    var model = modelBuilder().crossAt(1, 0).crossAt(2, 0).crossToPlay().build();
    model.applyClick(0, 0);
    expect(model.isGameOver).to.equal(true);
    expect(model.winner).to.equal("cross");
  });

  it("recognises a horizontal win for noughts", function() {
    var model = modelBuilder().noughtAt(1, 0).noughtAt(1, 1).noughtToPlay().build();
    model.applyClick(1, 2);
    expect(model.isGameOver).to.equal(true);
    expect(model.winner).to.equal("nought");
  });

  it("recognises a vertical win for noughts", function() {
    var model = modelBuilder().noughtAt(1, 0).noughtAt(2, 0).noughtToPlay().build();
    model.applyClick(0, 0);
    expect(model.isGameOver).to.equal(true);
    expect(model.winner).to.equal("nought");
  });

  it("recognises when the game is drawn", function() {
    var model = modelBuilder()
                  .crossAt(0, 0).noughtAt(0, 1).crossAt(0, 2)
                  .crossAt(1, 0).noughtAt(1, 1).noughtAt(1, 2)
                  .noughtAt(2, 0).crossAt(2, 1)
                  .noughtToPlay()
                  .build();

    model.applyClick(2, 2);
    expect(model.isGameOver).to.equal(true);
    expect(model.winner).to.equal(false);
  });

});
