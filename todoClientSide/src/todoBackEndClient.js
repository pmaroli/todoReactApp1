const axios = require('axios');

function Todo(server) {

	this.server = server;

	//Send a PUT request to add the todo to the database
	this.newTodo = function (taskName) {
		return axios.post( this.server + '/api/todos', { name: taskName } )
	}
	
	//Returns the current todo list
	this.getTodo = function () {
		return axios.get(this.server + '/api/todos')
	}
	
	// Toggles the complete status of a task with ID = {taskID}
	this.toggleComplete = function (taskID, completeStatus) {

		return axios.put(this.server + '/api/todos/togglecomplete', {
			id: taskID,
			complete: completeStatus
		})

	}
	
	//Removes task {taskNumber} from the todo list
	this.removeTodo = function (taskID) {
		return axios.delete(this.server + '/api/todos/remove', { 
			data: { // DELETE requests with a body need it to be set under a "data" key
				id: taskID
			}
		})		
	}

	this.removeAll = function () {
		return axios.delete(this.server + '/api/todos/removeall')		
	}
	
}

module.exports.Todo = Todo;