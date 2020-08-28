import React, { Component } from "react";
import Update from "../../images/update.png";
import Love from "../../images/love.png";
import Delivery from "../../images/delivery.png";
import Protect from "../../images/protect.png";

export default class WhyChoose extends Component {
  getEach = () => {
    let a = "each";
    setTimeout(() => {}, 2000);
    return a;
  };
  render() {
    return (
      <div className="whychoose">
        <div className="container">
          <div className={this.getEach()}>
            <img src={Delivery} />
            <div className="text">
              <h5>Free Delivery</h5> <p>from $50</p>
            </div>
          </div>
          <div className="each">
            <img src={Love} />
            <div className="text">
              <h5>Positive</h5> <p>feedbacks</p>
            </div>
          </div>
          <div className="each">
            <img src={Protect} />
            <div className="text">
              <h5>Payment</h5> <p>secure System</p>
            </div>
          </div>
          <div className="each">
            <img src={Update} />
            <div className="text">
              <h5>7 Days</h5> <p>return</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
