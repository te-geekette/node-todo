var list = require('./list'); 
var showList = list();
var selector = process.argv.slice(2); // Selects the correct list regarding time or status: all, today, open, done etc. 

function displayList(selector) {
	console.log(showList.selector[0]); 
}

displayList(selector); 

