export default function StackedAreaChart(container){

     // initialization
     let margin = { top: 40, right: 20, bottom: 40, left: 90 },
     width =
     710 -
     margin.left -
     margin.right,
     height = 400 - margin.top - margin.bottom; 

     var type = ""
     let selected = null, xDomain, _data;

    let svg = d3
        .select(".chart2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const tooltip = svg
     .append("text")
     .text(type)

    let xScale = d3
        .scaleTime()
        .range([0,width])

    let yScale = d3
        .scaleLinear()
        .range([height,0])

    //=== Create & Initialize Axes ===
    var xAxis = d3.axisBottom()
        .scale(xScale);

    var yAxis = d3.axisLeft()
        .scale(yScale);

    svg.append("g")
        .attr('class', 'axis x-axis');

    svg.append('g')
        .attr('class', 'axis y-axis');
    
        function update(_data){
		    data = _data; // -- (2)
		    xScale.domain(xDomain? xDomain: d3.extent(data, d=>d.date));  // -- (5)
	    }

    //====Update function====
    function update(data){ 

        let fieldkeys = data.columns.slice(1)
        console.log(fieldkeys)

        const keys = selected? [selected] : fieldkeys

        console.log(keys)
    
        var stack = d3.stack()
            .keys(fieldkeys)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);
    
        var series = stack(data);
    

        xScale
            .domain(d3.extent(data, d=>d.date));
        yScale
            .domain([0, d3.max(data, d=>d.total)]);

        var area2 = d3.area()
            .x(d=>xScale(d.date)) //when this is changed it doesn't show anymore
            .y0(d=>yScale(d[0]))
            .y1(d=>yScale(d[1]))
            
        
        d3.select(".area2")
            .datum(data)
            .attr("d",area2)
            
        xScale.domain(d3.extent(data, d=>d.date))
        yScale.domain([0, d3.max(series, d => d3.max(d, d => d[1]))])

        var colorScale = d3.scaleOrdinal(d3.schemeTableau10)
            .domain(fieldkeys);

        var area2 = d3.area()
            .x(d=>xScale(d.data.date))
            .y0(d=>yScale(d[0]))
            .y1(d=>yScale(d[1]))

        svg.selectAll("path")
            .data(series)
            .join("path")
            .attr("fill", d=>colorScale(d.key))
            .attr("d", area2)  
            .on("mouseover", (event, d, i) => tooltip.text(d.key))
            .on("mouseout", (event, d, i) => tooltip.text(""))
            .on("click", (event, d) => {
                console.log("CLICK")
                // toggle selected based on d.key
                if (selected === d.key) {
                    selected = null;
                } else {
                    selected = d.key;
                }
                console.log(selected)
            update(data); // simply update the chart again
        });

        drawAxes();
    }

    function filterByDate(range){
		xDomain = range;  // -- (3)
		update(data); // -- (4)
	}

	return {
        update,
        filterByDate
    }
    
    function drawAxes(){
        svg.select('.x-axis')
            .call(xAxis)
            .attr("transform", `translate(0, ${height})`);
        svg.select('.y-axis')
            .call(yAxis)

    }
};

// const StackedAreaChart2 = StackedAreaChart(".chart");

// StackedAreaChart2.update(data);