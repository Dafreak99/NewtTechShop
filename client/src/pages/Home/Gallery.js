import React, { Component } from "react";

import Gallerybox from "../../components/Gallerybox";

export default class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      categories: [
        { type: "laptop" },
        { type: "phone" },
        { type: "tablet" },
        { type: "others" }
      ]
    };
  }
  render() {
    const { categories } = this.state;
    return (
      <div className="gallery">
        {categories.map((each, i) => (
          <Gallerybox key={i} category={each.type} />
        ))}
      </div>
    );
  }
}
