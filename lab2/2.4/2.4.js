function init(){
    var w = 600;
    var h = 120;
    var barPadding = 1;

    d3.csv("data.csv").then(function(data) {
        console.log(data);
        wombatSightings = data;
        barChart(wombatSightings);
    });

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    function barChart() {
        svg.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            return i * (w/wombatSightings.length); //change the amounts of data relative to the dataset
        })
        .attr("y", function(d){
            return h - (d.wombats*4); // invert y-axis to flip bars
        })
        .attr("width", (w/wombatSightings.length)-barPadding) //change the space relative to the dataset
        .attr("height", function(d){
            return d.wombats*4;
        })
        .attr("fill", function(d){
            if (d.wombats > 10) {
                return "green";
            } else {
                return "red";
            }
        })// add color to bars

                // Add text indicating the number of wombat sightings
                svg.selectAll("text")
                .data(wombatSightings)
                .enter()
                .append("text")
                .text(function(d) { return d.wombats; })
                .attr("x", function(d, i) {
                    return i * (w / wombatSightings.length) + ((w / wombatSightings.length) - barPadding) / 2; // center text horizontally
                })
                .attr("y", function(d) {
                    return h - (d.wombats * 4) + 20; // position text slightly above the bar
                })
                .attr("text-anchor", "middle") // center text horizontally
                .attr("fill", "white"); // set text color to white
    };
    }
window.onload = init;