import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Review1 extends Component {
  render() {
    return (
      <div className="review-login">
        <p>Please login to make your review</p>
        <Link to="/signin">Sign In</Link>
      </div>
    );
  }
}
