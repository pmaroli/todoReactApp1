const BackEnd = require('./todoBackEnd');
const express = require('express');
const app = express();
const firebase = require('firebase');
const bodyParser = require('body-parser')

// Adding a piece of middle ware to process requests
app.use(bodyParser.json()); // Enables parsing of JSON objects in body

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDqzf9tyUMPS5ADwGALty0F1f7eRcVKvoQ",
	authDomain: "todos-a3ae4.firebaseapp.com",
	databaseURL: "https://todos-a3ae4.firebaseio.com",
	projectId: "todos-a3ae4",
	storageBucket: "todos-a3ae4.appspot.com",
	messagingSenderId: "255093332154"
};
firebase.initializeApp(config);

var db = firebase.firestore();
var dbFunctions = new BackEnd.Todo(db);

// Get the list of todos from the database
app.get('/api/todos', (req, res) => {
	dbFunctions.getTodo(res)
})

// Add a new todo to the database
app.post('/api/todos', function (req, res) {
	dbFunctions.newTodo(req.body.name, res) // Adds a new task with name req.body.name
})

// Toggles the complete status of a taskID
app.put('/api/todos/togglecomplete', (req, res) => {
	dbFunctions.toggleComplete(req.body.id, req.body.complete, res);
})

// Deletes a task with a given ID
app.delete('/api/todos/remove', (req, res) => {
	dbFunctions.removeTodo(req.body.id, res);
})

// Removes ALL tasks from the database
app.delete('/api/todos/removeall', (req, res) => {
	dbFunctions.removeAll(res);
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}!`))