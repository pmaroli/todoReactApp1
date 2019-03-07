const BackEnd = require('./todoBackEnd');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const express = require('express');
const app = express();

// Adding a piece of middle ware to process requests
app.use(express.json()); // Enables parsing of JSON objects in body

var adapter = new FileSync('todoList');
var db = low(adapter);
db.defaults({ todos: [] }).write();
var dbInstance = new BackEnd.Todo(db);

// Get the list of todos from the database
app.get('/api/todos', (req, res) => {
	res.send(dbInstance.getTodo())
})

// Add a new todo to the database
app.post('/api/todos', function (req, res) {
	dbInstance.newTodo(req.body.name) // Adds a new task with name req.body.name
	res.send(`A new task named: '${req.body.name}' has been added!`)
})

// Toggles the complete status of a taskID
app.put('/api/todos/togglecomplete', (req, res) => {
	dbInstance.toggleComplete(req.body.id, req.body.complete);
	res.send(`Task with ID: ${req.body.id} marked as ${!req.body.complete}`)
})

// Deletes a task with a given ID
app.delete('/api/todos/remove', (req, res) => {
	dbInstance.removeTodo(req.body.id);
	res.send(`Task with ID: ${req.body.id} has been deleted!`)
})

// Removes ALL tasks from the database
app.delete('/api/todos/removeall', (req, res) => {
	dbInstance.removeAll();
	res.send(`All tasks have been deleted!`)
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}!`))