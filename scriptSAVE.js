d3.csv('unemployment.csv', d3.autoType).then(data => {
    console.log(data)

    data.map(function(d){
        d.total = d.Agriculture + d.Business_services + d.Construction + d.Education_and_Health + d.Finance + d.Government + d.Information + d.Leisure_and_hospitality + d.Manufacturing + d.Mining_and_Extraction + d.Other + d.Selfemployed + d.Transportation_and_Utilities + d.Wholesale_and_Retail_Trade;
        return d;
    })


    function AreaChart(container){// selector for a chart container e.g., ".chart"

            // initialization
            let margin = { top: 40, right: 20, bottom: 40, left: 90 },
            width =
            document.querySelector(".chart").clientWidth -
            margin.left -
            margin.right,
            height = 400 - margin.top - margin.bottom; 
        
        width = width > 600 ? 600 : width;
        
        let data1 = data.map(({date, total}) => ({date, value: total}), {y: "$ Close"})

        let svg = d3
            .select(".chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        // create scales without domains
        let x = d3
            .scaleBand()
            .range([0, width])
            .paddingInner(0.1);
        
        let y = d3.scaleLinear().range([height, 0]);
            
        let xAxis = d3
            .axisBottom()
            .scale(x)
            .tickFormat(function(d) {
            return returnString(d, 50);
            });
        function returnString(content) {
            return content;}
        
        let yAxis = d3.axisLeft().scale(y);
        
        // create axes and axis title containers
        let xAxisGroup = svg.append("g").attr("class", "x-axis axis");
        
        let yAxisGroup = svg.append("g").attr("class", "y-axis axis");

        // update scales, encodings, axes (use the total count)
        x.domain(
            data1.map(function(d) {
            return d.date;
            })
        );
        y.domain([
            0,
            d3.max(data, d=>d.total)
        ]);

        curve = d3.curveLinear;

        area = d3.area()
        .curve(curve)
        .x(data1, d => x(d.date))
        .y1(data1, d => y(d.value))
        .y0(y(0));

        svg.select('.chart')
        .append('path')
        .attr('class', '.path')
        console.log(data1)

        svg.select('.path')
        .datum(data1)
        .attr("fill", "steelblue")
        .attr("stroke", "steelblue")
        .attr("d", area)

        xAxisGroup = svg
        .select(".x-axis")
        .transition()
        .duration(1000)
        .delay(500)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

        yAxisGroup = svg
        .select(".y-axis")
        .transition()
        .duration(1000)
        .delay(1000)
        .call(yAxis);

        }

	function update(data){ 


        let data1 = data.map(({date, total}) => ({date, value: total}), {y: "$ Close"})
                // update scales, encodings, axes (use the total count)
                x.domain(
                    data1.map(function(d) {
                    return d.date;
                    })
                );
                y.domain([
                    0,
                    d3.max(data, d=>d.total)
                ]);

                curve = d3.curveLinear

                area = d3.area()
                .curve(curve)
                .x(data1, d => x(d.date))
                .y1(data1, d => y(d.value))
                .y0(y(0));

                svg.select('.chart')
                .append('path')
                .attr('class', '.path')
                console.log(data1)

                svg.select('.path')
                .datum(data1)
                .attr("fill", "steelblue")
                .attr("stroke", "steelblue")
                .attr("d", area)

                xAxisGroup = svg
                .select(".x-axis")
                .transition()
                .duration(1000)
                .delay(500)
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

                yAxisGroup = svg
                .select(".y-axis")
                .transition()
                .duration(1000)
                .delay(1000)
                .call(yAxis);

            return {
                update // ES6 shorthand for "update": update
    };  
    }

    const areaChart1 = AreaChart(".chart");

    areaChart1.update(data);  

    const areaChart2 = AreaChart(".chart");

    areaChart2.update(data);  

    function StackedAreaChart(container) {
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
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                
                // create scales without domains
                let x = d3
                    .scaleBand()
                    .range([0, width])
                    .paddingInner(0.1);

                let keys = data.columns.slice(1)
                console.log(keys)

                let data1 = data.map(({date, total}) => ({date, value: total}), {y: "$ Close"})
                        console.log(data1)

                var stack = d3.stack()
                        .keys(keys)
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetNone);
                    
                    var series = stack(data);

                let y = d3.scaleLinear()
                    .range([height, 0]);

                let ordinal = d3.scaleOrdinal()
                        .range([keys])

                let time = d3.scaleTime()
                        .range([d3.extent(data)])
                
                let linear = d3.scaleLinear()
                        .range([height, 0])

                ordinal.domain(keys)

                curve = d3.curveLinear

                area = d3.area()
                .curve(curve)
                .x(d => x(d.date))
                .y1(d => y(d.value))
                .y0(y(0));

                const areas = svg.selectAll(".area")
                    .data(data, d => d.key);

                areas.enter() 
                    .append("path")
                    .merge(areas)
                    .attr("d", area)

                areas.exit().remove();
                
                let xAxis = d3
                    .axisBottom()
                    .scale(x)
                    .tickFormat(function(d) {
                    return returnString(d, 50);
                    });
                function returnString(content) {
                    return content;}
                
                let yAxis = d3.axisLeft().scale(y);
                
                // create axes and axis title containers
                let xAxisGroup = svg.append("g").attr("class", "x-axis axis");
                
                let yAxisGroup = svg.append("g").attr("class", "y-axis axis");

    
        function update(data){
    
            }
            return {
                update
            }
    }

    const StackedareaChart1 = StackedAreaChart(".chart");

    StackedareaChart1.update(data);  

});