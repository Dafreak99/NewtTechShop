import React, { Component } from "react";

export default class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <h3>Contact US</h3>
        <p>You can contact us directly by calling 070.3034.308</p>
        <p>Or leave the message.</p>
        <form action="http://localhost:5000/message" method="POST">
          <div className="list">
            <input type="text" required name="name" id="name" />{" "}
            <label for="name">Your Name </label>
          </div>
          <div className="list">
            <input type="text" required name="email" id="email" />{" "}
            <label for="email">Your Email</label>
          </div>
          <div className="contact-text-box">
            <textarea rows="6" name="message" />
          </div>
          <div className="contact-button">
            <button>Send</button>
          </div>
        </form>
      </div>
    );
  }
}
