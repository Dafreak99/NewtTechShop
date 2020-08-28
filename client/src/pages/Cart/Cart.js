import React, { Component } from "react";
import "./Cart.css";
import axios from "axios";
import { onChangeCartItemQuantity, removeFromCart } from "../../store/actions";
import { connect } from "react-redux";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      updateMessage: ""
    };
  }

  render() {
    const { cart } = this.props;
    const { updateMessage } = this.state;
    let totalcost = cart.reduce((initial, { currentPrice, quantity }) => {
      return initial + currentPrice * quantity;
    }, 0);
    totalcost = Math.round(totalcost * 100) / 100;

    const content = cart.map(each => (
      <tr className={"content " + each._id}>
        <td>
          <img src={each.image} />
          <p>{each.productName}</p>
        </td>
        <td>${each.currentPrice}</td>
        <td>
          <input
            type="number"
            value={each.quantity}
            onChange={e =>
              this.props.onChangeCartItemQuantity(e.target.value, each._id)
            }
            min="1"
          />
        </td>
        <td>${each.currentPrice * each.quantity}</td>
        <td>
          <a
            onClick={e => {
              e.preventDefault();
              this.props.removeFromCart(each._id);
            }}
            href="#"
            className="fa fa-trash"
          >
            <p />
          </a>
        </td>
      </tr>
    ));

    return (
      <div className="cart">
        {updateMessage ? <h3 id="errorMessage">{updateMessage}</h3> : false}

        <div className="cartproduct">
          <tr className="field">
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
          {/* ------- */}
          {content}
          {/* ------- */}
          <div className="updatecart">
            <button onClick={this.update}>Update All</button>
          </div>
        </div>
        <div className="invoice">
          <h4>Cart totals</h4>
          <div>
            <p>Shipping</p>
            <p>Normal shipping $10</p>
            <p>Express shipping $30</p>
          </div>
          <div>
            <p>Total</p>
            <h4>${totalcost}</h4>
          </div>
          <div className="shipping">
            <a href="#">Proceed Shipping</a>
          </div>
        </div>
      </div>
    );
  }

  update = () => {
    const { cart } = this.props;
    axios
      .post("/updatecart", {
        cart
      })
      .then(res => console.log(res.data));
    this.setState({ updateMessage: "Update Successful" });
    setTimeout(() => {
      this.setState({ updateMessage: "" });
    }, 1000);
  };
}

export default connect(
  null,
  { onChangeCartItemQuantity, removeFromCart }
)(Cart);
