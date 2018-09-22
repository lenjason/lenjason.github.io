/* 
For an A you must:
1. Read in choleraDeathLocations.csv and choleraPumpLocations.csv
2
2. Show a map of the locations of the deaths and pumps on a Leaflet/Plot.ly map of the current 
London neighborhood using an appropriately centered and zoomed map. It should be obvious 
which locations have more fatalities than other locations.
3. Come up with a layout of charts that makes good use of the CyberCANOE. The CyberCANOE has 
a resolution of 6830x2160. [Users of Chart maker do not have to do this part of the exercise.]
*/

/* Read in the choleraDeathLocations.csv */
Plotly.d3.csv("choleraDeathLocations.csv", function(err, rows){
    function unpack(rows, key) {
    return rows.map(function(row){return row[key];});
    }
  
    /* Column Headers */
    var header = Plotly.d3.keys(rows[0]);
 
    var headerNames = [header[0],header[1],header[2]];
  
    /* Unpacking data into Array */
    var cellNumbers = [];
    var cellNumbers2 = [];  // bad programming, but needed access outside the next function...
    for (i = 0; i < headerNames.length; i++) {
      cellNumber = unpack(rows, headerNames[i]);
      cellNumbers[i] = cellNumber;
    }

    /* Casting Strings to Integers and Populating Table */
    for(let i=0; i<cellNumbers[0].length; i++){
        cellNumbers[0][i] = Number(cellNumbers[0][i]);
    };

    for(let i=0; i<cellNumbers[1].length; i++){
        cellNumbers[1][i] = Number(cellNumbers[1][i]);
    };
  
    for(let i=0; i<cellNumbers[2].length; i++){
        cellNumbers[2][i] = Number(cellNumbers[2][i]);
    };
    
    /* Creating the table */
    var table = {
      type: 'table',
      columnwidth: [100,100,100],
      columnorder: [0,1,2],
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

    /* Organizing traces into groups */
    var data = [table]

    /* Defining layouts */ 
    var layout = {
      title: "Cholera Death in London 1854 by Longitude and Latitude",
      height: 500,
      showlegend: true,
    }

    Plotly.plot('table4', data, layout);


    /* Getting the Pump Data into this horid thingy!  */
    Plotly.d3.csv("choleraPumpLocations.csv", function(err, rows){
        function unpack(rows, key) {
        return rows.map(function(row){return row[key];});
        }
      
        /* Column Headers */
        var header = Plotly.d3.keys(rows[0]);
     
        var headerNames = [header[0],header[1]];
      
        /* Unpacking data into Array */
        for (i = 0; i < headerNames.length; i++) {
          cellNumber = unpack(rows, headerNames[i]);
          cellNumbers2[i] = cellNumber;
        }
    
        /* Casting Strings to Integers and Populating Table */
        for(let i=0; i<cellNumbers2[0].length; i++){
            cellNumbers2[0][i] = Number(cellNumbers2[0][i]);
        };
    
        for(let i=0; i<cellNumbers2[1].length; i++){
            cellNumbers2[1][i] = Number(cellNumbers2[1][i]);
        };
        
        /* Creating the table */
        var table = {
          type: 'table',
          columnwidth: [100,100],
          columnorder: [0,1],
          header: {
            values: headerNames,
            align: "center",
            line: {width: 1, color: 'rgb(227,26,28)'},
            fill: {color: ['rgb(51,51,255)']},
            font: {family: "Arial", size: 20, color: "white"}
          },
          cells: {
            values: cellNumbers2,
            align: ["right"],
            line: {color: "black", width: 1},
            height: 30,
            fill: {color: ['rgb(85,221,221)', 'rgba(51,255,255, 0.65)']},
            font: {family: "Arial", size: 16, color: ["black"]}
          },
        }
    
        /* Organizing traces into groups */
        var data = [table]
    
        /* Defining layouts */ 
        var layout = {
          title: "1854 London Water Pump Coordinates",
          height: 500,
          showlegend: true,
        }
    
        Plotly.plot('table5', data, layout);




        /* The HORRIBLE MAP that nearly killed me!!! */
        var map = L.map('mapid').setView([51.5135, -0.137], 17);
    
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibGVuaiIsImEiOiJjam1jMWh0a3MwN2VhM3BvMXpzYmI0YWFrIn0.DzLb6jRcNv60kOZ3Ae5gjA'
        }).addTo(map);

        // Adding markers for death locations
        for (var i = 0; i < cellNumbers[2].length; i++) {
            var circle = L.circle([cellNumbers[2][i], cellNumbers[1][i]], {
                color: 'black',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: cellNumbers[0][i]  // represents the number of deaths
            }).addTo(map);
            circle.bindPopup('Deaths: ' + cellNumbers[0][i] + 
                '<br>Latitude : ' + cellNumbers[2][i] + 
                '<br>Longitude:' + cellNumbers[1][i]); 
        }

        // Adding markers for pump locations
        for (var i = 0; i < cellNumbers2[1].length; i++) {
            var marker = L.marker([cellNumbers2[1][i], cellNumbers2[0][i]]).addTo(map);
            marker.bindPopup('<br>Latitude : ' + cellNumbers2[1][i] + 
                '<br>Longitude:' + cellNumbers2[0][i]);
        }




    })
});