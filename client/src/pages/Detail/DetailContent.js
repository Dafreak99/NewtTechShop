import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./Detail.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { addToCart } from "../../store/actions";
import { withRouter } from "react-router";
import { toast } from "react-toastify";

class DetailContent extends Component {
  render() {
    const {
      category,
      productName,
      image,
      specification,
      productPrice,
      _id,
    } = this.props.matchedItem;
    return (
      <React.Fragment>
        {this.props.matchedItem && (
          <div className="detail-wrapper">
            <div className="breadcrumb">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/" className="change-color">
                    Home
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to={"/" + category} className="change-color">
                    {category}
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{productName}</BreadcrumbItem>
              </Breadcrumb>
            </div>
            {/* end breadcrumb */}
            <div className="detail-content">
              <div className="detail-image">
                {/* <h3>{productName}</h3>
                <hr />
                <p>{category}</p>
                <hr /> */}
                <img alt="aaa" src={image} />
              </div>
              <div className="detail-info">
                <h3 class="detail-name">{productName}</h3>
                {specification.map((each) => (
                  <ul>
                    <li>{each}</li>
                  </ul>
                ))}
                <h3 className="detail-price">${productPrice}</h3>

                <hr />

                <div className="addtocart">
                  <a href="#" onClick={(e) => this.onClick(e, _id)}>
                    Add To Card
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }

  onClick = (e, id) => {
    e.preventDefault();
    if (this.props.username === "") {
      this.props.history.push("/signin");
    } else {
      // first check if duplicate
      axios(`/addtocart/${id}`).then((res) => {
        if (res.data.status === "error") {
          toast.error(res.data.message);
        } else {
          this.props.addToCart(res.data.item);
          toast.error(res.data.message);
        }
      });
    }
  };
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
    { addToCart }
  )(DetailContent)
);
