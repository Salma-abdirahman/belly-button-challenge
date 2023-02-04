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


