// Prerequisits
var Pathwise = require('level-pathwise'); 
var level = require('level');

var todos = level('todos');
var store = new Pathwise(todos); 

var _ = require('lodash');

// Select the task
// var taskIdList = process.argv.slice(2);

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

module.exports.update = update; 