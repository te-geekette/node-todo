var Pathwise = require('level-pathwise'); 
var level = require('level');

var todos = level('todos');
var todoId = level('id');

var store = new Pathwise(todos); 

// Custom input to specify details for the task
var input = process.argv.slice(2); // 1. Input: Task, 2. Input (optional): Due Date, 3. Input (optional): Status 


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
		createTask();

	} else {
		id = parseInt(idList[0]) + 1 ;
		todoId.put('Count', id ); 
		createTask();
	}
}); 

// Create a task 
function createTask (){
	store.put([], {
		[id]: {
			id: id,
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
}


