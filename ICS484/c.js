/* 
    For a C you must:
    1. Read in the choleraDeaths.tsv data file.
    2. Create a Plot.ly table of attacks (an attack is when someone exhibits symptoms of cholera) and deaths by date, showing numbers per day and totals of both on each day.
    3. Create a line chart showing time on the x-axis vs number of attacks on this day, deaths on this day, total attacks up to this day, and total deaths up to this day, making a total of 4 lines on the chart.
    4. Allow the user to bring up information on the webpage about who wrote the project, what libraries are being used to visualize it, where the data came from, etc.
    5. The charts should be scaled to fit on a 1920x1080 screen.
*/

/* Read in the choleraDeaths.tsv */
Plotly.d3.tsv("choleraDeaths.tsv",function(err,rows){
    function unpack(rows,key) {
        return rows.map(function(row){return row[key];});
    }

    /* Column Headers */
    var header=Plotly.d3.keys(rows[0]);
    header.Names.push("Attacks to Date");
    header.Names.push("Deaths to Date");
    header.Names.push("Total");
    var headerNames = [header[0],header[1],header[2],header[3],header[4],header[5]];

    /* Unpacking data into Array */
    var cell = [];
    for (i=0; i<header.length; i++) {
        cell = unpack(rows,header[i]);
        cellArray[i] = cell;
    }

    /* Casting Strings to Integers and Populating Table */
    for(let i=0; i<cellArray[1].length; i++){
        cellArray[1][i] = Number(cellArray[1][i]);
    };
      
    for(let i=0; i<cellArray[2].length; i++){
        cellArray[2][i] = Number(cellArray[2][i]);
    };
      
    for(let i=0; i<cellArray[3].length; i++){
        cellArray[3][i] = Number(cellArray[1][i]) + Number(cellArray[2][i]);
    };

    /* Populating Cummulative Attacks */
    var cumAttacks= []
    var temp = 0;
        for(let i=0; i<cellValues[1].length; i++){
            temp = Number(cell[1][i]) + temp;
            cumAttacks[i] = temp;
        };

    /* Populating Cummalative Deaths */
    var cumDeaths= []
    var temp = 0;
        for(let i=0; i<cellValues[2].length; i++){
            temp = Number(cell[2][i]) + temp;
            cumDeaths[i]=temp;};

    /* Creating the table */
        var dataTable = {
        type: 'table',
        columnwidth: [100,100,100,100,100,100],
        columnorder: [0,1,2,3,4,5],
        header: {
            values: headerValues,
            align: "center",
        },
        cells: {
            values: cellValues,
            align: ["center", "center"],
        },
        xaxis: 'x',
        yaxis: 'y',
        domain: {x: [0,0.4], y: [0,1]}
        }



    Plotly.plot('graph', data, layout);

});