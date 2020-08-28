import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignIn.css";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      repassword: "",
      dataFromServer: "",
      error: ""
    };
  }
  render() {
    const { error } = this.state;
    return (
      <div className="wrapper">
        <div className="sign-up account">
          <h4 className="title">Sign Up</h4>
          <Form onSubmit={this.onSubmit}>
            {error ? <i>{error}</i> : false}
            <FormGroup>
              <Label>Username: </Label>
              <Input
                type="text"
                name="username"
                placeholder="Username..."
                onChange={this.chageInput}
                autoFocus
              />
            </FormGroup>
            <FormGroup>
              <Label>Email: </Label>
              <Input
                type="email"
                name="email"
                placeholder="Email..."
                onChange={this.chageInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password: </Label>
              <Input
                type="password"
                name="password"
                placeholder="Password..."
                onChange={this.chageInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>Re-Password: </Label>
              <Input
                type="password"
                name="repassword"
                placeholder="Re enter password..."
                onChange={this.chageInput}
                onKeyDown={this.onKeyDown}
              />
            </FormGroup>
            <FormGroup>
              <p>
                Already have an account ? <Link to="/signin">Login</Link>
              </p>
            </FormGroup>
            <FormGroup className="button">
              <Button color="primary">Create</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }

  onSubmit = async e => {
    e.preventDefault();

    const { password, repassword, email, username } = this.state;

    this.setState({
      error: ""
    });

    // Check if password equals repassword

    if (password !== repassword) {
      this.setState({
        error: "Password doesn't match"
      });
      setTimeout(() => this.setState({ error: "" }), 1000);

      return false;
    }

    try {
      let respond = await axios.post("/user/signup", {
        username,
        password,
        email
      });
      toast.success("Sign Up Successed");
      console.log(respond.data.token);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    this.props.history.push("/");
  };

  chageInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    axios("/user/api").then(res => this.setState({ dataFromServer: res.data }));
  }
}

export default withRouter(SignUp);
