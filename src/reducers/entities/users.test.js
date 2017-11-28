/* eslint-env jest */

import reducer from "./users";
import Immutable from "immutable";
import * as matchers from "jest-immutable-matchers";
import User, { BUSY, IDLE } from "../../models/user";

describe("users reducer", () => {
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
          users: {
            "user:1": { id: 1, name: "john", status: BUSY }
          }
        }
      }
    };

    expect(reducer(prevState, action)).toEqualImmutable(
      Immutable.Map({
        "user:1": new User({
          id: 1,
          name: "john",
          status: BUSY
        })
      })
    );
  });

  it("should handle FETCH_TODOS when a previous state is filled", () => {
    const prevState = Immutable.Map({
      "user:1": new User({
        id: 1,
        name: "john",
        status: BUSY
      })
    });

    const action = {
      type: "FETCH_TODOS",
      payload: {
        entities: {
          users: {
            "user:2": { id: 2, name: "abbie", status: IDLE }
          }
        }
      }
    };

    expect(reducer(prevState, action)).toEqualImmutable(
      Immutable.Map({
        "user:1": new User({
          id: 1,
          name: "john",
          status: BUSY
        }),
        "user:2": new User({
          id: 2,
          name: "abbie",
          status: IDLE
        })
      })
    );
  });
});
