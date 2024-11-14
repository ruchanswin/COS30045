function init(){

    var w = 500;
    var h = 100;
    var MaxValue = 25;
    var dataset = [14, 5, 26, 23, 9, 20, 25, 29, 15];

    //ordinal data
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0,w])
                    .paddingInner(0.05);
    //quantitive data
    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset)])
                    .range([h, 0]); 

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            return xScale(i); //change the amounts of data relative to the dataset
        })
        .attr("y", function(d){
            return yScale(d);
        })
        .attr("width", xScale.bandwidth()) //change the space relative to the dataset
        .attr("height", function(d){
            return h - yScale(d);
        })
        .attr("fill", "blue") // add color to bars 
    

        .on("mouseover", function (event, d) { //create the tooltip text when mouseover
            var xPosition = parseFloat(d3.select(this).attr("x")) +xScale.bandwidth() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) +15
      
            svg.append("text")
            .attr("id","tooltip")
            .attr("x", xPosition)
            .attr("y", yPosition)
            .text(d)
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "bold");
              
            d3.select(this).attr("fill", "lightblue");
        })

        //Create the tooltip text element and set attributes
        

        .on("mouseout", function(){
            d3.select("#tooltip").remove()
            d3.select(this)
            .attr("fill", "blue");
        });

        

    //Add Button
    d3.select("#Add")
        .on("click", function(){
            Add()
        });

    //Remove Button
    d3.select("#Remove")
        .on("click", function(){
            
            Remove()
        });


        //Update Button Functions
    function Add() {
        var NewNumber = Math.floor(Math.random()* MaxValue);
        dataset.push(NewNumber);

        xScale.domain(d3.range(dataset.length));

        var bars = svg.selectAll("rect")
                        .data(dataset)
                        bars.enter()
                        .append("rect")
                        .attr("x", w)
                        .attr("y", function(d) {
                            return h - yScale(d);
                        })
                        .merge(bars)
                        .transition()
                        .duration(500)
                        .attr("x", function(d, i){
                                return xScale(i); //change the amounts of data relative to the dataset
                        })
                        .attr("y", function(d){
                                return yScale(d);
                        })
                        .attr("width", xScale.bandwidth()) //change the space relative to the dataset
                        .attr("height", function(d){
                                return h - yScale(d);
                        })
                        .attr("fill", "blue") // add color to bars 
                        
                        svg.selectAll("rect")
                        .data(dataset)
                        .on("mouseover", function (event, d) {
                            bars.attr("title", "This value is: " + d);

                            var xPosition = parseFloat(d3.select(this).attr("x")) +xScale.bandwidth() / 2;
                            var yPosition = parseFloat(d3.select(this).attr("y")) +15;
                      
                            svg.append("text")
                            .attr("id","tooltip")
                            .attr("x", xPosition)
                            .attr("y", yPosition)
                            .text(d)
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "12px")
                            .attr("fill", "black")
                            .attr("text-anchor", "middle")
                            .style("font-weight", "bold");
                              
                            d3.select(this).attr("fill", "lightblue");
                        })
                        
                
                        .on("mouseout", function(){
                            d3.select("#tooltip").remove()
                            d3.select(this)
                            .attr("fill", "blue");
                        });
    }

    //Remove Button Functions
    function Remove() {
//dataset.shift(); //removes first element of the array
dataset.pop(); //removes last element of the array

var bars = svg.selectAll("rect").data(dataset);
var labels = svg.selectAll("text").data(dataset);
xScale.domain(d3.range(dataset.length));

bars.exit()
    .transition()
    .duration(500)
    .attr("x", w)
    .remove("x", w)

bars.transition()
    .delay(500)
    .attr("x", function(d, i) {
    return xScale(i);
    }) 
    .attr("y", function(d) {
    return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return yScale(d);
    })
    .attr("fill", function(d) {
        return "blue";
    });      

labels.exit()
      .transition()
      .duration(500)
      .attr("x", w)
      .remove()

labels.transition()
      .delay(500)
      .text(function(d) {
          return d;
      })
      .attr("x", function(d, i) {
          return xScale(i) + xScale.bandwidth()/2;
      })
      .attr("y", function(d) {
          return h - yScale(d) + 14;
      })
      .attr("text-anchor", "middle")
      .attr("fill", "white");

      svg.selectAll("rect")
      .data(dataset)
      .on("mouseover", function (event, d) {
          bars.attr("title", "This value is: " + d);
          //get x and y positions of the bars
          var xPosition = parseFloat(d3.select(this).attr("x")) +xScale.bandwidth() / 2;
          var yPosition = parseFloat(d3.select(this).attr("y")) +15
    
          svg.append("text")
          .attr("id","tooltip")
          .attr("x", xPosition)
          .attr("y", yPosition)
          .text(d)
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .style("font-weight", "bold");
            
          d3.select(this).attr("fill", "lightblue");
      })
      
      //mouseout effect for cursor
      .on("mouseout", function(){
          d3.select("#tooltip").remove()
          d3.select(this)
          .attr("fill", "blue");
      });
    }
}

window.onload = init;