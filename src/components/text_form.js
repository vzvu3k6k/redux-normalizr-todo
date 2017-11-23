import PropTypes from "prop-types";
import React, { Component } from "react";

export default class TextForm extends Component {
  onClick() {
    this.props.onClick(this.input.value);
  }

  render() {
    return (
      <div className=".text-form">
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

TextForm.propTypes = {
  onClick: PropTypes.func
};

TextForm.defaultProps = {
  onClick: () => {}
};
