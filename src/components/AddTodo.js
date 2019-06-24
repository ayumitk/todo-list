import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component {
  myInput = React.createRef();

  addTodo = (e) => {
    e.preventDefault();
    // console.log(this.myInput.current.value);
    const { onAddTodo } = this.props;
    onAddTodo(this.myInput.current.value);
    this.myInput.current.value = '';
  }

  render() {
    return (
      <form onSubmit={this.addTodo} className="row mb-4">
        <div className="col-sm-10">
          <input
            type="text"
            placeholder="ToDo"
            required
            ref={this.myInput}
            className="form-control"
          />
        </div>
        <div className="col-sm-2">
          <button type="submit" className="btn btn-dark w-100">Add</button>
        </div>
      </form>
    );
  }
}

AddTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodo;
