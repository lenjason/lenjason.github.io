/* Read in the UKcensus1851.csv */
Plotly.d3.csv("UKcensus1851.csv", function(err, rows){
    function unpack(rows, key) {
    return rows.map(function(row){return row[key];});
    }
  
    /* Column Headers */
    var header = Plotly.d3.keys(rows[0]);
    header.push("Total Population");

 
    var headerNames = [header[0],header[1],header[2],header[3]];
  
    /* Unpacking data into Array */
    var cellNumbers = [];
    for (i = 0; i < headerNames.length; i++) {
      cellNumber = unpack(rows, headerNames[i]);
      cellNumbers[i] = cellNumber;
    }

    /* Casting Strings to Integers and Populating Table */
    for(let i=0; i<cellNumbers[1].length; i++){
        cellNumbers[1][i] = Number(cellNumbers[1][i]);
    };
  
    for(let i=0; i<cellNumbers[2].length; i++){
        cellNumbers[2][i] = Number(cellNumbers[2][i]);
    };
  
    for(let i=0; i<cellNumbers[3].length; i++){
        cellNumbers[3][i] = Number(cellNumbers[1][i]) + Number(cellNumbers[2][i]);
    };


        
  /* Creating the table */
    var table = {
      type: 'table',
      columnwidth: [100,100,100,100],
      columnorder: [0,1,2,3],
      header: {
        values: headerNames,
        align: "center",
        line: {width: 1, color: 'rgb(227,26,28)'},
        fill: {color: ['rgb(51,51,255)']},
        font: {family: "Arial", size: 20, color: "white"}
      },
      cells: {
        values: cellNumbers,
        align: ["right"],
        line: {color: "black", width: 1},
        height: 30,
        fill: {color: ['rgb(85,221,221)', 'rgba(51,255,255, 0.65)']},
        font: {family: "Arial", size: 16, color: ["black"]}
      },
    }
 
    
    /* Creating traces to plot */
    var maleTrace = {
        type: "bar",
        name: "Male Population",
        x: cellNumbers[0],
        y: cellNumbers[1],
        marker: {color: "LimeGreen"}
    };

    var femaleTrace = {
        type: "bar",
        name: "Female Population",
        x: cellNumbers[0],
        y: cellNumbers[2],
        marker: {color: "Canary"}
    };

    /* Organizing traces into groups */
    var data = [table]
    var data1 = [maleTrace,femaleTrace]

    /* Defining layouts */ 
    var layout = {
      title: "UK Population Data from 1851",
      height: 500,
      showlegend: true,
    }

    var layoutGraph = {
        title: 'Male and Female Deaths by Age Group',
        height: 400,
        plot_bgcolor: 'rgba(100,100,100,0.65)', 
        xaxis: {
            title: 'Age Range (years)',
        },
        yaxis: {
            title: 'Numbers Reported',
        },
        legend: {
            x: 0.8,
            y: 0.95
        },
    }
    
    var ultimateColors = [
        ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
        ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)'],
        ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)'],
        ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)', 'rgb(175, 51, 21)', 'rgb(35, 36, 21)']
    ];

    var pieColor = [
        ['DarkGreen','Green','SeaGreen','MediumSeaGreen','SpringGreen','LightGreen',
            'PaleGreen','Khaki','LightYellow'],
        ['Maroon','Brown','Sienna','OrangeRed','Chocolate','DarkOrange','Orange',
            'SandyBrown','NavajoWhite'],
        ['rgb(94,53,177)','rgb(103,58,183)','rgb(116,72,189)','rgb(126,87,194)','rgb(149,117,205)',
        'rgb(179,157,219)','rgb(193,176,226','rgb(209,196,233)','rgb(237,231,246)']
    ];

    var pieChart1 = [
        {
        values: cellNumbers[1],
        labels: cellNumbers[0],
        type: 'pie',
        name: 'Male Population',
        marker: {colors: pieColor[0]},
        hoverinfo: 'label+percent+name'
        },
    ]

    var pieChart2 = [
        {
        values: cellNumbers[2],
        labels: cellNumbers[0],
        type: 'pie',
        name: 'Female Population',
        marker: {colors: pieColor[1]},
        hoverinfo: 'label+percent+name'
        },
    ]

    var pieChart3 = [    
        {
        values: cellNumbers[3],
        labels: cellNumbers[0],
        type: 'pie',
        name: 'Total Population',
        marker: {colors: pieColor[2]},
        hoverinfo: 'label+percent+name'
        },
    ]

    var layout2 = {
        title: "UK Census Data 1851 Total Population (by Years)",
        titlefont: {size: 36},
        width: 1000,
        height: 1000,
        showlegend: true,
    };
    var layout3 = {
        title: "UK Census Data 1851 Male Population (by Years)",
        titlefont: {size: 36},
        width: 1000,
        height: 1000,
        showlegend: true,
    };
    var layout4 = {
        title: "UK Census Data 1851 Female Population (by Years)",
        titlefont: {size: 36},
        width: 1000,
        height: 1000,
        showlegend: true,
    };


    Plotly.plot('table4', data, layout);

});

/*Plotly.d3.text("choleraDeathLocations.csv", function(text) {
    var data = d3.csvParseRows(text).map(function(row) {
        return row.map(function(value) {
            return +value;
        });
    });
    var deaths = [],
    longitude = [],
    latitude = [];

    for(let i=0;i<data.length;i++)
    {
        deaths[i]=data[i][0];
    }
    for(let i=0;i<data.length;i++)
    {
        longitude[i]=data[i][1];
    }
    for(let i=0;i<data.length;i++)
    {
        latitude[i]=data[i][2];
    }
    var cellValues = [deaths,longitude,latitude];
  
    Plotly.d3.text("choleraPumpLocations.csv", function(t) {
        var pumps = d3.csvParseRows(t).map(function(r) {
            return r.map(function(v) {
                return +v;
            });
        });
        var pumpLongitude = [],
        pumpLatitude = [];

        for(let i=0;i<pumps.length;i++){pumpLongitude[i]=pumps[i][0];}
        for(let i=0;i<pumps.length;i++){pumpLatitude[i]=pumps[i][1];}
        var pumpCellValues = [pumpLongitude,pumpLatitude];
  
    });

    /* Creating the table */
    var table4 = {
    type: 'table',
    columnwidth: [100,100,100,100,100],
    columnorder: [0,1,2,3,4],
    header: {
        values: headerNames,
        align: "center",
        line: {width: 1, color: 'rgb(227,26,28)'},
        fill: {color: ['rgb(51,51,255)']},
        font: {family: "Arial", size: 20, color: "white"}
    },
    cells: {
        values: [deaths,longitude,latitude,pumpLongitude,pumpLatitude],
        align: ["right"],
        line: {color: "black", width: 1},
        height: 30,
        fill: {color: ['rgb(85,221,221)', 'rgba(51,255,255, 0.65)']},
        font: {family: "Arial", size: 16, color: ["black"]}
    },
  }
});





 /* 
        var map = L.map('map').setView([51.513, -0.137], 18);
        mapLink ='<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
              attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
              maxZoom: 18,
              id: 'mapbox.streets',
              accessToken: 'pk.eyJ1Ijoib3lhbGNpbiIsImEiOiJjam0zc29mbDEwdW1nM3JtdTd6NDJmdXFnIn0.QlWi2opj-m-jZlSOPNl_QA'
        }).addTo(map);
        //
  
        for (var i = 0; i < cellValues[2].length; i++) {
              circles = new L.circle([cellValues[2][i],cellValues[1][i]],{color:'black',fillColor: '#f03',fillOpacity: 0.5,radius:cellValues[0][i]})
                  .addTo(map);
          }
      for (var i = 0; i < pumpCellValues[1].length; i++) {
        lat = pumpCellValues[1][i];
        lon = pumpCellValues[0][i];
        polygons = new L.polygon([[lat + 0.0001, lon+0.0001],[lat - 0.0001, lon],[lat + 0.0001, lon-0.0001]],{color:'black',fillColor: 'black',fillOpacity: 0.9})
          .addTo(map);}
  
          function getSize(d) {
      return d > 119 ? "84" :
             d > 69  ? "48" :
             d > 39  ? "30" :
             d > 14  ? "26" :
             d > 4   ? "18" :
             d > 1   ? "14" :
             d > 0   ? "9" : "6";}
        var legend = L.control({position: 'bottomright'});
  
  
          legend.onAdd = function (map) {
  
                var div = L.DomUtil.create('div', 'info legend');
                  var grades = [1, 2, 5, 15, 40, 70, 120];
                  var labels = ["<h3>Death Counts</h3>"];
            labels.push("<p style='text-align:center;'>You may hover over the figures to obtain more info</p>");
                for (var i = 0; i < grades.length; i++) {labels.push('<div class="tooltip"><div class="circle" style="width:' + getSize(grades[i])+ 'px; height:' + getSize(grades[i]) +'px">'+'<span class="tooltiptext">'+grades[i]+'</span></div></div>');}
            labels.push('<div class="tooltip"><span class="tooltiptext">Pump</span><img src="data/waterpump.png"></div>')
                div.innerHTML = labels.join('');
              return div;
          };
  
          legend.addTo(map);
  });
  });


/*
<script src="csvjson.json" type="text/javascript" async defer></script>
<script src="https://raw.githubusercontent.com/gviloria/london_cholera/master/csvjson.json" 
    type="text/javascript" async defer></script>
<script src="pumploc.json" type="text/javascript" async defer></script>	
<script src="https://raw.githubusercontent.com/gviloria/london_cholera/master/pumploc.json"
    type="text/javascript" async defer></script>	
<script>
var mymap = L.map('mapid').setView([51.514, -0.137], 17);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(mymap);
for (let m in new_data) {
	var meow = new_data[m];
	L.circle([meow.latitude, meow.longitude], {
	    color: 'red',
	    fillColor: '#f03',
	    fillOpacity: 0.5,
	    radius: meow.deaths * 5
	}).addTo(mymap);
}
	
for (let x in pump_data) {
	var meoww = pump_data[x];
	L.circle([meoww.latitude, meoww.longitude], {
	    color: 'blue',
	    fillColor: '#00b3ff',
	    fillOpacity: 0.5,
	    radius: 5
	}).addTo(mymap);
}
</script>


Plotly.d3.csv("choleraDeathLocations.csv", function(err, rows){
    function unpack(rows, key) {
    return rows.map(function(row){return row[key];});
    }
  
    /* Column Headers 
    var header = Plotly.d3.keys(['Deaths','Longitude','Latitude']);
 
    var headerNames = [header[0],header[1],header[2]];
  
    /* Unpacking data into Array 
    var cellNumbers = [];
    for (i = 1; i < headerNames.length; i++) {
      cellNumber = unpack(rows, headerNames[i]);
      cellNumbers[i] = cellNumber;
    }

    /* Casting Strings to Integers and Populating Table 
    for(let i=1; i<cellNumbers[0].length; i++){
        cellNumbers[0][i] = Number(cellNumbers[0][i]);
    };
  
    for(let i=1; i<cellNumbers[1].length; i++){
        cellNumbers[1][i] = Number(cellNumbers[1][i]);
    };
  
    for(let i=1; i<cellNumbers[2].length; i++){
        cellNumbers[2][i] = Number(cellNumbers[2][i]);
    };

/*
    var map1 = L.map('mapid').setView([51.514, -0.137], 17);
    type: 'scattergeo',
        locationmode: 'USA-states',
        lat: cityLat,
        lon: cityLon,
        hoverinfo: 'text',
        text: hoverText,
        marker: {
            size: citySize,
            line: {
                color: 'black',
                width: 2
            },
        }
    }];

    var layout = {
        title: '2014 US City Populations',
        showlegend: false,
        geo: {
            scope: 'usa',
            projection: {
                type: 'albers usa'
            },
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            subunitwidth: 1,
            countrywidth: 1,
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)'
        },
    };





    /*
Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_us_cities.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var cityName = unpack(rows, 'name'),
        cityPop = unpack(rows, 'pop'),
        cityLat = unpack(rows, 'lat'),
        cityLon = unpack(rows, 'lon'),
        color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
        citySize = [],
        hoverText = [],
        scale = 50000;

    for ( var i = 0 ; i < cityPop.length; i++) {
        var currentSize = cityPop[i] / scale;
        var currentText = cityName[i] + " pop: " + cityPop[i];
        citySize.push(currentSize);
        hoverText.push(currentText);
    }

    var data = [{
        type: 'scattergeo',
        locationmode: 'USA-states',
        lat: cityLat,
        lon: cityLon,
        hoverinfo: 'text',
        text: hoverText,
        marker: {
            size: citySize,
            line: {
                color: 'black',
                width: 2
            },
        }
    }];

    var layout = {
        title: '2014 US City Populations',
        showlegend: false,
        geo: {
            scope: 'usa',
            projection: {
                type: 'albers usa'
            },
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            subunitwidth: 1,
            countrywidth: 1,
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)'
        },
    };

    Plotly.plot(map1, data, layout, {showLink: false});

});
*/
