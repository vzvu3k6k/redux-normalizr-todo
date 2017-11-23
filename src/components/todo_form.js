import React, { Component } from "react";
import { bindActionCreators } from "redux";
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

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      onClick: createTodo
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
