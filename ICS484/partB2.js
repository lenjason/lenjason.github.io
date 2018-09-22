/* 
For a B you must:
... Continued from partB.js
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


    Plotly.plot('table3', data, layout);
    Plotly.plot('graph3', data1, layoutGraph);
    Plotly.plot('graph4', pieChart1, layout3);
    Plotly.plot('graph5', pieChart2, layout4);
    Plotly.plot('graph6', pieChart3, layout2);

});