///////////////////////////////////////////////
// D3 Waterfall Visualization
///////////////////////////////////////////////

///////////////////////////////////////
// Visualization Variables and Scales
///////////////////////////////////////

// Layout variables
var width = 1200;
var height = 500;
var sidePadding = 0;
var topPadding = 0;

// Create a selection for the svgContainer
var svgContainer = d3.selectAll('#waterfall-large').append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('preserveAspectRatio','xMidYMid')
    .attr("class", "svg-container");

// Format the dates and times
var dateFormat = d3.time.format('%Y-%m-%d');
var timeFormat = d3.time.format('%b %e, %Y');

// Return minimum and maximum dates
var min = d3.min(allProjects, function(d) {
    return dateFormat.parse(d.startDate);
});
var max = d3.max(allProjects, function(d) {
    return dateFormat.parse(d.dueDate);
});

// Pass the min and max dates, create our time scale
var timeScale = d3.time.scale().domain([min, max]).range([40, width - 40]);

// Create a color scale for our bars
var colorScale = d3.scale.linear()
    .domain([0, allProjects.length])
    .range(['#1199BF', '#12BF25'])
    .interpolate(d3.interpolateHcl);


///////////////////////////////////////
// Visualization Functions
///////////////////////////////////////

// Function to draw the timeline axis and gridlines
var drawAxis = function(sidePadding, topPadding, width, height) {

    var interval = d3.time.day;
    var tickWidth = 100; // Set maximum tick width
    var maxTicks = width / tickWidth;
    var skip = Math.ceil(interval.range(min, max).length / maxTicks); // Reference our dynamic min and max
    
    var xAxis = d3.svg.axis()
        .scale(timeScale)
        .orient('bottom')
        .tickValues(interval.range(min, max).filter(function(d, i) {
            return !(i % skip);
        }))
        .tickSize(-height + topPadding + 20, 0, 0)
        .tickFormat(timeFormat);
    
    var ticks = svgContainer.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(' + sidePadding + ', ' + (height - 50) + ')')
        .call(xAxis)
        .selectAll('text')  
        .style('text-anchor', 'middle')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('font-size', 10);
    
    return ticks;
    
} // End drawAxis()


// Function to draw the bars and labels
function drawBars(data, theGap, theTopPad, theSidePad, theBarHeight, theColorScale, w, h) {
    
    // Append our bars
    var barGroup = svgContainer.append('g')
        .selectAll('rect')
        .data(data)
        .enter();

   var bars = barGroup.append('rect')
        .classed('project-bar', true)
        .attr('data-project', function(d, i) {
            return i;
        })
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('x', function(d){
            return timeScale(dateFormat.parse(d.startDate)) + theSidePad;
        })
        .attr('y', function(d, i){
            return i * theGap + theTopPad;
        })
        .attr('width', function(d){
            return (timeScale(dateFormat.parse(d.dueDate)) - timeScale(dateFormat.parse(d.startDate)));
        })
        .attr('height', theBarHeight)
        .attr('stroke', 'none')
        .attr('fill', function(d, i){
            return d3.rgb(theColorScale(i));
        });
   

    var barText = barGroup.append('text')
        .text(function(d){
            return d.name;
        })
        .attr('x', function(d){
            return timeScale(dateFormat.parse(d.startDate)) + 15;
            //return (timeScale(dateFormat.parse(d.dueDate)) - timeScale(dateFormat.parse(d.startDate))) / 2 + timeScale(dateFormat.parse(d.startDate)) + theSidePad;
        })
        .attr('y', function(d, i){
            return i * theGap + 25 + theTopPad;
        })
        .attr('font-size', 14)
        //.attr("text-anchor", "left")
        .attr('text-height', theBarHeight)
        .attr('fill', '#fff');

    // Event Handlers on bars
    bars.on('mouseover', function() {
        var self = d3.select(this);
        var currentFill = self.attr('fill');
        
        self.attr('fill', function(){
            return d3.rgb(currentFill).darker(1);
        });
    }).on('mouseout', function() {
        var self = d3.select(this);
        var currentFill = self.attr('fill');
        
        self.attr('fill', function(){
            return d3.rgb(currentFill).brighter(1);
        });
    });

    // Event Handlers on text
    barText.on('mouseover', function(d, i) {
        var selfBar = d3.select(this.parentNode.childNodes[i]);
        var currentFill = selfBar.attr('fill');
        
        selfBar.attr('fill', function(){
            return d3.rgb(currentFill).darker(1);
        });
        
    }).on('mouseout', function(d, i) {
        var selfBar = d3.select(this.parentNode.childNodes[i]);
        var currentFill = selfBar.attr('fill');
        
        selfBar.attr('fill', function(){
            return d3.rgb(currentFill).brighter(1);
        });
    });
    
} // End drawBars()


// Function to build our Waterfall Nav
var buildWaterfallNav = function(data) {
    // Finally, draw our axis!
    drawAxis(0, 0, width, height);
    
    // Finally, draw our bars!
    // @params: data, theGap, theTopPad, theSidePad, theBarHeight, theColorScale, width, height
    drawBars(data, 50, 0, 0, 40, colorScale, width, height);
}
