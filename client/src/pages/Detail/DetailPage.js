import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import DetailContent from "./DetailContent";
import DescriptionOrReview from "./DescriptionOrReview";
import { connect } from "react-redux";
import { getDetailItem, loadData } from "../../store/actions";
import axios from "axios";

class DetailPage extends Component {
  state = {
    matchedItem: null,
  };

  render() {
    const { matchedItem } = this.props;

    return (
      <React.Fragment>
        <Navbar />
        {matchedItem ? (
          <React.Fragment>
            <DetailContent />
            <DescriptionOrReview />
          </React.Fragment>
        ) : (
          false
        )}
      </React.Fragment>
    );
  }

  componentDidMount() {
    window.scroll(0, 0);

    // if refresh from this page the action will call before load data so there is no data to render
  }

  componentWillMount() {
    // if see the detail from the thumbnail...the data is ready
    // if see the detail from detail page the content'll lost
    // check 2 scenarios
    let { content } = this.props;
    const { id } = this.props.match.params;
    let matchedItem;
    if (content.length !== 0) {
      matchedItem = this.props.content.find((each) => each._id === id);

      this.props.getDetailItem(matchedItem);
    } else {
      // see in detail page
      axios.get("/products").then((res) => {
        matchedItem = res.data.find((each) => each._id === id);
        this.props.getDetailItem(matchedItem);
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.reducer.content,
    username: state.reducer.username,
    matchedItem: state.reducer.matchedItem,
  };
};
export default connect(
  mapStateToProps,
  { getDetailItem, loadData }
)(DetailPage);
