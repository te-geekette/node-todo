// Prerequisits
var Pathwise = require('level-pathwise'); 
var level = require('level');

var todos = level('todos');
var store = new Pathwise(todos); 
var todoId = level('id');

var _ = require('lodash');

//// VIEWING A LIST WITH TODOS

function view(dueDate, status){
	// Fetches all task-objects from the store as one big object
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

//// CREATING A NEW TODO ITEM

function create(task, dueDate, status){

	// Create a custom id for the task (to make it easier to retrieve and update later)
	var id; 
	var idList = []; 
	var idStream = todoId.createValueStream();

	idStream.on('data', function(data){
		idList.push(data);
	});
	idStream.on('end', function(){
		if (idList.length === 0){
			todoId.put('Count', '1');
			id = 1; 
			createTask(id, task, dueDate, status);

		} else {
			id = parseInt(idList[0]) + 1 ;
			todoId.put('Count', id ); 
			createTask(id, task, dueDate, status);
		}
	}); 


	// Create a task 
	function createTask (id, task, dueDate, status){
		store.put([], {
			[id]: {
				id: id,
				task: task,
				dueDate: dueDate ? dueDate : 'At some point',
				createDate: new Date(), 
				status: status ? status : 'open' 
			}
		}, function(err){
			if(err){
				console.error(err.message);
			}
			console.log('Your task was successfully created.');
		});
	}
}

//// MARKING A TASK AS CLOSED 

function update(taskIdList){
	var batchArray = [];

	taskIdList.forEach(createBatchArray);

	function createBatchArray(element, index, array){
		var command = { type: 'put', path: [element], data: { status: 'closed'}};
		batchArray.push(command);
		return batchArray; 
	} 

	store.batch(batchArray, function(){
		console.log('Great job! Another step towards freedom!');
	}); 
}

//// EXPORTS 

module.exports.update = update; 
module.exports.view = view; 
module.exports.create = create; 






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



