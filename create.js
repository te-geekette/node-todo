var list = require('./list'); 
var oldList = list();

var task = process.argv.slice(2); 


function addTaskToList (task) {
	oldList.all.push(task[0]); 
	oldList.today.push(task[0]);
}

addTaskToList(task);