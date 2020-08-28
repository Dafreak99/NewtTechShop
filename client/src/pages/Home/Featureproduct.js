import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { addToCart } from "../../store/actions";
import { toast } from "react-toastify";
import Product from "../../components/Product";

class Featureproduct extends Component {
  render() {
    const { content, title, bonusClass, seemore } = this.props;

    return (
      <div className={"featureproduct " + bonusClass}>
        <div className="product-section-wrapper">
          <div className="product-section-heading">
            <h3 className="title">{title}</h3>
            {seemore === true &&
              (title !== "Lastest Product" ? (
                <Link className="seemore change-color" to={"/" + bonusClass}>
                  See More
                </Link>
              ) : (
                ""
              ))}
          </div>
          <div className="products">
            {content.map((each, i) => (
              <Product product={each} i={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { addToCart }
  )(Featureproduct)
);
