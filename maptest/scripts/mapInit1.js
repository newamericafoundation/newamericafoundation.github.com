/*
This contains the basic functions for initializing a Wax map. 
Data sources are tilestream urls.

url = the url of the tileset to be rendered
mapContainer = the div that will hold the map
startLat = latitude of the starting center point for the map
startLng = longtitude of the starting cetner point for the map
minZoom = minimum zoom level for the map
maxZoom = maximum zoom level for the map
graph = flot graph object
graphData = main data array from flot
graphLabels = labels for the flot data array

Last Updated 01/19/12 by Andy Hull
*/

function newWaxMapGraph(url, mapContainer, startLat, startLng, minZoom, maxZoom, graph, graphData, graphLabels){
	if(!graph){
		graph ='';
	};
	if(!graphData){
		graphData ='';
	};
	if(!graphLabels){
		graphLabels ='';
	};

	minZoom = minZoom || 2;
	maxZoom = maxZoom || 10;
	startLat = startLat || 0;
	startLng = startLng || 0;
	var m;	
	wax.tilejson(url, function(tilejson) {
		tilejson.minzoom = minZoom;
		tilejson.maxzoom = maxZoom;
		var mm = com.modestmaps;
		m = new mm.Map(mapContainer,
			new wax.mm.connector(tilejson));
	
	wax.mm.interaction(m, tilejson, {
	  callbacks:
				{	// Show a tooltip.
					over: function(feature, context) {
						if(feature){
						var jFeature = $(feature)[0]
						for(country in graphLabels){
							if($(jFeature).text() == graphLabels[country][1]){
								graph.highlight(0, graphLabels[country][0]);
								$("#tooltip").remove();
								graph.toolTips("<h2>"+graphLabels[country][1]+"</h2><p>There are " + graphData[country][1] + " mobile phone subscribers per 100 residents.</p>");
								break;
								}
							}
						}
					},
					out: function(context) {
						graph.unhighlight();
						$("#tooltip").remove();
						$("#graphTooltip").append("<div id='tooltip'><h2>Mobile Phone Penetration</h2><p>Rollover the countries above or the bars beneath the map to reveal the number of mobile phone subscribers per 100 residents.</p></div>");
					}
				}
			});
			
    wax.mm.interaction(m, tilejson);
	wax.mm.legend(m, tilejson).appendTo(m.parent);
	wax.mm.zoomer(m, tilejson).appendTo(m.parent);	
	m.setCenterZoom(new mm.Location(startLat, startLng), minZoom);
	});
}; //end newWaxMapGraph