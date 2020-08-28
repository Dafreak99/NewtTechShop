import React, { Component } from "react";
import img from "../../images/couple_island_aerial_view_132582_1366x768.jpg";
export default class About extends Component {
  render() {
    return (
      <div className="about">
        <div class="left">
          <img src={img} />
        </div>
        <div class="right">
          <h3>About us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
            repellat, dicta at laboriosam, nemo exercitationem itaque eveniet
            architecto cumque, deleniti commodi molestias repellendus quos sequi
            hic fugiat asperiores illum. Atque, in, fuga excepturi corrupti
            error corporis aliquam unde nostrum quas. Accusantium dolor ratione
            maiores est deleniti nihil? Dignissimos est, sunt nulla illum autem
            in, quibusdam cumque recusandae, laudantium minima repellendus.
          </p>
        </div>
      </div>
    );
  }
}
