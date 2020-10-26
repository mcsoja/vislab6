import AreaChart from './AreaChart.js';
import StackedAreaChart from './StackedAreaChart.js';

d3.csv("unemployment.csv", d3.autoType).then(data => {
    data.map(function(d){
        d.total = d.Agriculture + d.Business_services + d.Construction + d.Education_and_Health + d.Finance + d.Government + d.Information + d.Leisure_and_hospitality + d.Manufacturing + d.Mining_and_Extraction + d.Other + d.Selfemployed + d.Transportation_and_Utilities + d.Wholesale_and_Retail_Trade;
            return d;
        })

        

    // process data and create charts
    const stackedAreaChart = StackedAreaChart(".chart2");

    stackedAreaChart.update(data);

    const areaChart = AreaChart(".chart");

    areaChart.update(data);

    areaChart.on("brushed", (range)=>{
        stackedAreaChart.filterByDate(range); // coordinating with stackedAreaChart
    })
})