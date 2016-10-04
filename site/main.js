/*
This module bootstraps the application.
*/
var controller = require('./controller');
var model = require('./model').createModel();
var view = require('./view');

controller.init(model, view);
