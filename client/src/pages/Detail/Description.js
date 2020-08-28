import React, { Component } from "react";

export default class Description extends Component {
  render() {
    const { matchedItem } = this.props;

    return (
      <div className="product-description ok">
        <h5>Description</h5>
        <hr />
        <p>{matchedItem.description}</p>
      </div>
    );
  }
}
