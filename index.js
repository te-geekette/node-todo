#!/usr/bin/env node

var input = require('commander');
var view = require('./view.js'); 
var create = require('./create.js'); 
var update = require('./check.js'); 


input
	.arguments('<cmd>')
	.option('-t, --task <task>', 'Your task title')
	.option('-d, --due-date <dueDate>', 'Due date')
	.option('-s, --status <status>', 'Task Status')
	.action(function(cmd){

		if (cmd === 'view') {
			view.view(input.dueDate, input.status);

		} else if (cmd === 'create'){
			create.create(input.task, input.dueDate, input.status);

		} else if (cmd === 'update'){
			// Not sure, input.args is the right thing
			// var id = input.args; 
			// update.update(id);

		} else {
			console.log("Please specify a command first: 'view', 'create' or 'update'.");
		}
		
	})
	.parse(process.argv);

// PROBLEM: 
// It worked for view but when I ran create for the first time, I got the error
// After that nothing worked anymore
