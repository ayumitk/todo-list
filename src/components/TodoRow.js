import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt, FaRegCircle, FaCheckCircle } from 'react-icons/fa';

import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';

class TodoRow extends Component {
  state = {
    date: this.props.todo.date ? moment(this.props.todo.date) : null,
  }

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

  editDue = (date, id) => {
    this.setState(date);
    const { onEditDue } = this.props;
    onEditDue(date.date, id);
  }


  render() {
    const { todo } = this.props;

    if (todo.isDelete) {
      return null;
    }

    return (
      <li className={`todo-list__item ${todo.isDone ? 'done' : ''}`}>
        <button
          type="button"
          className="btn btn-done"
          onClick={() => this.doneTodo(todo.id)}
        >
          {todo.isDone ? <FaCheckCircle /> : <FaRegCircle />}
        </button>
        <div className="title-date">
          <input
            type="text"
            className="toto-title form-control"
            defaultValue={todo.title}
            onKeyDown={e => this.editTodo(e, todo.id)}
            ref={this.editInput}
          />
          <p>{todo.due}</p>
          <SingleDatePicker
            date={this.state.date}
            onDateChange={date => this.editDue({ date }, todo.id)}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            numberOfMonths={1}
            showClearDate
            displayFormat="ll"
          />
        </div>
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
  onEditDue: PropTypes.func,
};

export default TodoRow;
