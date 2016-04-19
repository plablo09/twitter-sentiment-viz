function playback(index,maxIndex) {
    $(":radio[value="+locations[index].radioId+"]").prop('checked',true);
	  ClearChart();
    // Animate the map position based on camera properties
    map.flyTo(locations[index].camera);
    map.once('moveend', function() {
		    getFeatures();
        // Duration the slide is on screen after interaction
        myTimerFly = window.setTimeout(function() {
            // Increment index
            index = (index + 1 === locations.length) ? 0 : index + 1;
            if(index != maxIndex){
                playback(index,maxIndex);
            }else {
				        if (myTimerFly != null) stopTravel();
				        //if (myTimerFly != null) stopTravel();
                map.flyTo(locations[locations.length - 1].camera);
                $(":radio[value=general]").prop('checked',true)
                $('input[name=place]').attr("disabled",false);
            }
        }, 5000); // After callback, show the location for 10 seconds.
    });
}

function flyToLocation(){
	if (myTimerFly != null) stopTravel();
    radioValue = $(this).val();
    locations.forEach(function(item,index){
        if(item["radioId"] == radioValue){
            map.flyTo(locations[index].camera);
        }
    });
}

function stopTravel(){
	clearTimeout(myTimerFly);
	myTimerFly = null;
    map.on('movestart', function() {
		ClearChart();
    });
    map.on('moveend', function() {
		ClearChart();
		getFeatures();
    });
}

function RefreshGraph(){
      //console.log(PosCounter);
	chartData.push({
		type: 	"Negativo",
		count: 	NegCounter,
		color:  "#C81316"
	});
	chartData.push({
		type: 	"Neutro",
		count: 	NeuCounter,
		color:  "#238AA3"
	});

	chartData.push({
		type: 	"Positivo",
		count: 	PosCounter,
		color:  "#98A243"
	});

	chart.validateData();

}

function ClearChart(){

	PosCounter = 0;
	NegCounter = 0;
	NeuCounter = 0;

	chartData = [];
	chart.dataProvider = chartData;
	chart.validateData();

}

function getFeatures(){
    f1 = map.queryRenderedFeatures({ layers: ['clase 1'] });
    NegCounter = f1.length;
    f2 = map.queryRenderedFeatures({ layers: ['clase 2'] });
    NeuCounter = f2.length;
    f3 = map.queryRenderedFeatures({ layers: ['clase 3'] });
    PosCounter = f3.length;
    RefreshGraph();
}
