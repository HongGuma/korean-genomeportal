import React from "react";
import * as d3 from "d3";

import { ReactComponent as Logo } from "./test.svg";

class GeneMap extends React.Component {
  DrawMap() {
    const data = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    const svg = d3.select(".test2");

    data.forEach((d, i) => {
      svg
        .append("rect")
        .attr("height", data[i])
        .attr("width", 40)
        .attr("x", 50 * i)
        .attr("y", 100 - data[i]);
    });
    return (
      <div className="test">
        <svg className="test2" width="500" height="500"></svg>
      </div>
    );
  }

  render() {
    return (
      //TODO: add D3 worldmap
      <div className="variantsOnMap">
        <h1>This is a Map.</h1>
        <Logo />
      </div>
    );
  }
}

export default GeneMap;
