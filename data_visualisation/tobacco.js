dataset = {
    "children": [{
            "country": "Australia", "tobacco": 647
        },
        {
            "country": "Czechia", "tobacco": 2367
        },
        {
            "country": "Denmark", "tobacco": 1113
        },
        {
            "country": "France", "tobacco": 905
        },
        {
            "country": "Germany", "tobacco": 1507
        },
        {
            "country": "Isarel", "tobacco": 769
        },
        {
            "country": "Japan", "tobacco": 1171
        },
        {
            "country": "Korea", "tobacco": 1606
        },
        {
            "country": "Switzerland", "tobacco": 1271
        },
        {
            "country": "USA", "tobacco": 1061
        },
        {
            "country": "UK", "tobacco": 446
        },
        {
            "country": "Finland", "tobacco": 734
        },
        {
            "country": "Hungary", "tobacco": 1521
        },
        {
            "country": "Norway", "tobacco": 793
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

var svg = d3.select("#bubble")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function (d) {
        return d.tobacco;
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
        return d.data.tobacco.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    })
    .attr("font-size", function (d) {
        return d.r / 5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameter + "px");
