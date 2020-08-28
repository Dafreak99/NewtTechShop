import React, { Component } from "react";
import Featureproduct from "./Featureproduct";
import { connect } from "react-redux";

class Contentwrapper extends Component {
  render() {
    const { content, category = "all" } = this.props;

    let displayOption;

    let getFromCategory = (category) => {
      return content.filter((each) => each.category === category);
    };

    if (category === "all") {
      displayOption = [
        { type: "laptop", content: getFromCategory("laptop").slice(0, 8) },
        { type: "phone", content: getFromCategory("phone").slice(0, 8) },
        { type: "tablet", content: getFromCategory("tablet").slice(0, 8) },
        { type: "others", content: getFromCategory("others").slice(0, 8) },
      ];
    } else {
      displayOption = [{ type: category, content: getFromCategory(category) }];
    }

    // ở bước này ta có thể filter theo category rồi mới render

    return (
      <div className="entire-content">
        <>
          {displayOption.map((each, i) => {
            return (
              <Featureproduct
                content={each.content}
                // 'All' means Home page with 4 sections(8 products each-> See more)
                seemore={category === "all" ? true : false}
                title={each.type}
                bonusClass={each.type}
                key={i}
              />
            );
          })}
        </>
      </div>
    );
  }

  componentDidMount() {}
}

const mapStateToProps = (state) => {
  return {
    content: state.reducer.content,
  };
};

export default connect(
  mapStateToProps,
  null
)(Contentwrapper);
