// Prerequisits
var Pathwise = require('level-pathwise'); 
var level = require('level');

var todos = level('todos');
var store = new Pathwise(todos); 

var _ = require('lodash');

// Fetches all task-objects from the store as one big object
function view(dueDate, status){
	store.get([], function(err, objectList){

		// For displaying the tasks in the shell
		var header;
		var hash = '#';
		var result ='';
		var footer = multiplyString(hash, 50);

		function multiplyString (string, times){
			return (new Array(times + 1).join(string));
		}

		// For filtering the tasks depending on input
		var filter;
		var filteredObject;
		
		if (dueDate && status) {
			filter = {status: status, dueDate: dueDate}; 
			filteredObject = _.filter(objectList, filter);
			header = '\n' + multiplyString(hash, 10) + ' Your ' + filter['status'] + ' tasks ' + filter['dueDate'] + ' ' + multiplyString(hash, 20) + '\n';

		} else if (status) {
			filter = {status: status};
			filteredObject = _.filter(objectList, filter);
			header = '\n' + multiplyString(hash, 10) + ' Your ' + filter['status'] + ' tasks ' + multiplyString(hash, 20) + '\n';

		} else {
			filteredObject = _.filter(objectList);
			header = '\n' + multiplyString(hash, 10) + ' Your tasks ' + multiplyString(hash, 20) + '\n';
		}

		
		function logEachTask(element, index, array){
			result += element['id'] + ' - ' + element['status'] + ' - ' + element['dueDate'] + ' - ' + element['task'] + '\n' ;
			return result;
		}

		filteredObject.forEach(logEachTask);

		console.log(header + '\n' +
					result + '\n' +
					footer + '\n');

	});
}

module.exports.view = view; 






// OLD TEST - DIDN'T WORK PROPERLY

// var finalList = [];

	// //This is supposed to do: the incoming data from objectList ... 
	// objectList.on('data', function(objects){
	// 	console.log(objects);

	// 	// should extract each object in the list and ...
	// 	for(var object in objects){
	// 		// get it's properties
	// 		store.get([object], function(error, objectItem){
	// 			// if the status property is specified in the console input ..
	// 			if (objectItem.status === selector[0]) {
	// 				// add the task stored in this object to the finalList array
	// 				finalList.push(objectItem.task);
	// 			}
	// 		});
	// 	} 
	// });

	// // once the data flow has finished ...
	// objectList.on('end', function(){
	// 	// log out the finalList with all tasks that match the console input
	// 	console.log(finalList);
	// });
	
	//var values = Object.values(objectList);

// TEST

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



