import React, { Component } from "react";
import Ava1 from "../../images/ava1.jpg";
import Ava2 from "../../images/ava2.jpg";
import Ava3 from "../../images/ava3.jpg";

export default class Ourteam extends Component {
  render() {
    return (
      <div className="ourteam">
        <h3>Our team</h3>
        <div className="each">
          <div className="personal-info">
            <img src={Ava1} alt="hai" />
            <h4>Tran Chau Hai</h4>
            <i>Fullstack Website Developer</i>
          </div>
          <div class="personal-quote">
            <q>To use the new parser, pass option to MongoClient.connect</q>
          </div>
        </div>
        {/* end each person */}
        <div className="each">
          <div className="personal-info">
            <img src={Ava2} alt="hai" />
            <h4>Nguyen Manh Cuong</h4>
            <i>Chef Executive</i>
          </div>
          <div class="personal-quote">
            <q>To use the new parser, pass option to MongoClient.connect</q>
          </div>
        </div>
        {/* end each person */}
        <div className="each">
          <div className="personal-info">
            <img src={Ava3} alt="hai" />
            <h4>Pham Quoc Toan</h4>
            <i>Garbage Collection</i>
          </div>
          <div class="personal-quote">
            <q>To use the new parser, pass option to MongoClient.connect</q>
          </div>
        </div>
        {/* end each person */}
      </div>
    );
  }
}
