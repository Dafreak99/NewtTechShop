import React, { Component } from "react";
import { connect } from "react-redux";

class OtherReviews extends Component {
  render() {
    const { matchedItem } = this.props;
    return (
      <div className="other-review">
        <h3>Customers Review</h3>
        {matchedItem.review.map(each => (
          <div className="one-another-review">
            <div className="other-review-star">
              <p className="fa fa-star" />
              <p className="fa fa-star" />
              <p className="fa fa-star" />
              <p className="fa fa-star" />
              <p className="fa fa-star" />
            </div>
            <div className="from">
              <p>
                By: <span>{each.username}</span>
              </p>
              <p>{each.reviewDate}</p>
            </div>
            <div className="content">
              <p>{each.reviewMessage}</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    matchedItem: state.reducer.matchedItem
  };
};

export default connect(
  mapStateToProps,
  null
)(OtherReviews);
