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
			id = parseInt(idList[0]) + 1;
			todoId.put('Count', id); 
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

//// MARKING ONE OR MORE TASKS AS CLOSED 

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

//// DELETING ONE OR MORE TASKS

function deleteTask(taskIdList){
	var batchArray = [];

	taskIdList.forEach(createBatchArray);

	function createBatchArray(element, index, array){
		var command = { type: 'del', path: [element]};
		batchArray.push(command);
		return batchArray; 
	} 

	store.batch(batchArray, function(){
		console.log('Perfect! Your tasks were deleted.');
	}); 
}

//// EXPORTS 


module.exports.view = view; 
module.exports.create = create; 
module.exports.update = update; 
module.exports.deleteTask = deleteTask; 

