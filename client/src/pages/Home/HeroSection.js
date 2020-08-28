import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Test extends Component {
  render() {
    return (
      <div className="hero-section">
        <div className="hero-column-left">
          <div className="floating-image" />
        </div>
        <div className="hero-column-right">
          <div className="content">
            <h5>Shop is fun</h5>
            <h3>BROWSE OUR PREMIUM PRODUCT</h3>
            <p>
              Us which over of signs divide dominion deep fill bring they're
              meat beho upon own earth without morning over third. Their male
              dry. They are great appear whose land fly grass.
            </p>
            <Link to="/dasda">Browse Now</Link>
          </div>
        </div>
      </div>
    );
  }
}
