
module.exports = {
      self: this,
      reset: function() {
        self.isNoughtToPlay = true,
        self.winner = false,
        self.isGameOver = false,

        self.board = [
            ["empty", "empty", "empty"],
            ["empty", "empty", "empty"],
            ["empty", "empty", "empty"]
        ]
      },
      // isNoughtToPlay: true,
      // winner: false,
      // isGameOver: false,
      //
      // board: [
      //     ["empty", "empty", "empty"],
      //     ["empty", "empty", "empty"],
      //     ["empty", "empty", "empty"]
      // ],

      _initialise: self.reset()
    };
