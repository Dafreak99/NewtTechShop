import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="provide">
          <h3>We provide:</h3>
          <ul>
            <li>
              <a href="">Laptop</a>
            </li>
            <li>
              <a href="">Tablet</a>
            </li>
            <li>
              <a href="">Phone</a>
            </li>
            <li>
              <a href="">Others</a>
            </li>
          </ul>
        </div>
        <div className="subscribe">
          <h3>Subscribe us for lastest products everyweek</h3>
          <form action="">
            <input type="text" />
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
