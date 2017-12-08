import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTodo } from "../actions/todos";
import UserList from "./user_list";

class TodoForm extends Component {
  onClick() {
    const body = this.input.value;
    const userEntityId = this.owner.getWrappedInstance().value;
    this.props.onClick(body, userEntityId);
  }

  onSelect(selectedUserEntityId) {
    this.setState({ selectedUserEntityId });
  }

  render() {
    return (
      <div className="todo-form">
        <UserList
          ref={owner => {
            this.owner = owner;
          }}
        />
        <input
          ref={input => {
            this.input = input;
          }}
          type="text"
        />
        <button onClick={this.onClick.bind(this)}>Save</button>
      </div>
    );
  }
}

TodoForm.propTypes = {
  onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  onClick: createTodo
};

export default connect(null, mapDispatchToProps)(TodoForm);
