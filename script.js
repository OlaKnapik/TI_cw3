var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>',
    thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';

var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; ' + osmLink + ' Contributors',
    mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    thunUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
    thunAttrib = '&copy; '+thunLink+' Contributors',
    mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
    

var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib, maxZoom: 20, minZoom: 10}),
    thunMap = L.tileLayer(thunUrl, {attribution: thunAttrib, maxZoom: 20, minZoom: 10}),
    odc_sz = L.tileLayer(mbUrl, {id: 'examples.map-20v6611k', attribution: mbAttr, maxZoom: 20, minZoom: 10});

//Inicjalizacja mapy
var map = L.map('map').setView([50.473,17.338], 14);

var baseLayers = {
	"Mapa podstawowa": osmMap,
	"Odcienie szarości": odc_sz,
	"Krajobraz": thunMap
};


//Mapa bazowa
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	{
		attribution: 'Map dat &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 20,
		minZoom: 10,
	}).addTo(map);


//WYCIECZKA

var wycieczka = new L.LayerGroup();

			L.marker([50.4747867, 17.3347711]).bindPopup('Katedra').addTo(wycieczka),
			L.marker([50.4766117, 17.3348457]).bindPopup('Wieża Wrocławska').addTo(wycieczka),
			L.marker([50.4744649, 17.3307620]).bindPopup('Wieża Ziębicka').addTo(wycieczka),
			L.marker([50.4724590, 17.3326428]).bindPopup('Fontanna Trytona').addTo(wycieczka),
			L.marker([50.4749572, 17.3338353]).bindPopup('Piękna Studnia').addTo(wycieczka);
			L.marker([50.4758447, 17.3313700]).bindPopup('Bastion św. Jadwigi').addTo(wycieczka),
			L.marker([50.4732238, 17.3326845]).bindPopup('Dom Wagi Miejskiej').addTo(wycieczka);
						
			
var overlays = {
			"Wycieczka": wycieczka
		};
		
		
		
L.control.layers(baseLayers, overlays).addTo(map);		
		

//Zmiana aktywnego ksztaltu

var ksztalt;


	$('#opcje div p').mouseenter(function() {
	$(this).css ("background-color" ,"#E3F0FF");
	});
	
	$('#opcje div p').mouseleave(function() {
	$(this).css ("background-color" ,"white");
	});
	
	$('#opcje div p').click(function() {
	$(this).css ("background-color" ,"#C5E6FF");
	});
		
	$('#punkt').click(function(){
	ksztalt = "punkt";
	});

	
	$('#okrag').click(function(){
	ksztalt = "okrag";
	});
	

	$('#poligon').click(function(){
	ksztalt = "poligon";
	});
	
	
	$('#zakoncz').click(function(){
	ksztalt = "brak";
	});

	$('#dodajopis').click(function(){
	ksztalt = "dodajopis";
	});

//Czyszczenie obiektów

$('#czysc').click(function(){
	map.removeLayer(points);
	map.removeLayer(circle);
	map.removeLayer(polygon);
});




gdzie_opis = [50.473,17.338];
var lista = [];
var i = 0;

	
function onMapClick(e) {
	
	if (ksztalt == "punkt")
	{
		points = new L.Marker(e.latlng, 
			{draggable: 'true',
			clickable: 'true',
			});
		map.addLayer(points);
	}
	
	
	if (ksztalt == "okrag")
	{
		circle = new L.circle(e.latlng, document.getElementById('promien').value, {
    	color: 'red',
    	fillColor: '#f03',
    	fillOpacity: 0.5
		});
		map.addLayer(circle);
	}
	
	
	if (ksztalt == "poligon")
	{
		lista[i] = e.latlng;
		i = i+1;
		
		circle = new L.circle(e.latlng, 4, {
    	color: 'black',
    	fillColor: 'black',
    	fillOpacity: 0.5
		});
		
		map.addLayer(circle);	
	}	
	
	
	if (ksztalt == "dodajopis")
	{
		popup = new L.popup()
    	.setLatLng(e.latlng)
    	.setContent("I am a standalone popup.")
    	.openOn(map);
	}

}

map.on('click', onMapClick);



function onMapDblClick(e) 
{
	polygon = new L.polygon([lista]);
	map.addLayer(polygon);
	lista = [];
	i = 0;
};
	
map.on('dblclick', onMapDblClick);



