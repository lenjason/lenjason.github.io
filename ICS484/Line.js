/** trace1 = {
  x:[1,2], y: [1,2],};
  type = 'scatter';
  trace2 = {
    x:[3,4], y:[9,16],};
    type = 'scatter';
  Plotly.plot{
    div.[trace1,trace2]
  }
* */
const trace1 = {
  x: ['2000-01-01', '2000-01-02', '2000-01-03', '2000-01-04', '2000-01-05', '2000-01-06', '2000-01-07', '2000-01-08', '2000-01-09', '2000-01-10', '2000-01-11', '2000-01-12', '2000-01-13', '2000-01-14', '2000-01-15', '2000-01-16', '2000-01-17', '2000-01-18', '2000-01-19', '2000-01-20', '2000-01-21', '2000-01-22', '2000-01-23', '2000-01-24', '2000-01-25', '2000-01-26', '2000-01-27', '2000-01-28', '2000-01-29', '2000-01-30', '2000-01-31'],
  y: [4.3, 8.2, 4.1, 5.6, -3, -0.2, 0.3, 0.4, 4.1, 5, 4.6, -0.2, -8.5, -9.1, -2.7, -2.7, -17, -11.3, -5.5, -6.5, -16.9, -12, -6.1, -6.6, -7.9, -10.8, -14.8, -11, -4.4, -1.3, -1.1],
  mode: 'lines',
  type: 'scatter',
  name: '2000',
};

const data = [trace1];

const layout = {
  xaxis: {
    type: 'date',
    title: 'January Weather',
  },
  yaxis: {
    title: 'Daily Mean Temperature',
  },
  shapes: [{
    type: 'line',
    x0: '2000-01-11',
    y0: 0,
    x1: '2000-01-11',
    yref: 'paper',
    y1: 1,
    line: {
      color: 'grey',
      width: 1.5,
      dash: 'dot',
    },
  }, {
    type: 'line',
    x0: '2000-01-17',
    y0: 0,
    x1: '2000-01-17',
    y1: Math.min(...trace1.y),
    line: {
      color: 'grey',
      width: 1.5,
      dash: 'dot',
    },
  }, {
    type: 'line',
    x0: '2000-01-02',
    y0: 0,
    x1: '2000-01-02',
    y1: trace1.y[trace1.x.indexOf('2000-01-02')],
    line: {
      color: 'grey',
      width: 1.5,
      dash: 'dot',
    },
  }],
  title: '2000 Toronto January Weather',
};

Plotly.plot('myDiv', data, layout);
