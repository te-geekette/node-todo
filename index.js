#!/usr/bin/env node

var input = require('commander');
var view = require('./view.js'); 
// var create = require('./create.js'); 
// var update = require('./check.js');
// var Pathwise = require('level-pathwise'); 
// var level = require('level'); 

input
	.arguments('<cmd>')
	.option('-t, --task <task>', 'Your task title')
	.option('-d, --due-date <dueDate>', 'Due date')
	.option('-s, --status <status>', 'Task Status')
	.action(function(cmd){

		switch(cmd) {
			case 'create':
				view.create(input.task, input.dueDate, input.status);
				break;
			case 'view':
				view.view(input.dueDate, input.status);
				break; 
			case 'update':
				console.log('Update a task');
				// Not sure, input.args is the right thing
				// var id = input.args; 
				// update.update(id);
				break; 
			case undefined: 
				console.log("Please specify a command first: 'view', 'create' or 'update'.");
				break; 
		}
		
	})
	.parse(process.argv);

// PROBLEM: 
// It worked for view but when I ran create for the first time, I got the error
// After that nothing worked anymore
