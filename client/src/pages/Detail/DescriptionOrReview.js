import React, { Component } from "react";
import Description from "./Description";
import Review from "./Review";
import { connect } from "react-redux";

class DescriptionOrReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReview: false
    };
  }

  render() {
    const { matchedItem } = this.props;
    const { isReview } = this.state;
    return (
      <React.Fragment>
        <div className="des-rev">
          <a
            href="#"
            onClick={this.descriptionSection}
            className={isReview ? false : "highlight"}
          >
            Description
          </a>

          <a
            href="#"
            onClick={this.reviewSection}
            className={isReview ? "highlight" : false}
          >
            Review
          </a>
        </div>
        {matchedItem &&
          (isReview ? <Review /> : <Description matchedItem={matchedItem} />)}
      </React.Fragment>
    );
  }

  descriptionSection = e => {
    e.preventDefault();
    this.setState({
      isReview: false
    });
  };
  reviewSection = e => {
    e.preventDefault();
    this.setState({
      isReview: true
    });
  };
}

const mapStateToProps = state => {
  return {
    matchedItem: state.reducer.matchedItem
  };
};

export default connect(mapStateToProps, null)(DescriptionOrReview);
