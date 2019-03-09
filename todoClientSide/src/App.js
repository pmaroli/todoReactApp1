import React, { Component } from 'react';
import Navbar from './Navbar'
import Header from './Header'
import AddForm from './AddForm'
import Footer from './Footer'
import List from './List'
import Client from './todoBackEndClient'

var dbInstance = new Client.Todo("http://localhost:5000");

class App extends Component {
  state = {
    todos: [], //Initialize the state
  }
  
  constructor(props) {
    super();
    this.updateState();
  }
  
  updateState = () => {
    
    dbInstance.getTodo().then( (response) => {
      this.setState({
        todos: response.data
      })
    })
    
  }
  
  addTodo = (taskName) => {
    if( taskName === '') {
      return //Don't add empty todo items!
    }  
    
    dbInstance.newTodo(taskName)
    .then( () => { this.updateState() } ) // The state must be updated only AFTER the POST request has returned a response
    .catch((error) => { console.log(error) });
  }
  
  toggleComplete = (taskID, complete) => {
    dbInstance.toggleComplete(taskID, complete)
    .then( () => { this.updateState() } )
    .catch((error) => { console.log(error) })
  }
  
  removeTodo = (taskID) => {
    dbInstance.removeTodo(taskID)
    .then( () => { this.updateState() } )
    .catch((error) => { console.log(error) })
  }
  
  clearAll = () => {
    dbInstance.removeAll()
    .then( () => { this.updateState() } )
    .catch((error) => { console.log(error) })
  }
  
  
  render() {
    return (
      <div className="App">
      <Navbar clearAll={this.clearAll}/>
      <Header />
      <AddForm addTodo={this.addTodo}/>
      <List todos={this.state.todos} removeTodo={this.removeTodo} toggleComplete={this.toggleComplete}/>
      <Footer />
      </div>
      
      );
    }
  }
  
  export default App;