import React, { Component } from 'react';
// import moment from 'moment';

import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

import base from './base';

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

class App extends Component {
  state = {
    todo: [],
  }

  componentDidMount() {
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
          isDelete: false,
          date: null,
          // date: moment().format(),
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
    const { todo } = this.state;
    const index = todo.findIndex(t => t.id === id);
    // console.log(index);
    const changedState = { ...this.state };
    changedState.todo[index].isDelete = true;
    this.setState(changedState);
  }

  editTodo = (id, title) => {
    // console.log(`${id} ${title}`);
    const { todo } = this.state;
    const index = todo.findIndex(t => t.id === id);
    // console.log(index);
    const changedState = { ...this.state };
    changedState.todo[index].title = title;
    this.setState(changedState);
  }

  editDue = (date, id) => {
    // console.log(date);
    // console.log(id);
    const { todo } = this.state;
    const index = todo.findIndex(t => t.id === id);
    const changedState = { ...this.state };

    // console.log(changedState.todo[index]);

    if (date) {
      changedState.todo[index].date = date.format();
    } else {
      delete changedState.todo[index].date;
    }
    // console.log(changedState.todo[index]);
    // console.log(changedState);
    this.setState(changedState);
  }

  render() {
    const { todo } = this.state;
    const total = todo.filter(t => t.isDelete === false);

    todo.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    });

    return (
      <div className="container">
        <AddTodo
          onAddTodo={this.addTodo}
        />
        <p className="text-secondary">
          <span>Total:</span>
          <span className="pl-2">{total.length}</span>
        </p>
        <TodoList
          todo={todo}
          onDeleteTodo={this.deleteTodo}
          onDoneTodo={this.doneTodo}
          onEditTodo={this.editTodo}
          onEditDue={this.editDue}
        />
      </div>
    );
  }
}

export default App;
