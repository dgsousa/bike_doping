import * as d3 from 'd3';


(function() {

	var width = 1000;
	var	height = 800;
	var	padding = 100;



	var canvas = d3.select(".scatter_plot")
				   .append("svg")
				   .attr("width", width + padding * 2)
				   .attr("height", height + padding * 2)
				   .append("g")
				   .attr("transform", "translate(" + padding + "," + padding + ")")

	var header = d3.select("svg")
				   .append("text")
				   .text("Doping in Professional Bicycle Racing")
				   .attr("font-size", "36px")
				   .attr("stroke", "black")
				   .attr("dx", 320)
				   .attr("dy", 60)
	
	var parseTime = d3.timeParse("%M:%S");

	var formatTime = d3.timeFormat("%M:%S");

	var xScale = d3.scaleLinear()
				   .range([0, width]);

	var yScale = d3.scaleLinear()
				   .range([height, 0]);	

	
	var xAxis = d3.axisBottom(xScale)
				  .ticks(4)
				  .tickFormat(function(num) {
				  	var minutes = Math.floor(num/60)
				  	var seconds = num % 60;
				  	return minutes + ":" + seconds;
				  })

	var yAxis = d3.axisLeft(yScale)
				  .ticks(7)	   

	d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(err, data) {
		if(err) console.log(err)
		else {

			var maxTime = d3.max(data, function(d) {
				return d.Seconds;
			})

			var minTime = d3.min(data, function(d) {
				return d.Seconds;
			})


			xScale.domain([40 + maxTime - minTime, 0])

			yScale.domain([d3.max(data, function(d) {
					return d.Place;
				}) + 1, d3.min(data, function(d) {
					return d.Place;
				})
			])


		var dots =      canvas.selectAll("g")
							  .data(data)
							  .enter()
							  .append("g")
							  .attr("transform", function(d) {
								  x = xScale(d.Seconds - minTime);
								  y = yScale(d.Place)
								  return "translate(" + x + "," + y + ")";
							  })
							  .style("fill", function(d) {
							  	return d.Doping ? "red" : "grey";
							  })
							  .on("mouseover", function(d) {
				  				return tooltip.style("opacity", .8)
				  				  	  		  .style("transition", "opacity .3s ease-in")
				  				  	  		  .html("<h3>" + d.Name + ": " + d.Nationality + "</h3><br>"
				  				  	  		  		+ "<h3>Year: " + d.Year + ", " + "Time: " + d.Time +  "</h3><br><h3>"
				  				  	  		  		+ d.Doping + "</h3>")
				  			  })
				  			  .on("mouseout", function() {
				  				return tooltip.style("opacity", 0)
				  				  	  		  .style("transition", "opacity .3s ease-in")
				  			  })
				  			  .on("mousemove", function() {
				  				return tooltip.style("visibility", "visible")
				  			  })
							 
								

						  dots.append("circle")
							  .attr("r", 10)

						  dots.append("text")
						      .text(function(d) {
						      	return d.Name;
						      })
						      .attr("text-anchor", "end")
						      .attr("font-size", "1em")
						      .attr("fill", "black")
						      .attr("dx", -20)


		var key =  canvas.append("g")
						  .attr("transform", "translate(800, 500)")


					   key.append("circle")
						  .attr("r", 10)
						  .attr("fill", "grey")
						  

					   key.append("text")
						  .text("No doping allegations")
						  .attr("font-size", "18px")
						  .attr("fill", "black")
						  .attr("dx", 20)
						  .attr("dy", 5)
						  
					  
					   key.append("circle")
						  .attr("r", 10)
						  .attr("fill", "red")
						  .attr("cy", 50)
						  

					   key.append("text")
						  .text("Riders with doping allegations")
						  .attr("font-size", "18px")
						  .attr("fill", "black")
						  .attr("dx", 20)
						  .attr("dy", 55)

			canvas.selectAll("circle")
				   .on("mouseover", function() {
				  		d3.select(this).attr("stroke", "black")
				  	})
				  	.on("mouseout", function() {
				  		d3.select(this).attr("stroke", null)
				  	})


			canvas.append("g")
				  .call(yAxis)
				  .append("text")
				  .text("Ranking")
				  .attr("text-anchor", "end")
				  .attr("font-size", "22px")
				  .attr("stroke", "black")
				  .attr("fill", "black")
				  .attr("transform", "rotate(-90)")
				  .attr("dy", -40)
				  .attr("dx", -300)
				  

			canvas.append("g")
				  .call(xAxis)
				  .attr("transform", "translate(0," + height + ")")
				  .append("text")
				  .text("Minutes behind fastest time")
				  .attr("font-size", "22px")
				  .attr("stroke", "black")
				  .attr("fill", "black")
				  .attr("dy", 50)
				  .attr("dx", 500)						
			

		var tooltip = d3.select(".tooltip")
						.append("div")
						.style("width", "250px")
						.style("height", "150px")
						.style("position", "absolute")
						.style("top", "250px")
						.style("left", "400px")
						.style("z-index", 10)
						.style("background", "black")
						.style("opacity", 0)


		}
	})




}())