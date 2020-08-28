import React, { Component } from "react";
import UserImage from "../images/user.png";
import Logout from "../images/logout.png";
import InfoImage from "../images/info.png";
import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";
import { logout } from "../store/actions/Auth";
import { connect } from "react-redux";

class AccountFeature extends Component {
  state = {
    isCollapse: false
  };

  collapseUser = () => {
    this.setState({
      isCollapse: !this.state.isCollapse
    });
  };

  render() {
    const { isCollapse } = this.state;
    const {
      user: { username, email }
    } = this.props;
    return (
      <React.Fragment>
        <li id="user" onClick={this.collapseUser}>
          <img src={UserImage} />
        </li>
        <div className={isCollapse ? "account-feature a" : "account-feature"}>
          <div className="account-feature-top">
            <div className="arrow-up" />
            <div className="avatar-holder">
              <img src={UserImage} />
            </div>
            <div className="data-holder">
              <p>{username}</p>
              <p>{email}</p>
              <Link to="/info">
                <img src={InfoImage} />
                Edit Profile
              </Link>
            </div>
          </div>
          <a href="/logout" onClick={this.onClick}>
            <img src={Logout} />
            Logout
          </a>
        </div>
      </React.Fragment>
    );
  }

  onClick = e => {
    e.preventDefault();
    this.props.logout();

    this.props.history.push("/");
  };
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

export default withRouter(connect(mapStateToProps, { logout })(AccountFeature));
