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
    expect(model.isGameOver).toEqual(false);
    expect(model.isNoughtToPlay).toEqual(false);
  });

  it("places noughts and crosses alternately", function() {
    var model = modelBuilder().build();
    model.applyClick(0, 0);
    model.applyClick(0, 1);
    model.applyClick(1, 2);
    expect(model.board[0][0]).toEqual("nought");
    expect(model.board[0][1]).toEqual("cross");
    expect(model.board[1][2]).toEqual("nought");
  });

  it("changes whose turn it is on every move", function() {
    var model = modelBuilder().build();
    expect(model.isNoughtToPlay).toEqual(true);
    model.applyClick(0, 0);
    expect(model.isNoughtToPlay).toEqual(false);
    model.applyClick(0, 1);
    expect(model.isNoughtToPlay).toEqual(true);
    model.applyClick(0, 2);
    expect(model.isNoughtToPlay).toEqual(false);
  });

  it("indicates the game is not over if it isn't", function() {
    var model = modelBuilder().build();
    model.applyClick(0, 0);
    model.applyClick(0, 1);
    model.applyClick(0, 2);
    expect(model.isGameOver).toEqual(false);
    expect(model.winner).toBeFalsy();
  });

  it("recognises a horizontal win for crosses", function() {
    var model = modelBuilder().crossAt(1, 0).crossAt(1, 1).crossToPlay().build();
    model.applyClick(1, 2);
    expect(model.isGameOver).toEqual(true);
    expect(model.winner).toEqual("cross");
  });

  it("recognises a vertical win for crosses", function() {
    var model = modelBuilder().crossAt(1, 0).crossAt(2, 0).crossToPlay().build();
    model.applyClick(0, 0);
    expect(model.isGameOver).toEqual(true);
    expect(model.winner).toEqual("cross");
  });

  it("recognises a horizontal win for noughts", function() {
    var model = modelBuilder().noughtAt(1, 0).noughtAt(1, 1).noughtToPlay().build();
    model.applyClick(1, 2);
    expect(model.isGameOver).toEqual(true);
    expect(model.winner).toEqual("nought");
  });

  it("recognises a vertical win for noughts", function() {
    var model = modelBuilder().noughtAt(1, 0).noughtAt(2, 0).noughtToPlay().build();
    model.applyClick(0, 0);
    expect(model.isGameOver).toEqual(true);
    expect(model.winner).toEqual("nought");
  });

  it("recognises when the game is drawn", function() {
    var model = modelBuilder()
                  .crossAt(0, 0).noughtAt(0, 1).crossAt(0, 2)
                  .crossAt(1, 0).noughtAt(1, 1).noughtAt(1, 2)
                  .noughtAt(2, 0).crossAt(2, 1)
                  .noughtToPlay()
                  .build();

    model.applyClick(2, 2);
    expect(model.isGameOver).toEqual(true);
    expect(model.winner).toBeFalsy();
  });

});

