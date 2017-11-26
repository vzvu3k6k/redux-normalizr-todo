/* eslint-env jest */

import reducer from "./todos";
import Immutable from "immutable";
import * as matchers from "jest-immutable-matchers";
import Todo, { INIT, DONE } from "../../models/todo";

describe("todos reducer", () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqualImmutable(Immutable.Map());
  });

  it("should handle FETCH_TODOS when a previous state is empty", () => {
    const prevState = Immutable.Map();
    const action = {
      type: "FETCH_TODOS",
      payload: {
        entities: {
          todos: {
            "todo:1": {
              id: 1,
              body: "ticket #1",
              status: INIT,
              userId: 1,
              user: "user:1"
            }
          }
        }
      }
    };

    expect(reducer(prevState, action)).toEqualImmutable(
      Immutable.Map({
        "todo:1": new Todo({
          id: 1,
          body: "ticket #1",
          status: INIT,
          userId: 1,
          user: "user:1"
        })
      })
    );
  });

  it("should handle FETCH_TODOS when a previous state is filled", () => {
    const prevState = Immutable.Map({
      "todo:1": new Todo({
        id: 1,
        body: "ticket #1",
        status: INIT,
        userId: 1,
        user: "user:1"
      })
    });

    const action = {
      type: "FETCH_TODOS",
      payload: {
        entities: {
          todos: {
            "todo:2": {
              id: 2,
              body: "ticket #2",
              status: INIT,
              userId: 2,
              user: "user:2"
            }
          }
        }
      }
    };

    expect(reducer(prevState, action)).toEqualImmutable(
      Immutable.Map({
        "todo:1": new Todo({
          id: 1,
          body: "ticket #1",
          status: INIT,
          userId: 1,
          user: "user:1"
        }),
        "todo:2": new Todo({
          id: 2,
          body: "ticket #2",
          status: INIT,
          userId: 2,
          user: "user:2"
        })
      })
    );
  });

  it("should handle FINISH_TODO", () => {
    const prevState = Immutable.Map({
      "todo:1": new Todo({
        id: 1,
        body: "ticket #1",
        status: INIT,
        userId: 1,
        user: "user:1"
      }),
      "todo:2": new Todo({
        id: 2,
        body: "ticket #2",
        status: INIT,
        userId: 2,
        user: "user:2"
      })
    });

    const action = {
      type: "FINISH_TODO",
      payload: {
        entityId: "todo:1"
      }
    };

    expect(reducer(prevState, action)).toEqualImmutable(
      Immutable.Map({
        "todo:1": new Todo({
          id: 1,
          body: "ticket #1",
          status: DONE,
          userId: 1,
          user: "user:1"
        }),
        "todo:2": new Todo({
          id: 2,
          body: "ticket #2",
          status: INIT,
          userId: 2,
          user: "user:2"
        })
      })
    );
  });
});
