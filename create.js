var Pathwise = require('level-pathwise'); 
var level = require('level');

var todos = level('todos');
var todoCount = level('count');
var store = new Pathwise(todos); 

// Custom input to specify details for the task
var input = process.argv.slice(2); // 1. Input: Task, 2. Input (optional): Due Date, 3. Input (optional): Status 


// Create a custom id for the task (to make it easier to retrieve and update later)
var id; 
var currentCount = todoCount.createValueStream();
var countList = []; 

currentCount.on('data', function(data){
	countList.push(data);
});
currentCount.on('end', function(){
	if (countList.length === 0){
		todoCount.put('Count', '1');
		id = 1; 

	} else {
		id = parseInt(countList[0]) + 1 ;
		todoCount.put('Count', id ); 
	}
}); 

// Create a task 
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


