var controller = require('./controller');
var model = require('./model');
var view = require('./view');

model.reset();
controller.init(model, view);
