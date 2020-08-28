import React, { Component } from "react";
import Warning from "../../images/warning.png";
import "./Error.css";

export default class ErrorPage extends Component {
  render() {
    return (
      <div class="error">
        <img src={Warning} alt="" />
        <h3>404 Error</h3>
        <p>Opps! Page not found. Please return.</p>
      </div>
    );
  }
}
