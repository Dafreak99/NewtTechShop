import React, { Component } from "react";

import Review2 from "./Review2";
import Review1 from "./Review1";
import Axios from "axios";

export default class Review extends Component {
  state = {
    isLogin: false,
    username: ""
  };
  render() {
    const { isLogin, username } = this.state;

    return (
      <div className="product-review">
        <h5>Review</h5>
        <hr />
        {isLogin ? <Review2 /> : <Review1 />}
      </div>
    );
  }

  async componentDidMount() {
    Axios.get("/user/info").then(res => {
      res.data
        ? this.setState({ isLogin: true, username: res.data })
        : this.setState({ isLogin: false });
    });
  }
}
