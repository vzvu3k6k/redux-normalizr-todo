/* eslint-env jest */

import reducer from "./todos";
import Immutable from "immutable";
import * as matchers from "jest-immutable-matchers";

describe("todos reducer", () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqualImmutable(
      Immutable.Map({
        todos: Immutable.OrderedSet()
      })
    );
  });

  it("should handle FETCH_TODOS when a previous state is empty", () => {
    const prevState = Immutable.Map({ todos: Immutable.OrderedSet() });
    const action = {
      type: "FETCH_TODOS",
      payload: {
        result: {
          todos: [{ todo: "todo:1" }, { todo: "todo:2" }]
        }
      }
    };

    expect(reducer(prevState, action)).toEqualImmutable(
      Immutable.Map({ todos: Immutable.OrderedSet(["todo:1", "todo:2"]) })
    );
  });

  it("should handle FETCH_TODOS when a previous state is filled", () => {
    const prevState = Immutable.Map({
      todos: Immutable.OrderedSet(["todo:1", "todo:2"])
    });
    const action = {
      type: "FETCH_TODOS",
      payload: {
        result: {
          todos: [{ todo: "todo:3" }, { todo: "todo:4" }]
        }
      }
    };

    expect(reducer(prevState, action)).toEqualImmutable(
      Immutable.Map({
        todos: Immutable.OrderedSet(["todo:1", "todo:2", "todo:3", "todo:4"])
      })
    );
  });

  it("should handle CREATE_TODO when a previous state is empty", () => {
    const prevState = Immutable.Map({ todos: Immutable.OrderedSet() });
    const action = {
      type: "CREATE_TODO",
      payload: {
        result: {
          todo: "todo:1"
        }
      }
    };

    expect(reducer(prevState, action)).toEqualImmutable(
      Immutable.Map({ todos: Immutable.OrderedSet(["todo:1"]) })
    );
  });

  it("should handle CREATE_TODO when a previous state is filled", () => {
    const prevState = Immutable.Map({
      todos: Immutable.OrderedSet(["todo:1", "todo:2"])
    });
    const action = {
      type: "CREATE_TODO",
      payload: {
        result: {
          todo: "todo:3"
        }
      }
    };

    expect(reducer(prevState, action)).toEqualImmutable(
      Immutable.Map({
        todos: Immutable.OrderedSet(["todo:1", "todo:2", "todo:3"])
      })
    );
  });
});
