# belly-button-challenge
Module 14 Challenge - Build Interactive Dashboard using d3, plotly and leaflet libraries in javascript

## Background: 
  - In this assignment involved analysis of the Belly Button Biodiversity datasets in json, which catalogs the microbes that colonize human navels and then using those data to build interactive dashboard for each sample. 
  - The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Deliverables involved: 
  - app.js(javascript code for creating plots and charts and logic for populating dashboard)
  - sample.json 
  - index.html(for interactive dashboard)

## Analysis via dashboard

  - The habitat conditions of the belly button may explain why we generally find some microbial species to be more common than others in the navel, but we'll see in the interactive graphic below, there is an extraordinary                   amount of variation among individuals. Some people have belly buttons dominated by one or two species whereas others have more even representation by handfuls of species.
  - OTUs - a measure used in this analysis signify relative abundance of different microbial “species” , each having unique ids. 
  
  - As you select each Test Subject ID/sample(volunteers who participated), the panel will display the correspondong demographic info, 
    while the 3 differents charts display the divsersity results for the same sample. 
   
   ![image](https://github.com/BijoyetaK/belly-button-challenge/assets/126313924/ddbe3340-79ca-4006-ba11-7678b0624fb6)


  ### Bar chart: Top 10 OTUs found in a Sample
  
  - Hover over each bar to learn about each OTUs(microbes family)
   
   ![IMG-2896](https://github.com/BijoyetaK/belly-button-challenge/assets/126313924/8b40f279-1407-4d50-ab3e-40b0a2daf4c6)

  ### Bubble chart : Distribution of OTUs(microbes) across sample values(number of volunteers in the same demographic group).
  
  - Hover over the bubbles to learn about the microbes. 
   ![image](https://github.com/BijoyetaK/belly-button-challenge/assets/126313924/2fffd2e2-a24a-4a7b-9f76-ee6dc3661643)
   
  ### Gauge chart : Belly Button washing frequency
  ![image](https://github.com/BijoyetaK/belly-button-challenge/assets/126313924/4d35bc5b-5d56-423b-add6-af421cb45615)

  
  ### references: 
  - https://www.tutorialsteacher.com/d3js/method-chaining-in-d3js
  - https://stackoverflow.com/questions/64994341/gauge-needle-for-plotly-indicator-graph
  - https://plotly.com/javascript/bubble-charts/
  - Module 14 activities and class examples



  
  

  
  


