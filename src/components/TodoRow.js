import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoRow extends Component {
  deleteTodo = (id) => {
    // console.log(id);
    const { onDeleteTodo } = this.props;
    onDeleteTodo(id);
  }

  doneTodo = (id) => {
    // console.log(id);
    const { onDoneTodo } = this.props;
    onDoneTodo(id);
  }

  render() {
    const { todo } = this.props;
    return (
      <li className={todo.isDone ? 'done' : ''}>
        <button
          type="button"
          className="btn btn-done"
          onClick={() => this.doneTodo(todo.id)}
        >
          Done
        </button>
        <div className="toto-title">{todo.title}</div>
        <button
          type="button"
          className="btn btn-outline-danger ml-auto btn-delete"
          onClick={() => this.deleteTodo(todo.id)}
        >
          Delete
        </button>
      </li>
    );
  }
}

TodoRow.propTypes = {
  todo: PropTypes.object.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onDoneTodo: PropTypes.func.isRequired,
};

export default TodoRow;
