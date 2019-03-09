function Todo(db) {
	
	//Takes new todo task in the form of a string and adds it to the database
	this.newTodo = function (name, res) {
		
		//Add the todo to the database
		db.collection("todos").add({
			taskName: name,
			complete: false
		}).then( () => {
			res.send(`A new task named: '${name}' has been added!`);
		}).catch((err) => { console.log(err) });
		
	}
	
	//Returns the current todo list
	this.getTodo = function (res) {
		
		let output = [];
		
		db.collection("todos").get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let entry = {};
				entry.taskName = doc.data().taskName;
				entry.complete = doc.data().complete;
				entry.id = doc.id;
				
				output.push(entry);
			});
			res.send(output);
		}).catch( (err) => { console.log(err) } );
		
	}
	
	//Sets the task {taskNumber} to 'Complete = true'
	this.toggleComplete = function (taskID, completeStatus, res) {

		db.collection("todos").doc(taskID).update({
			complete: !completeStatus
		})
		.then( () => {
			res.send(`Task with ID: ${taskID} marked as ${!completeStatus}`);
		}).catch((err) => { console.log(err) });

	}
	
	//Removes task {taskNumber} from the todo list
	this.removeTodo = function (taskID, res) {	

		db.collection("todos").doc(taskID).delete()
		.then( () => {
			res.send(`Task with ID: ${taskID} has been deleted!`);
		}).catch((err) => { console.log(err) });

	}
	
	this.removeAll = function (res) {
		
		db.collection("todos").get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				doc.ref.delete();
			});
			res.send(`All tasks have been deleted!`);
		}).catch((err) => { console.log(err) } );
	}
	
}

module.exports.Todo = Todo;