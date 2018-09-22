/* 
    For a C you must:
    1. Read in the choleraDeaths.tsv data file.
    2. Create a Plot.ly table of attacks (an attack is when someone exhibits symptoms of cholera) and deaths by date, showing numbers per day and totals of both on each day.
    3. Create a line chart showing time on the x-axis vs number of attacks on this day, deaths on this day, total attacks up to this day, and total deaths up to this day, making a total of 4 lines on the chart.
    4. Allow the user to bring up information on the webpage about who wrote the project, what libraries are being used to visualize it, where the data came from, etc.
    5. The charts should be scaled to fit on a 1920x1080 screen.
*/

/* Read in the choleraDeaths.tsv */
Plotly.d3.tsv("choleraDeaths.tsv", function(err, rows){
    function unpack(rows, key) {
    return rows.map(function(row){return row[key];});
    }
  
    /* Column Headers */
    var header = Plotly.d3.keys(rows[0]);
    header.push("Cumulative Attacks");
    header.push("Cumulative Deaths");
    header.push("Total Attacks and Death Per Day");
    var headerNames = [header[0],header[1],header[2],header[3],
                        header[4],header[5]];
  
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
        cellNumbers[5][i] = Number(cellNumbers[1][i]) + Number(cellNumbers[2][i]);
    };
  
    var temp=0;
    for(let i=0; i<cellNumbers[1].length; i++){
        temp = Number(cellNumbers[1][i]) + temp;
        cellNumbers[3][i] = temp;
    };

    var temp=0;
    for(let i=0; i<cellNumbers[2].length; i++){
        temp= Number(cellNumbers[2][i]) + temp;
        cellNumbers[4][i]=temp;
    };

        
  /* Creating the table */
    var table = {
      type: 'table',
      columnwidth: [100,100,100,100,100,100],
      columnorder: [0,1,2,3,4,5],
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
        padding: 10,
        line: {color: "black", width: 1},
        height: 30,
        fill: {color: ['rgb(85,221,221)', 'rgba(51,255,255, 0.65)']},
        font: {family: "Arial", size: 16, color: ["black"]}
      },
    }
  
    /* Creating traces to plot */
    var attackTrace = {
        type: "scatter",
        mode: "lines",
        name: "Attacks by Date",
        x: cellNumbers[0],
        y: cellNumbers[1],
        line: {
            color: "Orange",
            dash: "dot",
        }
    };

    var cumAttackTrace = {
        type: "scatter",
        mode: "lines",
        name: "Cumulative Attacks to Date",
        x: cellNumbers[0],
        y: cellNumbers[3],
        line: {
            color: "Orange",
            dash: "line",
        }
    };
    var deathTrace = {
        type: "scatter",
        mode: "lines",
        name: "Deaths By Date",
        x: cellNumbers[0],
        y: cellNumbers[2],
        line: {
            color: "PaleGreen",
            dash: "dash",
        }
    };
    var cumDeathTrace = {
        type: "scatter",
        mode: "lines",
        name: "Cumulative Deaths to Date",
        x: cellNumbers[0],
        y: cellNumbers[4],
        line: {
            color: "PaleGreen",
            dash: "line",
        }
    };

    /* Organizing traces into groups */
    var data = [table]
        var data1 = [attackTrace,cumAttackTrace,deathTrace,cumDeathTrace]

    /* Defining layouts */ 
    var layout = {
      title: "Attack and Deaths (Daily and Cumulative)",
      height: 1100,
      showlegend: true,
    }

    var layoutGraph = {
        title: 'Attach and Deaths (Daily and Cumulative)',
        height: 800,
        plot_bgcolor: 'rgba(100,100,100,0.65)', 

        yaxis: {
            title: 'Numbers Reported',
        },
        legend: {
            x: 0.1,
            y: 0.95
        },
    }

    Plotly.plot('table', data, layout);
    Plotly.plot('graph', data1, layoutGraph);
    
  });