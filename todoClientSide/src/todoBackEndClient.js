const axios = require('axios');

function Todo(server) {

	this.server = server;

	//Takes new todo task in the form of a string and adds it to the database
	this.newTodo = function (taskName) {

		//Send a PUT request to add the todo to the database
		return axios.post( this.server + '/api/todos', { name: taskName } )
		.then( (response) => { return response } )
		.catch( (error) => { console.log(error) } );
		
	}
	
	//Returns the current todo list
	this.getTodo = function () {

		return axios.get(this.server + '/api/todos')
			.then( (response) => { return response.data } )
			.catch( (error) => { console.log(error) } )

	}
	
	// Toggles the complete status of a task with ID = {taskID}
	this.toggleComplete = function (taskID, completeStatus) {

		return axios.put(this.server + '/api/todos/togglecomplete', {
			id: taskID,
			complete: completeStatus
		})
		.then( (response) => { return response } )
		.catch( (error) => { console.log(error) } )

	}
	
	//Removes task {taskNumber} from the todo list
	this.removeTodo = function (taskID) {

		return axios.delete(this.server + '/api/todos/remove', { 
			data: { // DELETE requests with a body need it to be set under a "data" key
				id: taskID
			}
		})
		.then( (response) => { return response } )
		.catch( (error) => { console.log(error) } )

	}

	this.removeAll = function () {

		return axios.delete(this.server + '/api/todos/removeall')
		.then( (response) => { return response } )
		.catch( (error) => {console.log(error) } )
		
	}
	
}

module.exports.Todo = Todo;