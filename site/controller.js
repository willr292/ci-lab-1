// var view = require('view.js');
// var model = require('model.js');

exports.init = function(model, view) {
	var allCells = document.getElementsByClassName('board-cell');
	[].forEach.call(allCells, function(cell) {
		cell.addEventListener("click", function(event) {
			var rowClicked = event.target.id.charAt(0) - 1;
			var columnClicked = event.target.id.charAt(1) - 1;
			var model = updateModel(model, rowClicked, columnClicked);
			view.render(model);
		});
	});
}

exports.updateModel = function(model, rowClicked, columnClicked) {
	console.log('clicked '+rowClicked+columnClicked);
	return model;
}
