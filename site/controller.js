/*
A module that listens to clicks on the DOM and applies those clicks to
the underlying model, before notifying the view of the updated model.
*/

exports.init = function(model, view) {
  var allCells = document.getElementsByClassName('board-cell');
  console.log("adding click listener to "+allCells.length+" cells");
  [].forEach.call(allCells, function(cell) {
    cell.addEventListener("click", function(event) {
      var rowClicked = event.target.id.charAt(0) - 1;
      var columnClicked = event.target.id.charAt(1) - 1;
      model.applyClick(rowClicked, columnClicked);
      view.render(model);
    });
  });

  view.render(model);
}
