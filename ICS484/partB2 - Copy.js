/* 
For a B you must:
1. Read in naplesCholeraAgeSexData.tsv showing fatality numbers for men and women in different age groups from cholera in the same time period in Naples.
2. Show a table of age categories for male fatalities and female fatalities (i.e. one column or male and another for female).
3. Show a bar chart of age categories for male fatalities and another for female fatalities
4. Read in UKcensus1851.csv showing the number of men and women in different age groups in that same time period in the UK.
5. Show a table of the census age data for men and women (i.e. one column for men and another for women) including the overall totals.
6. Show a pie chart of the census age data for men and another for women.
7. Show a bar chart of the census age data for men and another for women.
8. Show a pie chart for the overall number of men vs women.
9. The charts should be scaled to fit on a 1920x1080 screen.
*/

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
        font: {family: "Arial", size: 13, color: "white"}
      },
      cells: {
        values: cellNumbers,
        align: ["center", "center"],
        line: {color: "black", width: 1},
        fill: {color: ['rgb(85,221,221)', 'rgba(51,255,255, 0.65)']},
        font: {family: "Arial", size: 11, color: ["black"]}
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
      height: 400,
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


    
    Plotly.plot('table3', data, layout);
    Plotly.plot('graph3', data1, layoutGraph);

});