import React, { Component } from "react";
import Logo from "../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import AccountFeature from "./AccountFeature";
import User2 from "../images/user2.png";
import { onSearch } from "../store/actions";
import { connect } from "react-redux";

class Navbar extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.history.push("/search=" + this.props.value);
  };

  render() {
    const { user, cart } = this.props;
    let totalProduct = 0;
    if (cart) {
      cart.forEach((each) => {
        totalProduct += each.quantity;
      });
    }

    return (
      <React.Fragment>
        <div className="navbar">
          <div className="logo">
            <Link to="/">
              <img src={Logo} />
            </Link>
          </div>
          <div className="form">
            {/* <form action={"/search=" + value}> */}
            <form onSubmit={this.onSubmit}>
              <div id="listgroup">
                <input
                  type="text"
                  onChange={(e) => {
                    this.props.onSearch(e.target.value);
                  }}
                />
                <i className="fa fa-search" />
              </div>
            </form>
          </div>
          <div className="menu">
            <li>
              <NavLink to="/">
                <i className="fa fa-home" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                <i className="fa fa-shopping-cart" />
                <span className="total-cart">{totalProduct}</span>
              </NavLink>
            </li>
            {user ? (
              <AccountFeature />
            ) : (
              <li>
                <NavLink to="/signin">
                  <img src={User2} />
                </NavLink>
              </li>
            )}
          </div>
        </div>

        <div className="sub-navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li className="sub-shop-base">
              <a href="#">Shop</a>
              <ul className="sub-shop">
                <li>
                  <Link to="/laptop">Laptop</Link>
                </li>
                <li>
                  <Link to="/phone">Phone</Link>
                </li>
                <li>
                  <Link to="/tablet">Tablet</Link>
                </li>
                <li>
                  <Link to="/others">Others</Link>
                </li>
              </ul>
            </li>
            {/* <li>
              <a href="#">New Arrival</a>
            </li> */}
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.reducer.username,
    cart: state.reducer.cart,
    value: state.navbarReducer.value,
    user: state.authReducer.user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { onSearch }
  )(Navbar)
);

// - Line 19 để tạo dạng vd /search=iphone? để <Route> ở App.js handle
