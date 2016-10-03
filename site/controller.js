exports.init = function(model, view) {
	var allCells = document.getElementsByClassName('board-cell');
	console.log("adding click listener to "+allCells.length+" cells");
	[].forEach.call(allCells, function(cell) {
		cell.addEventListener("click", function(event) {
			var rowClicked = event.target.id.charAt(0) - 1;
			var columnClicked = event.target.id.charAt(1) - 1;
			var updatedModel = applyClick(model, rowClicked, columnClicked);
			view.render(updatedModel);
		});
	});

	view.render(model);
}

var applyClick = function(model, rowClicked, columnClicked) {
	console.log('clicked '+rowClicked+columnClicked);
	return model;
}

exports.applyClick = applyClick;
