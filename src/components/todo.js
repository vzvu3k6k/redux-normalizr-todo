import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TodoType } from "../models/todo";
import { UserType } from "../models/user";
import { finishTodo } from "../actions/todos";

class Todo extends Component {
  onClickDone() {
    this.props.onClickDone(this.props.todo.entityId);
  }

  renderTodo() {
    return (
      <li>
        {this.props.user.name}:{this.props.todo.body}{" "}
        <button onClick={this.onClickDone.bind(this)}>Done</button>
      </li>
    );
  }

  renderFinishedTodo() {
    return (
      <li>
        <s>
          {this.props.user.name}:{this.props.todo.body}
        </s>
      </li>
    );
  }

  render() {
    return this.props.todo.isDone
      ? this.renderFinishedTodo()
      : this.renderTodo();
  }
}

Todo.propTypes = {
  todo: TodoType.isRequired,
  user: UserType.isRequired,
  onClickDone: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const todo = state.entities.todos.get(ownProps.entityId);
  const user = state.entities.users.get(todo.user);
  return { todo, user };
}

const mapDispatchToProps = {
  onClickDone: finishTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
