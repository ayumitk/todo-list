import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoRow from './TodoRow';

class TodoList extends Component {
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

  editTodo = (id, title) => {
    // console.log(`${id} ${title}`);
    const { onEditTodo } = this.props;
    onEditTodo(id, title);
  }

  editDue = (date, id) => {
    // console.log(date);
    // console.log(id);
    const { onEditDue } = this.props;
    onEditDue(date, id);
  }

  render() {
    const { todo } = this.props;
    return (
      <ul className="todo-list">
        {todo.map(item => (
          <TodoRow
            todo={item}
            key={item.id}
            onDeleteTodo={this.deleteTodo}
            onDoneTodo={this.doneTodo}
            onEditTodo={this.editTodo}
            onEditDue={this.editDue}
          />
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todo: PropTypes.array.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onDoneTodo: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
  onEditDue: PropTypes.func,
};

export default TodoList;
