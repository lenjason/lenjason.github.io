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
    //console.log(header);
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
        cellNumbers[1][i]=Number(cellNumbers[1][i]);
    };
  
    for(let i=0; i<cellNumbers[2].length; i++){
        cellNumbers[2][i]=Number(cellNumbers[2][i]);
    };
  
    for(let i=0; i<cellNumbers[3].length; i++){
        cellNumbers[5][i]= Number(cellNumbers[1][i]) + Number(cellNumbers[2][i]);
    };
  
    //var cum_attacks= []
    var temp=0;
    for(let i=0; i<cellNumbers[1].length; i++){
        temp= Number(cellNumbers[1][i]) + temp;
        //cum_attacks[i]=temp;
        cellNumbers[3][i]=temp;
    };

    //var cum_deaths= []
    var temp=0;
    for(let i=0; i<cellNumbers[2].length; i++){
        temp= Number(cellNumbers[2][i]) + temp;
        //cum_deaths[i]=temp;
        cellNumbers[4][i]=temp;
    };

        
  // Creating the table
    var table = {
      type: 'table',
      columnwidth: [100,100,100,100,100,100],
      columnorder: [0,1,2,3,4,5],
      header: {
        values: headerNames,
        align: "center",
        line: {width: 1, color: 'rgb(227,26,28)'},
        fill: {color: ['rgb(51,51,255)']},
        font: {family: "Arial", size: 13, color: "white"}
      },
      cells: {
        values: cellNumbers,
        align: ["center", "center"],
        line: {color: "black", width: 1},
        fill: {color: ['rgb(85,221,221)', 'rgba(51,255,255, 0.65)']},
        font: {family: "Arial", size: 11, color: ["black"]}
      },
      xaxis: 'x',
      yaxis: 'y',
      domain: {x: [0,0.4], y: [0,1]}
    }
  
  //Creating traces for plotting
    // create 1st plot
    var trace1 = {
      x: cellNumbers[0],
      y: cellNumbers[1],
      xaxis: 'x1',
      yaxis: 'y1',
      mode: 'lines',
      line: {width: 2, color: '#fecc5c'},
      name: 'Daily Attacks'
    }
    // create 2nd plot
    var trace2 = {
      x: cellNumbers[0],
      y: cellNumbers[2],
      xaxis: 'x2',
      yaxis: 'y2',
      mode: 'lines',
      line: {width: 2, color: '#fd8d3c'},
      name: 'Daily Deaths'
    }
  
    // create 3rd plot
    var trace3 = {
      x: cellNumbers[0],
      y: cellNumbers[3], //cum_attacks,
      xaxis: 'x3',
      yaxis: 'y3',
      mode: 'lines',
      line: {width: 2, color: '#f03b20'},
      name: 'Cumulative Attacks'
    }
  
    // create 4th plot
    var trace4 = {
      x: cellNumbers[0],
      y: cellNumbers[4], //cum_deaths,
      xaxis: 'x4',
      yaxis: 'y4',
      mode: 'lines',
      line: {width: 2, color: '#bd0026'},
      name: 'Cumulative Deaths'
    }
    var data = [table,trace1,trace2,trace3,trace4]
  
  //Defining axes
    // define subplot axes
    var axis = {
      showline: true,
      zeroline: false,
      showgrid: true,
      mirror:true,
      ticklen: 4,
      gridcolor: '#ffffff',
      tickfont: {size: 10},
    }
  
    var axis1 = {domain: [0.5, 1], anchor: 'y1', showticklabels: false}
    var axis2 = {domain: [0.5, 1], anchor: 'y2', showticklabels: false}
    var axis3 = {domain: [0.5, 1], anchor: 'y3',showticklabels: false}
    var axis4 = {domain: [0.5, 1], anchor: 'y4',showticklabels: false}
    var axis5 = {domain: [0.74, 0.98], anchor: 'x1', hoverformat: '.0f'}
    var axis6 = {domain: [0.49, 0.72], anchor: 'x2', hoverformat: '.0f'}
    var axis7 = {domain: [0.24, 0.47], anchor: 'x3', hoverformat: '.0f'}
    var axis8 = {domain: [0.0, 0.24], anchor: 'x4', hoverformat: '.0f'}
  
  // Defining layout
    var layout = {
      title: "Cholera Attack and Deaths (Daily and Cumulative)",
      titlefont: {size: 36},
      //paper_bgcolor: 'rgba(245,246,249,1)',
      plot_bgcolor: 'rgba(245,246,249,0.65)',
      width: 3350,
      height: 1000,
      showlegend: true,
      legend: {
        x: 0.51,
        y: 0.95
      },
      xaxis1: Object.assign(axis1,axis),
      xaxis2: Object.assign(axis2,axis),
      xaxis3: Object.assign(axis3,axis),
      xaxis4: Object.assign(axis4,axis),
      yaxis1: Object.assign(axis5,axis),
      yaxis2: Object.assign(axis6,axis),
      yaxis3: Object.assign(axis7,axis),
      yaxis4: Object.assign(axis8,axis)
    }
 
    Plotly.plot('graph', data, layout);
  
  });