// var Pathwise = require('level-pathwise'); 
// var level = require('level');

// var todos = level('todos');
// var store = new Pathwise(todos);

// var todoCount = level('count');


//////// Cleanup Count /////// 

// function logList(element){
// 	console.log(element);
// }

// function displayList() {
// 	var countList = [];
// 	var list = todoCount.createKeyStream(); 

// 	list.on('data', function(data){
// 		countList.push(data); 
// 	}); 

// 	list.on('end', function(){
// 		countList.forEach(logList); 
// 	}); 
// }

// displayList(); 

// todoCount.del('Count'); 

/////// Cleanup ToDos ////////

// store.get([], function(er, result){
// 	console.log(result);
// });

// store.batch([
//   { type: 'del', path: ['dd6c9b72-df1e-4e9f-9d30-abdd90869a9a']},
//   { type: 'del', path: ['e1854e0c-1302-4e27-8d3e-781041e144c4']},
//   { type: 'del', path: ['id']},
//   { type: 'del', path: ['one']},
//   { type: 'del', path: ['undefined']},
// ]);
