function initController() {
	var allCells = document.getElementsByClassName('board-cell');
	[].forEach.call(allCells, function(cell) {
		cell.addEventListener("click", function(event) {
			var rowClicked = event.target.id.charAt(0) - 1;
			var columnClicked = event.target.id.charAt(1) - 1;
			model = updateModel(model, rowClicked, columnClicked);
			render();
		});
	});

}

function updateModel(model, rowClicked, columnClicked) {
	console.log('clicked '+rowClicked+columnClicked);
	return model;
}
