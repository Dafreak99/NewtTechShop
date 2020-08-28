import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import About from "./About";
import Footer from "../../components/Footer";
import Ourteam from "./Ourteam";

export default class AboutPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <About />
        <Ourteam />
        <Footer />
      </React.Fragment>
    );
  }
}
