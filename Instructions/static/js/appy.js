function buildCharts() {
    d3.json("data/samples.json").then (importedData =>{
        console.log(importedData)
    });

        var sample_values_ =  importedData.samples.filter(imp_data => imp_data.id.toString() === ID)[0].sample_values.slice(0, 10);
        console.log(sample_values_)

        var top_otu_ids_ = importedData.samples.filter(imp_data => imp_data.id.toString() === ID)[0].otu_ids.slice(0, 10);
        //console.log(top_otu_ids_)

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
            Plotly.newPlot("bubble", data1, layout_2); 
        
        
        };
  
