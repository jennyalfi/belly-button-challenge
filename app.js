// 1. Use the D3 library to read in samples.json
// 2. Create a horizontal bar chart with a dropdown menu to display
// the top 10 OTUs found in that individual. (Sort & slice)
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.



// Create function
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
function charts(sampleID) {
    d3.json("samples.json").then((data) => {
        let meta = data.metadata;
        let metaArray = meta.filter(sampleObj => sampleObj.id == sampleID);
        let metaResult = metaArray[0];
        let washfreq = metaResult.wfreq;
        
        let samples = data.samples;
        let samplesArray = samples.filter(sampleObj => sampleObj.id == sampleID);
        let samplesResult = samplesArray[0];

       
        





        var data = [
            {
              type: "indicator",
              mode: "gauge+number+delta",
              value: washfreq,
              title: { text: "Speed", font: { size: 24 } },
              delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
              gauge: {
                axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "darkblue" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                  { range: [0, 250], color: "cyan" },
                  { range: [250, 400], color: "royalblue" }
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: 490
                }
              }
            }
          ];
          
          var layout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "lavender",
            font: { color: "darkblue", family: "Arial" }
          };
          
          Plotly.newPlot('gauge', data, layout);
          

    })

}
// On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);

// // Function called by DOM changes
// function getData() {
//   let dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a letiable
//   let dataset = dropdownMenu.property("sample_values");
//   // Initialize an empty array
//   let data = [];

// // Call function to update the chart
//   updatePlotly(data);
// }

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("bar", "sample_values", [otu_ids]);
// }



// // Sort the data by OTUs descending
// let sortedByOTUs = data.sort((a, b) => b.names - a.names);

// // Slice the first 10 objects for plotting
// let slicedData = sortedByOTUs.slice(0, 10);

// // Reverse the array to accommodate Plotly's defaults
// let reversedData = slicedData.reverse();

// // Trace1 for the OTU Data
// let trace1 = {
//   x: reversedData.map(object => object.sample_values),
//   y: reversedData.map(object => object.names),
//   text: reversedData.map(object => object.names),
//   name: "OTU",
//   type: "bar",
//   orientation: "h"
// };

// // Data array
// // `data` has already been defined, so we must choose a new name here:
// let traceData = [trace1];

// // Apply a title to the layout
// let layout = {
//   title: "10 OTUs found in individual",
//   margin: {
//     l: 100,
//     r: 100,
//     t: 100,
//     b: 100
//   }
// };

// // Render the plot to the div tag with id "plot"
// // Note that we use `traceData` here, not `data`
// Plotly.newPlot("plot", traceData, layout);

// // 3.) Create a bubble chart that displays each sample.
// // Use otu_ids for the x values.
// // Use sample_values for the y values.
// // Use sample_values for the marker size.
// // Use otu_ids for the marker colors.
// // Use otu_labels for the text values.

// // Create a custom function to display each sample
// function eachSample(roman) {
//     return roman.romanSearchResults > 100000000;
//   }

//   // Call the custom function with filter()
//   let popularRomans = data.filter(popular);

//   // Trace for the Roman Data
//   let trace1 = {
//       x: eachSample.map(row => row.otu_ids),
//       y: eachSample.map(row => row.sample_values),
//       type: "markers"
//   };

//   // Data trace array
//   let traceData = [trace1];

//   // Apply title to the layout
//   let layout = {
//     title: "Samples"
//   };

//   // Render the plot to the div tag with id "plot"
//   Plotly.newPlot("plot", traceData, layout);

// 4.) Display the sample metadata, i.e., an individual's demographic information.
// 5.) Display each key-value pair from the metadata JSON object somewhere on the page.

// 6.) Update all the plots when a new sample is selected.

// 7.) Deploy your app to a free static page hosting service, such as GitHub Pages.
// Submit the links to your deployment and your GitHub repo.
