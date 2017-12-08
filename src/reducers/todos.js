import { handleActions } from "redux-actions";
import Immutable from "immutable";

function mergeTodos(state, action) {
  const payload = action.payload;
  return state.update("todos", current => {
    const entityIds = payload.result.todos.map(value => {
      return value.todo;
    });
    return current.union(entityIds);
  });
}

function mergeTodo(state, action) {
  const payload = action.payload;
  return state.update("todos", current => {
    const entityId = payload.result.todo;
    return current.add(entityId);
  });
}

const handlers = {
  FETCH_TODOS: mergeTodos,
  CREATE_TODO: mergeTodo
};

const initialState = Immutable.Map({
  todos: Immutable.OrderedSet()
});

export default handleActions(handlers, initialState);
