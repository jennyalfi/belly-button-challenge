// 1.) Use the D3 library to read in samples.json

// 2.) Create a horizontal bar chart with a dropdown menu to display
// the top 10 OTUs found in that individual. (Sort & slice)
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// 3.) Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.

// 4.) Display the sample metadata, i.e., an individual's demographic information.

// 5.) Display each key-value pair from the metadata JSON object somewhere on the page.

// 6.) Update all the plots when a new sample is selected.

// Use the D3 library to read in samples.json
function initSetup() {
  let dropDownMenu = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
    console.log(data);
    let names = data.names;
    for(let i = 0; i < names.length; i++){
        dropDownMenu.append("option").text(names[i]).property("value", names[i]);
    };
    let firstID = names[0];
    demoTable(firstID);
    charts(firstID);
  });
  // Assign the value to the dropdown menu option
}
function optionChanged(newID) {
    demoTable(newID);
    charts(newID);
}
initSetup();

// Display the sample metadata, i.e., an individual's demographic information.
function demoTable(sampleID) {
    d3.json("samples.json").then((data) => {

        let meta = data.metadata;
        let metaArray = meta.filter(sampleObj => sampleObj.id == sampleID);
        let metaResult = metaArray[0];

        let table = d3.select("#sample-metadata");
        table.html("");
        for(key in metaResult) {
            table.append("h6").text(`${key.toUpperCase()}: ${metaResult[key]}`)
        }

    })

}
// Charts setup
function charts(sampleID) {
    d3.json("samples.json").then((data) => {
        let meta = data.metadata;
        let metaArray = meta.filter(sampleObj => sampleObj.id == sampleID);
        let metaResult = metaArray[0];
        let washfreq = metaResult.wfreq;
        
        let samples = data.samples;
        let samplesArray = samples.filter(sampleObj => sampleObj.id == sampleID);
        let samplesResult = samplesArray[0];

       
// Create a horizontal bar chart 

    let sampleValues = samplesResult.sample_values.slice(0, 10).reverse();
    let otuIDs = samplesResult.otu_ids.slice(0, 10).map((id) => `OTU ${id}`).reverse();
    let otuLabels = samplesResult.otu_labels.slice(0, 10).reverse();

    let trace1 = {
      x: sampleValues,
      y: otuIDs,
      text: otuLabels,
      name: "OTU",
      type: "bar",
      orientation: "h"
    };

    let dataBar = [trace1];

    let layoutBar = {
      title: "Top 10 Microbial Species (OTU's) <br> Found in Individual",
      margin: {
        l: 120,
        r: 80,
        t: 80,
        b: 100
      }
    };

    Plotly.newPlot("bar", dataBar, layoutBar);
 

// Create a bubble chart that displays each sample.

let trace2 = {
    x: samplesResult.otu_ids,
    y: samplesResult.sample_values,
    text: samplesResult.otu_labels,
    mode: 'markers',
    marker: {
      size: samplesResult.sample_values,
      color: samplesResult.otu_ids,
      colorscale: 'Picnic'
    }
  };

  let dataBubble = [trace2];

  let layoutBubble = {
    title: "Microbial Species (OTU's) per Sample",
    xaxis: { title: "OTU ID" },
    showlegend: false,
    height: 600,
    width: 1200
  };

  Plotly.newPlot("bubble", dataBubble, layoutBubble);
;

// GAUGE CHART: Advanced Challenge Assignment (Optional)
// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/Links to an external site. to plot the weekly washing frequency of the individual.
// You will need to modify the example gauge code to account for values ranging from 0 through 9.
// Update the chart whenever a new sample is selected.

        let trace3 = {
              type: "indicator",
              mode: "gauge+number+delta",
              value: washfreq,
              title: { text: "Belly Button Washing Frequency <br> Scrubs per Week", font: { size: 20 }},
              gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "black" },
                bar: { color: "black" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                  { range: [0, 9], color: "pink" },
                ]
              }
            }
          
          let dataGauge = [trace3];
          let layoutGauge = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "lavender",
            font: { color: "black", family: "Arial" }
          };
          
          Plotly.newPlot('gauge', dataGauge, layoutGauge);
          
        });
    }
