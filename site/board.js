var board = [
    ["nought", "cross", "empty"],
    ["empty", "nought", "cross"],
    ["empty", "empty", "nought"]
];

function render() {
    for (var x = 1; x <= 3; x++) {
        for (var y = 1; y <= 3; y++) {
            var id = "" + x + y;
            var className = 'board-cell board-cell-' + board[x - 1][y - 1];
            var el = document.getElementById(id);
            el.className = className;
        }
    }
}
