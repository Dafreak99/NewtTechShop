import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import Gallery from "./Gallery";
import Contentwrapper from "./Contentwrapper";
import WhyChoose from "./WhyChoose";
import HeroSection from "./HeroSection";
import Footer from "../../components/Footer";
import { connect } from "react-redux";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <Gallery />
        <WhyChoose />
        <Contentwrapper {...this.props} />
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    window.scroll(0, 0);
  }
}
