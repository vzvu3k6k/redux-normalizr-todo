import { handleActions } from "redux-actions";
import Immutable from "immutable";
import _ from "lodash";
import User from "../../models/user";

function merge(state, action) {
  const payload = action.payload;
  return state.withMutations(mutable => {
    _.values(payload.entities.users).forEach(value => {
      const entityId = new User(value).entityId;
      mutable.update(entityId, new User(), current => current.merge(value));
    });
  });
}

const handlers = {
  FETCH_TODOS: merge
};

const initialState = Immutable.Map();

export default handleActions(handlers, initialState);
