//Belly-button-challenge

// Getting the url for sample data listed on hmk
const sampleData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


//Bonus ///////////////////////////////





        // Create gauge chart

function gaugeChart(subjectID, wfreqValue) {
    
    console.log("subjectID:", subjectID);
    console.log("wfreqValue:", wfreqValue);

    // wfreq segment
    var angle = (wfreqValue / 9) * 180;

    var degrees = 180 - angle,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // needle shape
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    // needle posiition
    var traceNeedlePosition = {
        type: 'scatter',
        showlegend: false,
        x: [0],
        y: [0],
        marker: { size: 28, color: 'FF0000' },

        hoverinfo: 'none'
    }

    
    var traceGauge = {
        type: "pie",   
        showlegend: false,
        hole: 0.5,
        rotation: 90,  
        values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
        direction: "clockwise",
        textinfo: "text",
        textposition: "inside",
        hoverinfo: "none",
        marker: {
            colors: ["rgba(240, 236, 220, 0.5)", "rgba(232, 226, 202, .5)", "rgba(210, 206, 145, .5)", 
                    "rgba(202, 209, 95, .5)", "rgba(170, 202, 42, .5)", "rgba(110, 154, 22, .5)", 
                    "rgba(14, 127, 0, .5)", "rgba(10, 105, 0, .5)", "rgba(6, 80, 0, .5)", "white"]
            }
    }


    var dataGauge = [traceNeedlePosition, traceGauge];

    // Layout
    var layoutGauge = {
        shapes: [{
            type: "path",
            path: path,
            fillcolor: "850000",
            line: {
                color: "850000"
                }
        }],
        title: `<b>Test Subject ${subjectID} <br> Belly Button Washing Frequency</b> <br> Scrubs per Week`,
        height: 500,
        width: 500,
        xaxis: {
            zeroline:false, 
            showticklabels:false,
            showgrid: false, 
            range: [-1, 1]
        },
        yaxis: {
            zeroline:false, 
            showticklabels:false,
            showgrid: false, 
            range: [-1, 1]
        }
    }

    Plotly.newPlot("gauge", dataGauge, layoutGauge);

}
