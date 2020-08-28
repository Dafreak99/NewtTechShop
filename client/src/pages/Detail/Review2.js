import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import { withRouter } from "react-router-dom";
import OtherReviews from "./OtherReviews";
import { connect } from "react-redux";

class Review2 extends Component {
  constructor() {
    super();

    this.state = {
      rating: 1,
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }
  onSubmit = (e) => {
    e.preventDefault();
    let message = e.target.elements.reviewMessage.value;
    const { username, matchedItem } = this.props;
    const { rating } = this.state;
    axios.post("/product/review", {
      username: username,
      reviewStar: rating,
      reviewMessage: message,
      id: matchedItem._id,
    });
    this.props.history.push("/");
  };
  render() {
    const { rating } = this.state;

    return (
      <React.Fragment>
        <div className="review-layout">
          <div className="star">
            <p>Your Rating</p>
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={rating}
              onStarClick={this.onStarClick.bind(this)}
            />
          </div>
          <div className="text">
            <p>Your Rating</p>
            <form onSubmit={this.onSubmit}>
              <div className="list mess">
                <textarea name="reviewMessage" />
              </div>
              <div className="list">
                <button>Review</button>
              </div>
            </form>
          </div>
        </div>
        <OtherReviews matchedItem={this.props.matchedItem} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.reducer.username,
    matchedItem: state.reducer.matchedItem,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Review2)
);
