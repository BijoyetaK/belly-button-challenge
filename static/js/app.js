let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function makePlot(payload){
    let sample = payload.sample;
    let sample_metadata= payload.metadata;
    makeBarandBubblePlot(sample);
    demographicpanel(sample_metadata);
    makeGauge(sample_metadata);

}

//function for Bar & Bubble plot
function makeBarandBubblePlot(sample) {


    let sample_id = sample.id;
    let otu_ids = sample.otu_ids;
    let otu_labels = sample.otu_labels;
    let sample_values = sample.sample_values;


    //for bar plot - display on the div id: "bar"   
    if(d3.selectAll("#bar")){
   
        //let sortedsampledata = sample_values.sort((a,b) => b.sample_values - a.sample_values);

        if(sample_values.length >= 10){
            top10_otu_ids = otu_ids.slice(0,9);
            sliced_otu_labels = otu_labels.slice(0,9);
            top10_sample_values = sample_values.slice(0,9);
        }

        let otu_texts = [];
        for(let i=0; i < top10_otu_ids.length; i++){
            let otu_text = "OTU" + top10_otu_ids[i];
            otu_texts.push(otu_text);
        }

        data = [{
        x: top10_sample_values,
        y: otu_texts ,
        type: "bar",
        hovertext: otu_labels,
        orientation: "h"}];

        let layout = {
            title: `<b>Top 10 OTUs found in Test Subject: ${sample_id.toLocaleString()}</b>`,
            font:{size:12},
            xanchor:"left",
            yanchor:"top",
            xref:"paper",
            yref:"paper",
            yaxis:{autorange:"reversed"},
            width:"80%",
            automargin: true
        };  
  
        Plotly.newPlot("bar", data,layout);
    }

    //for bubble plot - display on the div id: "bubble" - for each sample data
    if(d3.selectAll("#bubble")){
        var trace1 = {
            type:"scatter",
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale:"Earth"
            }
          };
          
          var bubble_data = [trace1];
          
          var layout = {
            title: '<b>OTU IDs vs Sample Values</b>',
            xaxis: {
                title: {
                  text: '<b>OTU ID</b>'
                
                }
            },
            showlegend: false,
            height: 600,
            width: 1200
          };
          
          Plotly.newPlot("bubble", bubble_data, layout);
    };
    
}

//function to display demographic data  
function demographicpanel(sample_metadata){
    let metadata_keys = Object.keys(sample_metadata);

    d3.select("#sample-metadata").text("");

    for(let i=0; i< metadata_keys.length; i++){
        let meta_key = metadata_keys[i];
        let meta_value = sample_metadata[meta_key];

        d3.select("#sample-metadata")
          .insert("p").text(meta_key+":"+meta_value);

    }


}  

//function to create gauge chart
function makeGauge(sample_metadata){

    var gauge_data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: sample_metadata.wfreq,
          title: { text: "<b>Belly Buttpon Washing Frequency <br>  Scrubs per Week</b>" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
          bar:{color : "red", thickness:2},  
          axis: { range: [0, 9],tickvals:[0,1, 2, 3, 4, 5,6,7,8,9,10]},
          steps: [
            { range: [0, 1], color: "#ecebbd" },
            { range: [1, 2], color: "#d8e4bc" },
            { range: [2, 3], color: "#ace1af" },
            { range: [3, 4], color: "#addfad" },
            { range: [4, 5], color: "#a8e4a0" },
            { range: [5, 6], color: "#8fbc8f" },
            { range: [6, 7], color: "#2e8b57" },
            { range: [7, 8], color: "#228b22" },
            { range: [8, 9], color: "#006400" }
            ]
    
          }
        }
      ];
      
      let layout = { width: 500, height: 575, margin: { t: 0, b: 0 } };
      /* var theta = 123.5
      var r = 0.7
      var x_head = r * Math.cos(Math.PI/180*theta)
      var y_head = r * Math.sin(Math.PI/180*theta)
    
      let layout = {
      xaxis: {range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false},
      yaxis: {range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false},
      showlegend: false,
      annotations: [
        {
          ax: 0.5,
          ay: 0,
          axref: 'x',
          ayref: 'y',
          x: 0.5+x_head,
          y: y_head,
          xref: 'x',
          yref: 'y',
          showarrow: true,
          arrowhead: 3,
        }
      ]
    }; */
      Plotly.newPlot('gauge', gauge_data, layout);

      
}

//function called on each dropdownmenu change
function optionChanged(sampleID){
    let payload = {};
    let selectedItem = subjectSampleLookUp[sampleID];
    payload['sample'] = selectedItem.sample;
    payload['metadata'] = selectedItem.metadata;
    
    makePlot(payload);

}  


//defining global variables
var subjectIDs;

var samples;

var metadata;

var subjectSampleLookUp = {};

//reading the json from url response for data display and plotting
d3.json(url).then(function(data){

    subjectIDs = data.names;
    samples = data.samples;
    metadata = data.metadata;
    console.log('this is metadata:'+ metadata);
    
//samples via mapping
//ids = samples.map(object => object.id)
//otu_ids = samples.map(object => object.otu_ids)
    for(let i = 0; i < samples.length; i++){

        let sample = samples[i];

        subjectSampleLookUp[sample.id] = {"sample":sample,"metadata": metadata[i]};
        
        //default dropdownmenu value, demographic info and charts
        if(i == 0){
            let payload = {'sample':sample,'metadata':metadata[i]};
            let default_metadata = payload.metadata;
            demographicpanel(default_metadata);
            makePlot(payload);
        }
        
    };
    //console.log(subjectSampleLookUp);
   
    
    //console.log(subjectIDs)
//Passing values to the dropdownmenu
    for(let i = 0; i < subjectIDs.length; i++){
        let subjectID = subjectIDs[i];
        
        d3.selectAll("#selDataset")
        .append('option')
        .text(subjectID).attr("value", subjectID);
       
    }

     //This function is called on change of a dropdown menu item 
    d3.selectAll("#selDataset").on("change", optionChanged);

   
});








