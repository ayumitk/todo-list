import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt, FaRegCircle, FaCheckCircle } from 'react-icons/fa';

class TodoRow extends Component {
  editInput = React.createRef();

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

  editTodo = (e, id) => {
    if (e.key === 'Enter') {
      const title = this.editInput.current.value;
      // console.log(`${id} ${title}`);
      const { onEditTodo } = this.props;
      onEditTodo(id, title);
      e.target.blur();
    }
  }

  render() {
    const { todo } = this.props;
    if (todo.isDelete) {
      return null;
    }

    return (
      <li className={todo.isDone ? 'done' : ''}>
        <button
          type="button"
          className="btn btn-done"
          onClick={() => this.doneTodo(todo.id)}
        >
          {todo.isDone ? <FaCheckCircle /> : <FaRegCircle />}
        </button>
        <input
          type="text"
          className="toto-title form-control"
          defaultValue={todo.title}
          onKeyDown={e => this.editTodo(e, todo.id)}
          ref={this.editInput}
        />
        <button
          type="button"
          className="ml-auto btn-delete"
          onClick={() => this.deleteTodo(todo.id)}
        >
          <FaTrashAlt />
        </button>
      </li>
    );
  }
}

TodoRow.propTypes = {
  todo: PropTypes.object.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onDoneTodo: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func,
};

export default TodoRow;
