export default function AreaChart(container){

  const margin = ({ top: 40, right: 20, bottom: 40, left: 90 });
  const width = 650 - margin.left - margin.right;
  const height = 150 - margin.top - margin.bottom;
  
  let svg = d3
      .select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  let xScale = d3
      .scaleTime()
      .range([0,width])

  let yScale = d3
      .scaleLinear()
      .range([height,0])

  svg.append("path")
      .attr("class", "area")
      .attr("fill", 'darkblue')

  //=== Create & Initialize Axes ===
  var xAxis = d3.axisBottom()
      .scale(xScale);

  var yAxis = d3.axisLeft()
      .scale(yScale);

  svg.append("g")
      .attr('class', 'axis x-axis');

  svg.append('g')
      .attr('class', 'axis y-axis');

  //Brush
  const listeners = { brushed: null };
  
  const brush = d3
      .brushX()
      .extent([[0,0],[width,height]])
      .on('brush', brushed)
      .on('end', brushed);

  svg.append("g").attr('class', 'brush').call(brush);

  function brushed(event) {
      if (event.selection) {
        console.log("brushed", event.selection);
        listeners["brushed"](selection.map(xScale.invert));
      }
    }

    function drawAxes(){
      svg.select('.x-axis')
          .call(xAxis)
          .attr("transform", `translate(0, ${height})`);
      svg.select('.y-axis')
          .call(yAxis)

  }


  //====Update function====
  function update(data){ 

      xScale
          .domain(d3.extent(data, d=>d.date));
      yScale
          .domain([0, d3.max(data, d=>d.total)]);

      var area = d3.area()
          .x(function(d) { return xScale(d.date); })
          .y0(function() { return yScale(0); })
          .y1(function(d) { return yScale(d.total); });
      
      d3.select(".area")
          .datum(data)
          .attr("d",area)

      drawAxes();
  }
  function on(event, listener) {
  listeners[event] = listener;
   }

return {
      update, 
      on
  }
}