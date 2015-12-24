// Prerequisits
var Pathwise = require('level-pathwise'); 
var level = require('level');

var todos = level('todos');
var store = new Pathwise(todos); 

// View tasks depending on selection
var selector = process.argv.slice(2); // Selects the correct list regarding time or status: all, today, open, done etc. 

// Fetches all task-objects from the store as one big object
store.get([], function(err, objectList){
	var finalList = [];

	//This is supposed to do: the incoming data from objectList ... 
	objectList.on('data', function(objects){
		console.log(objects);

		// should extract each object in the list and ...
		for(var object in objects){
			// get it's properties
			store.get([object], function(error, objectItem){
				// if the status property is specified in the console input ..
				if (objectItem.status === selector[0]) {
					// add the task stored in this object to the finalList array
					finalList.push(objectItem.task);
				}
			});
		} 
	});

	// once the data flow has finished ...
	objectList.on('end', function(){
		// log out the finalList with all tasks that match the console input
		console.log(finalList);
	});
	
});


// ToDo: 
// Better way of displaying the tasks 

// Questions:
// Why is the get - on logic not working properly?  
// Are modules the best way to control the app or are there some console shortcuts? 
//







// OLD TEST - DIDN'T WORK PROPERLY

// store.get([], function(err, objectList){
// 	for(var object in objectList){
// 			store.get([object], function(error, objectItem){
// 				console.log(selector[0], objectItem.status);
// 				if (objectItem.status === selector[0]) {
// 					finalList.push(objectItem.task);
// 				}
// 				// console.log(objectItem.task + ': ' + objectItem.status); 
// 			});
// 	} 
// });

// ---------

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

// -----------

// EXPERIMENT

// function logList(element){
// 	console.log(element);
// }

// function displayList(selector) {
// 	var taskList = [];
// 	var testList = todos.createValueStream();

// 	testList.on('data', function(data){
// 		taskList.push(data); 
// 	}); 

// 	testList.on('end', function(){
// 		console.log(taskList);
// 		//taskList.forEach(logList); 
// 	}); 
// }

//displayList(selector); 



