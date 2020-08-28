import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link, withRouter } from "react-router-dom";

import "./SignIn.css";
import { connect } from "react-redux";
// import * as actions from "../../store/actions";
import { login } from "../../store/actions/Auth";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
    };
  }
  render() {
    const { error, username } = this.state;
    return (
      <div className="wrapper">
        <div className="sign-in account">
          <h4 className="title">Sign In</h4>

          <Form onSubmit={this.onSubmit}>
            {error ? <i>{error}</i> : false}
            <FormGroup>
              <Label>Username: </Label>
              <Input
                type="text"
                name="username"
                placeholder="Username..."
                value={username}
                onChange={this.onChange}
                autoFocus
              />
            </FormGroup>
            <FormGroup>
              <Label>Password: </Label>
              <Input
                type="password"
                name="password"
                placeholder="Password..."
                onChange={this.onChangePassWord}
              />
            </FormGroup>
            <FormGroup>
              <p>
                Do not have an account ? <Link to="/signup">Create one</Link>
              </p>
            </FormGroup>
            <FormGroup className="button">
              <Button color="primary">Sign In</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }

  onChangePassWord = (e) => {
    this.setState({ password: e.target.value, error: "" });
  };
  onChange = (e) => {
    this.setState({ username: e.target.value, error: "" });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let { username, password } = this.state;

    this.props.login(username, password, this.props.history);
    // this.props.history.push("/");
  };

  // THIS IS CLIENT SIDE MAKES THE AJAX REQUEST FOR THE BACKEND. BASICALLY, IT'LL STAY IN THE SAME PAGE
  // IF WE PUT REDIRECT IN BACKEND IT WON'T WORK
  // REDIRECT ONLY WORKS IF WE GO DIRECTLY TO THE BACKEND BY
  // <Form
  // // method="POST"
  // // action="http://localhost:5000/user/signin"
  // <Form>

  // BUT WE HANDLE IT BY USING AJAX SO IT'S NOT GONNA GO ANYWHERE, IT JUST MAKE A AJAX REQUEST TO THE SERVER
  // SO THE ONLY WAY FOR THE COMPONENT TO RE-RENDER IS TO CHANGE THE STATE AFTER AJAX REQUEST COMPLETED
  // CANNOT BE DONE BY AJAX REQUEST TO GET ERROR IN COMPONENTDIDMOUNT() BECAUSE IT DOESN'T MOUNT AGAIN IT JUST SEND DATA

  // TIP:
  // YOU DON'T HAVE TO SCARE THAT THE USERNAME FIELD WILL BE GONE WHEN YOU CLICK THE BUTTON
  // THE PAGE DON'T GO ANY WHERE SO BASICALLY I WON'T REFRESH ANY INCLUDING THE USERNAME
  // FOR GOOD UX JUST CLEAR THE PASSWORD
}

export default withRouter(
  connect(
    null,
    { login }
  )(SignIn)
);
