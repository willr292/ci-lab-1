/*
A module to manipulate the DOM to reflect a given model.
*/
exports.render = function(model) {
  for (var x = 1; x <= 3; x++) {
    for (var y = 1; y <= 3; y++) {
      var id = String(x) + String(y);
      var className = 'board-cell board-cell-' + model.board[x - 1][y - 1];
      var el = document.getElementById(id);
      el.className = className;
    }
  }

  var gameState = document.getElementById('gameState');
  if (model.isGameOver) {
    if (model.winner === 'nought') {
      gameState.innerHTML = 'Game Over: Noughts Won!';
    } else if (model.winner === 'cross') {
      gameState.innerHTML = 'Game Over: Crosses Won!';
    } else {
      gameState.innerHTML = 'Game Over: It\'s a Draw!';
    }
  } else if (model.isNoughtToPlay) {
    gameState.innerHTML = 'Noughts to play';
  } else {
    gameState.innerHTML = 'Crosses to play';
  }
};

