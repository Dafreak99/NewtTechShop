import React, { Component } from "react";
import Gallery from "../pages/Home/Gallery";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Product from "./Product";

class Search extends Component {
  render() {
    const { content } = this.props;
    const { key } = this.props.match.params;
    let matched = content.filter((each) => {
      return each.productName.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    });

    return (
      <React.Fragment>
        <Navbar />
        <Gallery />
        <div className="featureproduct">
          <div className="product-section-wrapper">
            <div className="products search">
              <i>{matched.length} products found</i>
              {/* render founded products */}
              {matched.map((each, i) => (
                <Product product={each} i={i} />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
  componentDidMount() {
    window.scroll(0, 0);
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.reducer.content,
  };
};

export default connect(
  mapStateToProps,
  null
)(Search);
