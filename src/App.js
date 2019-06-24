import React, { Component } from 'react';

import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

import base from './base';

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

class App extends Component {
  state = {
    todo: [
      {
        id: 1,
        title: 'aaa',
        isDone: false,
      },
      {
        id: 2,
        title: 'bbb',
        isDone: false,
      },
      {
        id: 3,
        title: 'ccc',
        isDone: true,
      },
    ],
  }

  componentDidMount() {
    // console.log('mounted!');
    this.ref = base.syncState('todo/', {
      context: this,
      state: 'todo',
    });
  }

  addTodo = (title) => {
    const { todo } = this.state;
    const idArr = todo.map(t => t.id);
    const newID = Math.max.apply(null, idArr) + 1;
    // console.log(newID);
    // console.log(todo);
    this.setState(prevState => ({
      todo: [
        ...prevState.todo,
        {
          id: newID,
          title,
          isDone: false,
        },
      ],
    }));
  }

  doneTodo = (id) => {
    // console.log(id);
    const { todo } = this.state;
    const index = todo.findIndex(t => t.id === id);
    // console.log(index);
    const changedState = { ...this.state };
    changedState.todo[index].isDone = true;
    this.setState(changedState);
  }

  deleteTodo = (id) => {
    // console.log(id);
    this.setState(prevState => ({
      todo: prevState.todo.filter(t => t.id !== id),
    }));
  }

  render() {
    const { todo } = this.state;
    return (
      <div className="container">
        <AddTodo
          onAddTodo={this.addTodo}
        />
        <p className="text-secondary">
          <span>Total:</span>
          <span className="pl-2">{todo.length}</span>
        </p>
        <TodoList
          todo={todo}
          onDeleteTodo={this.deleteTodo}
          onDoneTodo={this.doneTodo}
        />
      </div>
    );
  }
}

export default App;
