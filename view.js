var Pathwise = require('level-pathwise'); 
var level = require('level');

var todos = level('todos');
var store = new Pathwise(todos); 

// View tasks depending on selection

var selector = process.argv.slice(2); // Selects the correct list regarding time or status: all, today, open, done etc. 

store.get([], function(err, objectList){
	for(var object in objectList){
		store.get([object], function(error, objectItem){
			console.log(objectItem.task + ': ' + objectItem.status); 
		})
	}
	
});

// ToDo: 
// 1. Find out about Filter (NewBloomFilterPolicy ?)
// 2. Better way of displaying the tasks 

// Questions:
// 1. Are modules the best way to control the app or are there some console shortcuts? 
// 







// OLD TEST - DIDN'T WORK PROPERLY

// function logList(element){
// 	console.log(element);
// }

// function displayList(selector) {
// 	var taskList = [];
// 	var list = db.createValueStream(); 

// 	list.on('data', function(data){
// 		taskList.push(data); 
// 	}); 

// 	list.on('end', function(){
// 		taskList.forEach(logList); 
// 	}); 
// }

// displayList(selector); 



