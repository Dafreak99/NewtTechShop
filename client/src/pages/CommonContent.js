import React, { Component } from "react";
import Navbar from "../components/Navbar";

import Gallery from "../pages/Home/Gallery";
import Contentwrapper from "../pages/Home/Contentwrapper";
import Footer from "../components/Footer";
export default class CommonContent extends Component {
  render() {
    const { category } = this.props;

    return (
      <div>
        <Navbar />
        <Gallery />
        <Contentwrapper category={category} />
        <Footer />
      </div>
    );
  }
  componentDidMount() {
    window.scroll(0, 0);
  }
}

// - Truyền category làm căn cứ logic cho Contentwrapper render đúng loại product
