// Scatter Chart for Raw Data

async function getData() {
    // Fetch CSV data and convert to text
    const response = await fetch('../data/raw-height-data.csv');
    const data = await response.text();

    // Set up arrays for x-axis values and different condition y values
    const xWeeks = [];
    const yEggHeights = [];
    const yMoreEggHeights = [];
    const yMoreLentilHeights = [];
    const yLentilHeights = [];

    // Split table by new line and remove first row
    const table = data.split('\n').slice(1);

    // Runs for all rows
    table.forEach(row => {
        // Split row into cols by commas
        const columns = row.split(',');

        // Add week value to x axis array
        const week = parseFloat(columns[0]);
        xWeeks.push(week);

        // Add all height values to corresponding y-axis array
        const yEggHeight = parseFloat(columns[1]);
        yEggHeights.push(yEggHeight);

        const yMoreEggHeight = parseFloat(columns[2]);
        yMoreEggHeights.push(yMoreEggHeight);

        const yMoreLentilHeight = parseFloat(columns[3]);
        yMoreLentilHeights.push(yMoreLentilHeight);

        const yLentilHeight = parseFloat(columns[4]);
        yLentilHeights.push(yLentilHeight);
    });

    return {xWeeks, yEggHeights, yMoreEggHeights, yMoreLentilHeights, yLentilHeights}; // Return all value arrays
}

async function createChart() {
    const data = await getData();   // Wait until getData() processes the data
    const lineChart = document.getElementById('line-chart');     // Get the html element that will hold the chart

    const chart = new Chart(lineChart, {  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            labels: data.xWeeks,        // x-axis labels
            datasets: [                 
                {
                    label:    '1 Eggshell : 0 Lentil',     // Dataset label for legend
                    data:     data.yEggHeights,     // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(255, 0, 132, 0.2)',    // Color for data marker
                    borderColor:      'rgba(255, 0, 132, 1)',      // Color for data marker border
                    borderWidth:      1,                            // Data marker border width
                    tension: 0.3                                    // Graph smoothing
                },
                {
                    label:    '3 Eggshell : 1 Lentil',     // Dataset label for legend
                    data:     data.yMoreEggHeights,     // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(132, 0, 255, 0.2)',    // Color for data marker
                    borderColor:      'rgb(132, 0, 255)',      // Color for data marker border
                    borderWidth:      1,                            // Data marker border width
                    tension: 0.2                                    // Graph smoothing
                },
                {
                    label:    '1 Eggshell : 3 Lentil',     // Dataset label for legend
                    data:     data.yMoreLentilHeights,     // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(0, 255, 13, 0.2)',    // Color for data marker
                    borderColor:      'rgb(0, 255, 13)',      // Color for data marker border
                    borderWidth:      1,                            // Data marker border width
                    tension: 0.2                                    // Graph smoothing
                },
                {
                    label:    '0 Eggshell : 1 Lentil',     // Dataset label for legend
                    data:     data.yLentilHeights,     // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(255, 0, 0, 0.2)',    // Color for data marker
                    borderColor:      'rgb(255, 0, 0)',      // Color for data marker border
                    borderWidth:      1,                            // Data marker border width
                    tension: 0.2                                    // Graph smoothing
                }
            ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Week',     // x-axis title
                        font: {                   // font properties
                            size: 16
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                    min: 0,                     // starting value      
                    font: {
                        size: 14  
                    },
                    },
                    grid: {                       // x-axis grid properties
                        color: '#7fa78c'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: 'Plant Height (cm)',     // y-axis title
                        font: {
                            size: 16
                        },
                    },
                    ticks: {    
                        maxTicksLimit: 5,        // Limit # of tick marks
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#7fa78c'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Mean Marigold Heights with Eggshell : Lentil Fertilizer Ratios',
                    font: {
                        size: 20,
                    },
                    color: '#black',
                    padding: {
                        top: 15,
                        bottom: 20
                    }
                },
                legend: {
                    display: true,
                    align: 'center',
                    position: 'top',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }       
    });
}

createChart();