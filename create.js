var Pathwise = require('level-pathwise'); 
var level = require('level');

var todos = level('todos');
var store = new Pathwise(todos); 

var guid = require('node-uuid').v4;

// Create a task 
var input = process.argv.slice(2); // 1. Input: Task, 2. Input (optional): Due Date, 3. Input (optional): Status 
var id = guid();

store.put([], {
	[id]: {
		task: input[0],
		dueDate: input[1] ? input[1] : 'At some point',
		createDate: new Date(), 
		status: input[2] ? input[2] : 'open' 
	}
}, function(err){
	if(err){
		console.error(err.message);
	}
});


// function addTaskToList (task) {
// 	var taskObject = {
// 		id: guid(),
// 		task: input[0],
// 		dueDate: input[1],
// 		createDate: new Date(), 
// 		status: input[2] ? input[2] : 'open' 
// 	};
// 	db.put(taskObject.id, taskObject);
// }

// addTaskToList(input);


