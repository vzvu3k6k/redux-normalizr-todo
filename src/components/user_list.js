import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import { bindActionCreators } from "redux";
import { fetchUsers } from "../actions/users";

class UserList extends Component {
  get value() {
    return this.selector.value;
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="user-list" style={{ display: "inline-block" }}>
        <select
          ref={selector => {
            this.selector = selector;
          }}
        >
          {this.props.users.map(user => {
            return (
              <option key={user.entityId} value={user.entityId}>
                {user.name}
                {user.isBusy ? ":Busy" : ""}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

UserList.propTypes = {
  users: ImmutablePropTypes.orderedSet.isRequired,
  fetchUsers: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users.get("users").map(entityId => {
      return state.entities.users.get(entityId);
    })
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchUsers
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps, undefined, {
  withRef: true
})(UserList);
