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
    header.push("Cummalative Attacks");
    header.push("Cummalative Deaths");
    header.push("Total Attack and Deaths by Date");

    var headerNames = [header[0], header[1], header[2], header[3],
                        header[4],header[5]];
  
    /* Unpacking data into Array */
    var cellValues = [];
    for (i=0; i<headerNames.length; i++) {
      cellValue = unpack(rows, headerNames[i]);
      cellValues[i] = cellValue;
    }

    /* Casting Strings to Integers and Populating Table */
    for(let i=0; i<cellValues[1].length; i++){
        cellValues[1][i] = Number(cellValues[1][i]);
    };
  
    for(let i=0; i<cellValues[2].length; i++){
        cellValues[2][i] = Number(cellValues[2][i]);
    };
  
    for(let i=0; i<cellValues[3].length; i++){
        cellValues[5][i] = Number(cellValues[1][i]) + Number(cellValues[2][i]);
    };
 
    /* Populating Cummulative Attacks */
    var cum_attacks= []
    var temp=0;
    for(let a=0;a<cellValues[1].length;a++){
        temp= Number(cellValues[1][i]) + temp;
        cum_attacks[i]=temp;
        cellValues[3][i]=temp;
    };

    /* Populating Cummalative Deaths */
    var cum_deaths= []
    var temp=0;
    for(let i=0; a<cellValues[i].length; i++){
        temp= Number(cellValues[2][i]) + temp;
        cum_deaths[i]=temp;
        cellValues[4][i]=temp;
    };

    /* Creating the table */
    var table = {
      type: 'table',
      columnwidth: [100,100,100,100,100,100],
      columnorder: [0,1,3,2,4,5],
      header: {
        values: headerNames,
        align: "center",
      },
      cells: {
        values: cellValues,
        align: ["right","right","right","right","right","right"],
      },
      xaxis: 'x',
      yaxis: 'y',
      domain: {x: [0,0.4], y: [0,1]}
    }

    var data = [table]
        //,[trace1,trace2,trace3,trace4]]
  
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