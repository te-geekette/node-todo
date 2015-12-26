#!/usr/bin/env node

var input = require('commander');
var main = require('./main.js'); 
var clear = require('clear');


input
	.arguments('<cmd>')
	.option('-t, --task <task>', 'Your task title')
	.option('-d, --due-date <dueDate>', 'Due date')
	.option('-s, --status <status>', 'Task Status')
	.action(function(cmd){

		switch(cmd) {
			case 'create':
				main.create(input.task, input.dueDate, input.status);
				break;
			case 'view':
				clear();
				main.view(input.dueDate, input.status);
				break; 
			case 'update':
				var id = process.argv.slice(3); 
				main.update(id);
				break; 
			case 'delete':
				var id = process.argv.slice(3); 
				main.deleteTask(id);
				break; 
			case undefined: // doesn't work
				console.log("Please specify a command first: 'view', 'create' or 'update'.");
				break; 
		}
		
	})
	.parse(process.argv);

