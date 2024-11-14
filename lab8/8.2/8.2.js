function init() {
    var w = 500;
    var h = 300;
  
    var projection = d3.geoMercator()
        .center([145, -36.5])
        .translate([w / 2, h / 2])
        .scale(2450);
  
    var color = d3.scaleQuantize().range(['#f2f0f8', '#ccc9e4', '#9f99cc', '#7869b6', "#cccccc", '#5b1f95' ]);
  
    var path = d3.geoPath().projection(projection);
  
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
  
    d3.csv("VIC_LGA_unemployment.csv", function (d) {
        return {
            LGA: d.LGA,
            unemployed: +d.unemployed
        };
    }).then(function(data) {
        d3.json("LGA_VIC.json").then(function(json) {
            for (var i = 0; i < data.length; i++) {
                var dataState = data[i].LGA; 
                var dataValue = parseFloat(data[i].unemployed); 
                for(var j = 0; j < json.features.length; j++){
                  var jsonState = json.features[j].properties.LGA_name; 
                  if(dataState == jsonState){
                      json.features[j].properties.unemployed = dataValue; 
                      break; 
                  }
                }
            }
            
    color.domain([d3.min(json.features, function(d) { return d.properties.unemployed; }), 
      d3.max(json.features, function(d) { return d.properties.unemployed; })]);
  
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("fill", "#cccccc")
      .style("fill", function(d) { return color(d.properties.unemployed); })
      .attr("d", path);

    d3.csv("VIC_city.csv", function (d) {
        return {
            place: d.place, 
            lat: +d.lat, 
            lon: +d.lon
        };
    }).then(function(data) {
      svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d){
        return projection([d.lon, d.lat])[0]; 
      })
      .attr("cy", function(d){
        return projection([d.lon, d.lat])[1];
      })
      .attr("r", 2)
      .style("fill", "red");

      svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function(d){
          return projection([d.lon, d.lat])[0];
      })
      .attr("y", function(d){
          return projection([d.lon, d.lat])[1];
      })
      .style("fill", "black")
      .text(function(d){ 
        return d.place;
              });
            });
        });
    });
  }
  
  window.onload = init;
  