//Belly-button-challenge

// Getting the url for sample data listed on hmk
const sampleData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function: Populate dropdown menu to display the top 10 OTUs found in that individual
function populateDropDown() {

    // D3
    var dropdownMenu = d3.select("#selDataset");

    d3.json(sampleData).then((data) => {

        
        var sampleNames = data.names;
    
        sampleNames.forEach((name) => {
            var option = dropdownMenu.append("option");
            option.text(name);
        });

        var displayID = dropdownMenu.property("value");
        console.log("displayID:", displayID);

        // Updating info
        updateInfo(displayID);
    });    
}


    
    // Creating Bar Chart


    // Top 10 OTU IDs and data and sort
    
    var topOtuIDs = otuIDs.slice(0,10).reverse().map(otuID => "OTU " + otuID);
    var topOtuLabels = otuLabels.slice(0,10).reverse();
    var topsampleValues = sampleValues.slice(0,10).reverse();

    let traceBar = {
        x: topsampleValues,
        y: topOtuIDs,
        text: topOtuLabels,
        type: "bar",
        orientation: "h"
    }


    let dataBar = [traceBar];

    // Layput
    let layoutBar = {
        title: `<b>Top 10 Bacteria Species<br> in Test Subject ${subjectID}</b>`,
        xaxis: {title: `Sample Values`},

    }


    Plotly.newPlot("bar", dataBar, layoutBar);

    
    



// Function to update demographic info and create charts
function updateInfo(subjectID) {

    // Use D3 select
    var demographicInfo = d3.select("#sample-metadata");

    demographicInfo.html("");

    d3.json(sampleData).then((data) => {

        // Fetching data
        var metaData = data.metadata.filter(sample => sample.id == subjectID)[0];
        console.log("metaData:", metaData);

        Object.entries(metaData).forEach(([key, value]) => {
            demographicInfo.append("h6").text(`${key}: ${value}`);
        });


        var samplesData = data.samples.filter(sample => sample.id == subjectID)[0];

        // Creating charts
        createCharts(subjectID, samplesData);

        // bonus
        var wfreq = metaData.wfreq;

        // bonus
        gaugeChart(subjectID, wfreq);
    });
}


// createing charts
function createCharts(subjectID, samplesInfo) {

    console.log("samplesInfo:", samplesInfo);
    console.log("subjectID:", subjectID);


    var otuIDs = samplesInfo.otu_ids;
    var otuLabels = samplesInfo.otu_labels;
    var sampleValues = samplesInfo.sample_values;
 
    
    
    

    // Creating Bubble Chart


    let traceBubble = {
        x: otuIDs,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: otuIDs,
            colorscale: "Earth"
        }
    }


    let dataBubble = [traceBubble];

    // Layout
    let layoutBubble = {
        title: `<b>All Bacteria Species in Test Subject ${subjectID}</b>`,
        xaxis: {title: `Operational Taxonomic Unit (OTU) ID`},
        yaxis: {title: `Sample Values`}
    }


    Plotly.newPlot("bubble", dataBubble, layoutBubble);
    
}


function optionChanged(newID) {
    console.log("newID:", newID)
    updateInfo(newID);
}

populateDropDown();




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
