import { handleActions } from "redux-actions";
import Immutable from "immutable";
import _ from "lodash";
import Todo, { DONE } from "../../models/todo";

function merge(state, action) {
  const payload = action.payload;
  return state.withMutations(mutable => {
    _.values(payload.entities.todos).forEach(value => {
      const entityId = new Todo(value).entityId;
      mutable.update(entityId, new Todo(), current => current.merge(value));
    });
  });
}

function finish(state, action) {
  const entityId = action.payload.entityId;
  return state.update(entityId, todo => todo.set("status", DONE));
}

const handlers = {
  FETCH_TODOS: merge,
  CREATE_TODO: merge,
  FINISH_TODO: finish
};

const initialState = Immutable.Map();

export default handleActions(handlers, initialState);
