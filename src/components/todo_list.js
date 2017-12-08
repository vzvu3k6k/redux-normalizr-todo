import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import { fetchTodos } from "../actions/todos";
import Todo from "./todo";
import TodoForm from "./todo_form";

class TodoList extends Component {
  componentWillMount() {
    this.props.fetchTodos();
  }

  render() {
    return (
      <div className="todo-list">
        <TodoForm />
        <ul>
          {this.props.todos.map(entityId => {
            return <Todo key={entityId} entityId={entityId} />;
          })}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: ImmutablePropTypes.orderedSet.isRequired,
  fetchTodos: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const todos = state.todos.get("todos");
  return { todos };
}

const mapDispatchToProps = {
  fetchTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
