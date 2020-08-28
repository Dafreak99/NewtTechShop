import React, { Component } from "react";
import { Link } from "react-router-dom";
import { render } from "jade";
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addToCart } from "../store/actions";

class Product extends Component {
  render() {
    const { product, i } = this.props;

    return (
      <div key={i} className="product">
        <Link to={"/detail=" + product._id}>
          <div className="image">
            <img alt="aaa" src={product.image} />
          </div>
          <div className="product-info">
            <div className="info">
              <p>{product.productName}</p>
            </div>
            <div className="star">
              <p
                className={product.discountPrice > 0 ? "line-through" : "price"}
              >
                ${product.productPrice}
              </p>
              <div className="starr">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <br />
              {product.discountPrice > 0 && (
                <p id="dis">${product.currentPrice}</p>
              )}
            </div>
          </div>
        </Link>
        <a
          onClick={(e) => this.onClick(e, product._id)}
          href="#"
          className="addtoCart"
        >
          Add to cart
        </a>
      </div>
    );
  }

  onClick = async (e, id) => {
    e.preventDefault();
    const { authReducer, addToCart, history } = this.props;

    if (!authReducer.isAuthenticated) {
      history.push("/signin");
    } else {
      try {
        let res = await axios(`/addtocart/${id}`);

        if (res.data.status === "error") {
          toast.success(res.data.message);
        } else {
          addToCart(res.data.item);
          toast.success(res.data.message, { autoClose: 1000 });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
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
  )(Product)
);
