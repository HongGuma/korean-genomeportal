import React from "react";
import * as d3 from "d3";

class GeneBar2 extends React.Component {
  componentDidMount() {
    const data = this.props.variants;

    if (data.length > 0) {
      this.DrawBarchart(data);
    }
  }
  componentDidUpdate() {
    const data = this.props.variants;

    if (data.length > 0) {
      d3.selectAll("svg>*").remove();
      this.DrawBarchart(data);
    }
  }
  DrawBarchart(data) {
    const canvasHeight = 250;
    const canvasWidth = 1500;
    var margin = { top: 20, right: 40, bottom: 30, left: 40 };

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.pos), d3.max(data, (d) => d.pos)])
      .nice()
      .range([margin.left, canvasWidth - margin.right]);

    const yScale = d3
      .scaleLinear()
      //.domain([d3.min(data,d=>d.AF_U10K),d3.max(data,d=>d.AF_U10)]).nice()
      .domain([0, 1])
      .nice()
      .range([canvasHeight - margin.bottom, margin.top]);
    const colorAssign = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.variantclass))
      .range(d3.schemeCategory10);

    const xAxisSVG = d3
      .select(this.refs.canvas)
      .append("g")
      .attr("transform", `translate(0,${canvasHeight - margin.bottom})`);
    const yAxisSVG = d3.select(this.refs.canvas).append("g");

    const xAxis = d3.axisBottom(xScale).tickSize(10).ticks(10);
    const yAxis = d3.axisRight(yScale).tickSize(10).ticks(10);

    xAxis(xAxisSVG);
    yAxis(yAxisSVG);

    d3.select(this.refs.canvas)
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("fill", (d) => colorAssign(d.variantclass))
      .attr("x", (d) => xScale(d.pos))
      .attr("y", (d) => yScale(d.allelefrequency))
      .attr("height", (d) => yScale(0) - yScale(d.allelefrequency))
      .attr("width", "3")
      .attr("fill-opacity", "0.5");

    //Legend
    var keys = [...new Set(data.map((d) => d.variantclass))];
    var keyLoc = 0;
    var keyLoc2 = 0;
    d3.select(this.refs.legend)
      .selectAll("mydots")
      .data(keys)
      .enter()
      .append("circle")
      .attr("cy", 25)
      .attr("cx", function (d, i) {
        let pos = 10 + keyLoc;
        keyLoc += d.length * 10 + 15;
        return pos;
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 7)
      .style("fill", function (d) {
        return colorAssign(d);
      });

    d3.select(this.refs.legend)
      .selectAll("mylabels")
      .data(keys)
      .enter()
      .append("text")
      .attr("y", 25)
      .attr("x", function (d, i) {
        let pos = 20 + keyLoc2;
        keyLoc2 += d.length * 10 + 15;
        return pos;
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function (d) {
        return colorAssign(d);
      })
      .text(function (d) {
        return d;
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");
  }

  render() {
    return (
      <div class="">
        <h3>Allele frequency information</h3>
        <svg ref="canvas" width="1500px" height="250px"></svg>
        <svg ref="legend" width="1500px" height="50px"></svg>
      </div>
    );
  }
}

export default GeneBar2;
