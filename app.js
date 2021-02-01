// building the charts both bar and bubble Per instructions needed certain variables so that x and y values can be plotted
function buildCharts(newID) {
    d3.json("samples.json").then (importedData =>{
        console.log(importedData)
    

        var sample_values_ =  importedData.samples.filter(imp_data => imp_data.id.toString() === newID)[0].sample_values.slice(0, 10);
        console.log(sample_values_)
        // use slice to get first 10 values
        // convert id values to strings so the can be used for plotting when building the traces

        var top_otu_ids_ = importedData.samples.filter(imp_data => imp_data.id.toString() === newID)[0].otu_ids.slice(0, 10);
        //console.log(top_otu_ids_)
        // use slice to get first 10 values
        // convert id values to strings so the can be used for plotting when building the traces

        var otu_ids_ = top_otu_ids_.map(top_otu_ids_ => "OTU " + top_otu_ids_);
        //console.log(`OTU IDS: ${otu_ids_}`)

        var otu_labels_ =  importedData.samples[0].otu_labels.slice(0, 10);
        //console.log(`OTU_labels: ${otu_labels_}`)
            
        // Plotting H bar graph
            var trace1 = {
                type: "bar",
                orientation: "h",
                x: sample_values_.reverse(),
                y: otu_ids_.reverse(),
                text: otu_labels_,
            };

            var data = [trace1];

            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    autorange: true
                },
            };

            Plotly.newPlot("bar", data, layout);

        // Plotting Bubble graph
        var trace2 = {
            x: importedData.samples[0].otu_ids,
            // was having trouble getting the bubble chart to reflect the values in the right direction but not the bar chart. Threw the reverse at the end to see if it would flip
                // values in the right direction and it did. 
                y: sample_values_.reverse(),
                mode: "markers",
                marker: {
                    size: importedData.samples[0].sample_values,
                    color: importedData.samples[0].otu_ids
                },
                text:  importedData.samples[0].otu_labels
    
            };
            var data1 = [trace2];

            var layout_2 = {
                xaxis:{title: "OTU ID"},
            };

            Plotly.newPlot("bubble", data1, layout_2); 
        
        
        });
}
  
// build demographic info box
function buildDemographicData(newID) {

    d3.json("samples.json").then((demographicdata)=> {

        var newdata = demographicdata.metadata.filter(sample_data => sample_data.id.toString() === newID)[0];

        var demo_data = d3.select("#sample-metadata");
        // select panel body class which is where your demographic info data will go 

        demo_data.html("");
        // return nothing in the metadata panel body class and clear it out

        Object.entries(newdata).forEach(([key, value]) => {
            demo_data.append("h5").html(key + ":" + value);    
        });
    });
}

// building a function when you have the first id chosed "940". Populate the demographic information box with the first id
function init() {

    var dropdown = d3.select("#selDataset");
    // select seldataset with onchanged function to create your initial function as well as on changed 

    d3.json("samples.json").then((demographicdata)=> {
        //console.log(demographicdata);

    var Idnames = demographicdata.names;
        //console.log(Idnames);

    Idnames.forEach(function(name) {
        dropdown.append("option").html(name).property("value");
    });

    buildCharts(demographicdata.names[0]);
    buildDemographicData(demographicdata.names[0]);
            
    });
}

// build a function for onchanged based on index file onchanged call to rebuild chart and demo data for when a new id is selected
function optionChanged(newID) {
    buildCharts(newID);
    buildDemographicData(newID);
}

init();