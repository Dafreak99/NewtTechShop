import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import Contact from "./Contact";
import Footer from "../../components/Footer";

export default class ContactPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Contact />
        <Footer />
      </React.Fragment>
    );
  }
}
