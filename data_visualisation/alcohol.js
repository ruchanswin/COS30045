dataset = {
    "children": [{
            "country": "Australia", "alcohol": 9.5
        },
        {
            "country": "Czechia", "alcohol": 11.6
        },
        {
            "country": "Denmark", "alcohol": 9.7
        },
        {
            "country": "France", "alcohol": 11.7
        },
        {
            "country": "Germany", "alcohol": 10.9
        },
        {
            "country": "Isarel", "alcohol": 2.9
        },
        {
            "country": "Japan", "alcohol": 7.2
        },
        {
            "country": "Korea", "alcohol": 8.7
        },
        {
            "country": "Switzerland", "alcohol": 8.6
        },
        {
            "country": "USA", "alcohol": 8.9
        },
        {
            "country": "UK", "alcohol": 9.7
        },
        {
            "country": "Finland", "alcohol": 8.4
        },
        {
            "country": "Hungary", "alcohol": 10.7
        },
        {
            "country": "Norway", "alcohol": 6
        }
    ]
};

var diameter = 900;
var color = d3.scaleOrdinal(d3.schemeCategory20b);

//edited the responsive bar code to apply to bubble chart
default_height = 500;
default_ratio = diameter / default_height;

// Determine current size, which determines vars
function set_size() {
    current_width = window.innerWidth;
    current_height = window.innerHeight;
    current_ratio = current_width / current_height;
    // Check if height is limiting factor
    if (current_ratio > default_ratio) {
        diameter = 900;
        // Else width is limiting
    } else {
        diameter = 400;
    }
};
set_size();

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(.5);

var svg = d3.select("#bubble2")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function (d) {
        return d.alcohol;
    });


var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function (d) {
        return !d.children
    })
    .append("g")
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('100')
            .attr('opacity', '.8');
    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('100')
            .attr('opacity', '1');
    })
    .attr("class", "node")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("title")
    .text(function (d) {
        return d.country;
    });

node.append("circle")
    .attr("r", function (d) {
        return d.r;
    })
    .style("fill", function (d, i) {
        return color(i);
    });

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function (d) {
        return d.data.country;
    })
    .attr("font-size", function (d) {
        return d.r / 5;
    })
    .attr("fill", "white");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function (d) {
        return d.data.alcohol.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    })
    .attr("font-size", function (d) {
        return d.r / 5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameter + "px");
