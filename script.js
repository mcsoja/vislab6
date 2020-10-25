d3.csv('unemployment.csv', d3.autoType).then(data => {
    console.log(data)

    data.map(function(d){
        d.total = d.Agriculture + d.Business_services + d.Construction + d.Education_and_Health + d.Finance + d.Government + d.Information + d.Leisure_and_hospitality + d.Manufacturing + d.Mining_and_Extraction + d.Other + d.Selfemployed + d.Transportation_and_Utilities + d.Wholesale_and_Retail_Trade;
        return d;
    })

    // input: selector for a chart container e.g., ".chart"
function AreaChart(container){

    // initialization
       let margin = { top: 40, right: 20, bottom: 40, left: 90 },
       width =
       document.querySelector(".chart").clientWidth -
       margin.left -
       margin.right,
       height = 400 - margin.top - margin.bottom; 
   
   width = width > 600 ? 600 : width;
   
   let svg = d3
       .select(".chart")
       .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr('transform', `translate(${margin.left},${margin.top})`);

    let x = d3
       .scaleTime()
       .range([0,width])

    let xAxis = d3
       .axisBottom()
       .scale(x)
    
    let xAxisGroup = svg
    .append("g")
    .attr("class", "x-axis axis")
    .call(xAxis)
    
    let y = d3
        .scaleLinear()
        .range([height, 0]);
    
    x.domain(
            d3.extent(data, d=>d.date)
        );
        y.domain([0, d3.max(data, d=>d.total)]);

        console.log("Y", y(5000))

    // define the area
    var area = d3.area()
    .x(function(d) { return x(d.date); })
    .y0(y(0))
    .y1(function(d) { return y(d.total); });

    svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area)
    .attr("fill", 'pink')
    
    let yAxis = d3.axisLeft().scale(y);
        
    let yAxisGroup = svg.append("g").attr("class", "y-axis axis").call(yAxis)

	function update(data){ 

        x.domain(
            d3.extent(data, d=>d.date)
        );
        y.domain([0, d3.max(data, d=>d.total)]);
        

        console.log(y(5000))

        var area = d3.area()
        .x(function(d) { return x(d.date); })
        .y1(function(d) { return y(d.total); })
        .y0(y(0))
        

        svg.select('.path')
        .datum(data)
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", 'pink')

        xAxisGroup = svg
                .select(".x-axis")
                // .transition()
                // .duration(1000)
                // .delay(500)
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

        yAxisGroup = svg
                .select(".y-axis")
                // .transition()
                // .duration(1000)
                // .delay(1000)
                .call(yAxis);
        
        x = d3
                .scaleTime()
                .range([0, width])
        
        y = d3.scaleLinear().range([height, 0]);



		// update scales, encodings, axes (use the total count)
		
	}
	return {
		update // ES6 shorthand for "update": update
	};
}

const areaChart2 = AreaChart(".chart");

areaChart2.update(data);
});