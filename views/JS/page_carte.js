var zoom=10


var carIcon = new L.Icon({ //Modify the marker
    iconUrl: '../images/marker.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var southWest = L.latLng(35.712, -15.227)
var northEast = L.latLng(60.774, 15.125)
var bounds = L.latLngBounds(southWest, northEast);
var map
var locationBase=[48.862725, 2.287592]

function initMap(){  //Initialization of the map
    map=L.map("map",{
        fullscreenControl: true,
        maxBounds: bounds,   
        fullscreenControlOptions: {
        position: 'topright'},
        wheelDebounceTime:0,
        wheelPxPerZoomLevel:50,
        minZoom:5,
    }).setView(locationBase,8);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    
    

    
    L.control.scale({   //Map dimensions
        metric:true,
        imperial:true,
        maxwidth:100,
        position:"bottomleft"
    }).addTo(map)

    map.on('zoom', ()=> {
        zoom=map.getZoom()
    })
}

var markerCluster=new L.markerClusterGroup( { animate: true,animateAddingMarkers: true})


function removePin(){  //Delete all markers
        markerCluster.clearLayers() 

}

 
//Function to create a marker and the content of his popup.

async function createPin(){

    await loadCarte()  //loadCarte is an sync function because we display 50000 markers each 100ms
    loadFiltre()

    
    if(!filtre){ //display all pins if we don't filter
        var list=listAccident
        if(list.length<=0){
            await getAccident()
        }
        
    }
    else{   
        var list=listAccidentFiltre
    }


    


    const record=50000
    const waitingTime=2000
    let a
    let b
    let marker
    let pop

        markerCluster=new L.markerClusterGroup( { animate: true,animateAddingMarkers: true}) 
    
    
    

    
    let markers=[]
    for (let i = 0; i < list.length; i++) {
          
        try {
            a = list[i].fields.coordonnees[0];
            b = list[i].fields.coordonnees[1];
            marker = L.marker([a, b], { icon: carIcon });
            pop = popUp(list, i);
            marker.bindPopup(pop);
            markers.push(marker)
            
            if(i%record==0 && i>0){  //add only 100000 markers at once 
                
                markerCluster.addLayers(markers);
                markers=[]
                await loadCarte()
                
                map.addLayer(markerCluster);
                
            }
            
            
            else if(i==(list.length -2) && (i%record!=0)){ //add the rest of the markers

                markerCluster.addLayers(markers);
                
                map.addLayer(markerCluster);
                await loadCarte()
                

                
            }
            

        } 
        catch (error) {
            console.log("Couldn't find coordinates");
        }
    }

    workCarte()
    workFiltre()

    try{

        if(selectedRegion || selectedDepartement || selectedVille){ //center the map to a specific location if a region | dep | ville is selected

            setViewUser(list[0].fields.coordonnees)
        }
    }
    catch{
        console.log("couldn't find coordinates")
    }

}

function setViewUser(listCoordonnees){   //center the map to a specific location
    map.setView(listCoordonnees,zoom, {  //make the animation smooth 
        "animate": true,
        "pan": {
          "duration": 1
        }})
}

initMap()

const express=require("express")

const nomRegion=require("nomRegions")

nomRegion()
