import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { schemeDark2 } from "d3";

function Piechart({ languages }) {
  const data = languages;
  console.log(data);
  const pieChart = useRef();
  useEffect(() => {
    const piedata = d3.pie().value((d) => d.count)(data);
    const arc = d3.arc().innerRadius(0).outerRadius(150);
    const colors = d3.scaleOrdinal(schemeDark2);
    const svg = d3
      .select(pieChart.current)
      .attr("width", 300)
      .attr("height", 300)
      .style("background", "none")
      .append("g")
      .attr("transform", "translate(150,150)");

    const tooldiv = d3
      .select("#chartArea")
      .append("div")
      .style("visibility", "visible")
      .style("position", "absolute")
      .style("background-color", "red")
      .style("border-radius", "5px")
      .style("font-weight", "bold");

    svg
      .append("g")
      .selectAll("path")
      .data(piedata)
      .join("path")
      .attr("d", arc)
      .attr("fill", colors)
      .attr("stroke", "white")
      .on("mouseover", (e, d) => {
        console.log(e);
        console.log(d.data.item, d.data.count);
        tooldiv
          .style("visibility", "visible")
          .text(`${d.data.item}: ` + `${d.data.count}`)
          .style("cursor", "pointer");
      })
      .on("mousemove", (e, d) => {
        tooldiv
          .style("top", e.pageY - 50 + "px")
          .style("left", e.pageX - 50 + "px");
      })
      .on("mouseout", (e, d) => {
        tooldiv.style("visibility", "hidden");
      });
  }, [data]);

  return (
    <div className="svgPieChart" id="chartArea">
      <svg ref={pieChart}></svg>
    </div>
  );
}

export default Piechart;
