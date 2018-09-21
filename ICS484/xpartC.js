/*
Part 1:
1. Read in the choleraDeaths.tsv data file.
2. Create a Plot.ly table of attacks (an attack is when someone exhibits symptoms of cholera) and
deaths by date, showing numbers per day and totals of both on each day.
3. Create a line chart showing time on the x-axis vs number of attacks on this day, deaths on this
day, total attacks up to this day, and total deaths up to this day, making a total of 4 lines on the
chart.
4. Allow the user to bring up information on the webpage about who wrote the project, what
libraries are being used to visualize it, where the data came from, etc.
5. The charts should be scaled to fit on a 1920x1080 screen.

*/
//Reading data and returning rows with keys
Plotly.d3.tsv("choleraDeaths.tsv", function(err, rows){
    function unpack(rows, key) {
    return rows.map(function(row){return row[key];});
    }
  
  // Setting the Header Values
    var headerNames = Plotly.d3.keys(rows[0]);
    headerNames.push("Total");
    //console.log(headerNames);
    var headerValues = [headerNames[0],headerNames[1],
                        headerNames[2],headerNames[3]];
  
  // Setting the Cell Values
    var cellValues = [];
    for (i = 0; i < headerValues.length; i++) {
      cellValue = unpack(rows, headerValues[i]);
      cellValues[i] = cellValue;
    }
      //Converting strings to int and creating new columns
  for(let a=0;a<cellValues[1].length;a++){
    cellValues[1][a]=Number(cellValues[1][a]);};
  
  for(let a=0;a<cellValues[2].length;a++){
      cellValues[2][a]=Number(cellValues[2][a]);};
  
  for(let a=0;a<cellValues[3].length;a++){
      cellValues[3][a]= Number(cellValues[1][a]) + Number(cellValues[2][a]);
      };
  
  var cum_attacks= []
  var temp=0;
      for(let a=0;a<cellValues[1].length;a++){
        temp= Number(cellValues[1][a]) + temp;
        cum_attacks[a]=temp;};
  var cum_deaths= []
  var temp=0;
      for(let a=0;a<cellValues[2].length;a++){
        temp= Number(cellValues[2][a]) + temp;
        cum_deaths[a]=temp;};
  // Creating the table
    var table = {
      type: 'table',
      columnwidth: [100,100,100,100],
      columnorder: [0,1,2,3],
      header: {
        values: headerValues,
        align: "center",
        line: {width: 1, color: 'rgb(227,26,28)'},
        fill: {color: ['rgb(253,141,60)']},
        font: {family: "Arial", size: 13, color: "white"}
      },
      cells: {
        values: cellValues,
        align: ["center", "center"],
        line: {color: "black", width: 1},
        fill: {color: ['rgb(254,204,92)', 'rgba(255,255,178, 0.65)']},
        font: {family: "Arial", size: 11, color: ["black"]}
      },
      xaxis: 'x',
      yaxis: 'y',
      domain: {x: [0,0.4], y: [0,1]}
    }
  
  //Creating traces for plotting
    // create 1st plot
    var trace1 = {
      x: cellValues[0],
      y: cellValues[1],
      xaxis: 'x1',
      yaxis: 'y1',
      mode: 'lines',
      line: {width: 2, color: '#fecc5c'},
      name: 'Daily Attacks'
    }
    // create 2nd plot
    var trace2 = {
      x: cellValues[0],
      y: cellValues[2],
      xaxis: 'x2',
      yaxis: 'y2',
      mode: 'lines',
      line: {width: 2, color: '#fd8d3c'},
      name: 'Daily Deaths'
    }
  
    // create 3rd plot
    var trace3 = {
      x: cellValues[0],
      y: cum_attacks,
      xaxis: 'x3',
      yaxis: 'y3',
      mode: 'lines',
      line: {width: 2, color: '#f03b20'},
      name: 'Cumulative Attacks'
    }
  
    // create 4th plot
    var trace4 = {
      x: cellValues[0],
      y: cum_deaths,
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