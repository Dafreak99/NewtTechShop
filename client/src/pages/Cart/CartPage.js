import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import Cart from "./Cart";
import Footer from "../../components/Footer";
import { connect } from "react-redux";
class CartPage extends Component {
  render() {
    const { cart } = this.props;

    return (
      <React.Fragment>
        <Navbar />
        {cart.length !== 0 ? (
          <Cart cart={cart} />
        ) : (
          <div className="emptycart">
            <h3>Your Cart Is Currently Empty</h3>
          </div>
        )}
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.reducer.cart,
  };
};

export default connect(
  mapStateToProps,
  null
)(CartPage);
