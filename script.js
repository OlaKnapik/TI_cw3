$(document).ready(function() {
	
	$("#popis").hide();
	$("#ppromien").hide();
	
	$("#stop").hide();
	$("#bazylika").hide();
	$("#wwr").hide();
	$("#wzi").hide();
	$("#tryton").hide();
	$("#studnia").hide();
	$("#bastion").hide();
	$("#waga").hide();
	$("#s1").hide();
	$("#s2").hide();
});


widp = false;
widt = false;


//..........GeoJSON - forty.....................

	
var forty = [{
    "type": "Feature",
    "properties": {"nazwa": "Fort Prusy"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [17.31756, 50.48374],
			[17.31811, 50.48372],
			[17.31828, 50.48336],
			[17.31782, 50.48317],
			[17.31734, 50.48338]
        ]]
    }
}, 

{
    "type": "Feature",
    "properties": {"nazwa": "Fort III"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [17.35038, 50.46825],
			[17.35132, 50.46778],
			[17.35226, 50.4683],
			[17.35226, 50.46908],
			[17.35071, 50.46875]
            
        ]]
    }
},

{
    "type": "Feature",
    "properties": {"nazwa": "Fort Bombardier"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [17.32272, 50.48172],
			[17.32256, 50.48211],
			[17.32346, 50.48221],
			[17.32359, 50.4818]
            
        ]]
    }
},

{
    "type": "Feature",
    "properties": {"nazwa": "Fort II"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [17.32501, 50.49244],
			[17.32649, 50.49192],
			[17.32651, 50.49132],
			[17.32539, 50.4913],
			[17.32443, 50.49104],
			[17.32401, 50.49154]
        ]]
    }
},

{
    "type": "Feature",
    "properties": {"nazwa": "Fort Wodny"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [17.32103, 50.46596],
			[17.32044, 50.46546],
			[17.32157, 50.46492],
			[17.32224, 50.4655],
			[17.32157, 50.46569]
        ]]
    }
},

{
    "type": "Feature",
    "properties": {"nazwa": "Fort I"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [17.33554, 50.48803],
			[17.3376, 50.48741],
			[17.33806, 50.48789],
			[17.33726, 50.48852],
			[17.33591, 50.48872]
        ]]
    }
}
];

var stylFort1 = {
    "color": "#300244",
    "weight": 2
};

var geojson;

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 8,
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}


function resetHighlight(e) {
    geojson.resetStyle(e.target);  
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	
	layer.bindPopup(feature.properties.nazwa);
	
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

	geojson = L.geoJson(forty, 
		{
    	style: stylFort1,
    	onEachFeature: onEachFeature
		})



//Warstwy

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
    

var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib, maxZoom: 16, minZoom: 10}),
    thunMap = L.tileLayer(thunUrl, {attribution: thunAttrib, maxZoom: 16, minZoom: 10}),
    odc_sz = L.tileLayer(mbUrl, {id: 'examples.map-20v6611k', attribution: mbAttr, maxZoom: 20, minZoom: 10}),
    orto = L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer', { format: 'img/png', transparent: true,layers: 'Raster', maxZoom: 20, minZoom: 10}),
    dzialeczki = L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/pub/guest/G2_GO_WMS/MapServer/WMSServer', { format: 'img/png', transparent: true,layers: 'Dzialki', maxZoom: 20, minZoom: 10});
        
        	

//Inicjalizacja mapy
var map = L.map('map').setView([50.473,17.338], 13);


var skala=L.control.scale({
		position:"bottomleft",
		maxWidth: 150,
		updateWhenIdle:true,
		imperial:false,
		});
	skala.addTo(map);
	
	
var baseLayers = {
	"Mapa podstawowa": osmMap,
	"Odcienie szarości": odc_sz,
	"Krajobraz": thunMap,
	"Ortofotomapa": orto
};


//Mapa bazowa
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	{
		attribution: 'Map dat &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 20,
		minZoom: 10,
	}).addTo(map);


//nowe ikonki

var redIcon = L.icon({
    iconUrl: 'images/marker4.png',
    iconSize:     [40, 45], // size of the icon
    iconAnchor:   [0, 10], // point of the icon which will correspond to marker's location
    popupAnchor:  [20, 0] // point from which the popup should open relative to the iconAnchor
});

var greenIcon = L.icon({
    iconUrl: 'images/marker6.png',
    iconSize:     [40, 45], // size of the icon
    iconAnchor:   [0, 10], // point of the icon which will correspond to marker's location
    popupAnchor:  [20, 0] // point from which the popup should open relative to the iconAnchor
});


// Punkty wycieczki i restauracje

var wycieczka = new L.LayerGroup();

			L.marker([50.4747867, 17.3347711],{icon: redIcon}).bindPopup('Katedra').addTo(wycieczka),
			L.marker([50.4766117, 17.3348457],{icon: redIcon}).bindPopup('Wieża Wrocławska').addTo(wycieczka),
			L.marker([50.4744649, 17.3307620],{icon: redIcon}).bindPopup('Wieża Ziębicka').addTo(wycieczka),
			L.marker([50.4724590, 17.3326428],{icon: redIcon}).bindPopup('Fontanna Trytona').addTo(wycieczka),
			L.marker([50.4749572, 17.3338353],{icon: redIcon}).bindPopup('Piękna Studnia').addTo(wycieczka);
			L.marker([50.4758447, 17.3313700],{icon: redIcon}).bindPopup('Bastion św. Jadwigi').addTo(wycieczka),
			L.marker([50.4732238, 17.3326845],{icon: redIcon}).bindPopup('Dom Wagi Miejskiej').addTo(wycieczka);

var jedzenie = new L.LayerGroup();

			L.marker([50.4747944, 17.3337721],{icon: greenIcon}).bindPopup('jedzenie1').addTo(jedzenie),
			L.marker([50.4756232, 17.3328467],{icon: greenIcon}).bindPopup('jedzenie2').addTo(jedzenie),
			L.marker([50.4744749, 17.3317621],{icon: greenIcon}).bindPopup('jedzenie3').addTo(jedzenie),
			L.marker([50.4744610, 17.3356427],{icon: greenIcon}).bindPopup('jedzenie4').addTo(jedzenie),
			L.marker([50.4749472, 17.3368351],{icon: greenIcon}).bindPopup('jedzenie5').addTo(jedzenie);
			L.marker([50.4728311, 17.3323709],{icon: greenIcon}).bindPopup('jedzenie6').addTo(jedzenie),
			L.marker([50.4732132, 17.3336845],{icon: greenIcon}).bindPopup('jedzenie7').addTo(jedzenie);


									
var overlays = {
			"Wycieczka": wycieczka,
			"Obiekty gastronomiczne": jedzenie,
			"Dzialki": dzialeczki,
			"Fortyfikacje": geojson
		};
			
		
L.control.layers(baseLayers, overlays).addTo(map);		
		

//Zmiana aktywnego ksztaltu

var ksztalt;

	$('.przyciski div').click(function(){
	$('.przyciski div').css ("background-color" ,"#34495E");
	$(this).css ("background-color" ,"#26C281");
	$('#map').css ("cursor" ,"crosshair");
	});
			
	$('#punkt').click(function(){
	ksztalt = "punkt";
	});

	$('#okrag').click(function(){
	if(widp == false)
		{$("#ppromien").fadeIn();
		widp = true}
	else
		{$("#ppromien").fadeOut();
		widp = false};	
	ksztalt = "okrag";
	});
	
	$('#linia').click(function(){
	ksztalt = "linia";
	});
	
	$('#poligon').click(function(){
	ksztalt = "poligon";
	});
	
	$('#zakoncz').click(function(){
	ksztalt = "brak";
	$('#map').css ("cursor" ,"-webkit-grab");
	});

	$('#dodajopis').click(function(){
	ksztalt = "dodajopis";
	if(widt == false)
		{$("#popis").fadeIn();
		widt = true}
	else
		{$("#popis").fadeOut();
		widt = false};	
	});

	
	$('#dlugosc').click(function(){
		ksztalt = "dlugosc";
	});


//Czyszczenie obiektów
//Mimo usuwania elementów listy, jej długość się nie zmienia
//Dlatego po pierwszym "usuń" cofanie się sypie ;/

var licznik = 0;

$('#cofnij').click(function() 
	{
		licznik = licznik + 1
		map.removeLayer(wszystkol[wszystkol.length - licznik]);
	})

$('#usun').click(function() 
	{
		for (var i= 0; i < wszystkol.length;i++) 
		{
		map.removeLayer(wszystkol[i]);
		}
	})


//Opcje

	$('#zoom').click(function(){
		map.setView([50.473,17.338], 13);
	});

	$('#wsp').click(function(){
		ksztalt = "wsp";
	});


//Wycieczka

var strona = 0;


	$('#start').click(function(){
	$("#start").hide();
	$(".czynnosc").hide();
	$(".przyciski").hide();
	$("#stop").show();
	przejscie();
	});

	$('#s2').click(function(){
		strona = strona +1;
		przejscie();
		});
	
	$('#s1').click(function(){
		strona = strona - 1;
		przejscie();
		});
	
	
	$('#stop').click(function(){
	map.setView([50.473,17.338], 13);
	$("#start").show();
	$(".czynnosc").show();
	$(".przyciski").show();
	$("#stop").hide();
	$("#s1").hide();
	$("#s2").hide();
	$("#bazylika").hide();$("#waga").hide();$("#wwr").hide();$("#wzi").hide();$("#tryton").hide();$("#studnia").hide();$("#bastion").hide();
	aktywne_strzalki = false;
	});


function przejscie()
{
	switch (strona)
	{
		case 0: 
			strzalki();
			$("#waga").hide();
			$("#bazylika").fadeIn();
			$("#wwr").hide();
			map.setView([50.4747867, 17.3347711], 18);
			break;
		case 1:
			$("#bazylika").hide();
			$("#wwr").fadeIn();
			$("#wzi").hide();
			strzalki()
			map.setView([50.4766117, 17.3348457], 18);
			break;
		case 2:
			$("#wwr").hide();
			$("#wzi").fadeIn();
			$("#tryton").hide();
			strzalki()
			map.setView([50.4744649, 17.3307620], 18);
			break;
		case 3:
			$("#wzi").hide();
			$("#tryton").fadeIn();
			$("#studnia").hide();
			strzalki()
			map.setView([50.4724590, 17.3326428], 18);
			break;
		case 4:
			$("#tryton").hide();
			$("#studnia").fadeIn();
			$("#bastion").hide();
			strzalki()
			map.setView([50.4749572, 17.3338353], 18);
			break;
		case 5:
			$("#studnia").hide();
			$("#bastion").fadeIn();
			$("#waga").hide();
			strzalki()
			map.setView([50.4758447, 17.3313700], 18);
			break;
		case 6:
			strzalki();
			$("#bastion").hide();
			$("#waga").fadeIn();
			$("#bazylika").hide();
			map.setView([50.4732238, 17.3326845], 18);
			break;
		}
 };


function strzalki()
	{
		if (strona == 6)
			{ $("#s2").hide();}
		
		else if (strona == 0)
			{ $("#s1").hide();
			$("#s2").show()}
		else 
			{$("#s1").show();
			$("#s2").show()};}



// ......................................... :) ................................. :) .................................. :) ...................................

gdzie_opis = [50.473,17.338];
var lista = [];
var listalinia = [];
var i = 0;
var j = 0;
wszystkol = [];
var circlel = [];
var licznik_linia = 0;
var kon = 0;
var pocz = 0;
var d = 0;
	
function onMapClick(e) {
	
	if (ksztalt == "punkt")
	{
		points = new L.Marker(e.latlng, 
			{draggable: 'true',
			clickable: 'true',
			title: "Twój punkt bez opisu",
			});
		map.addLayer(points);
		wszystkol.push(points);
	}
	
	
	if (ksztalt == "okrag")
	{
		circle = new L.circle(e.latlng, document.getElementById('promien').value, {
    	color: 'red',
    	fillColor: '#f03',
    	fillOpacity: 0.5
		});
		map.addLayer(circle);
		wszystkol.push(circle);
	}
	
	
	if (ksztalt == "linia")
	{
		listalinia[j] = e.latlng;
		j = j+1;
		circle = new L.circle(e.latlng, 4, {
    	color: 'black',
    	fillColor: 'black',
    	fillOpacity: 0.5,
    	
		});
		
		map.addLayer(circle);
		circlel.push(circle);	
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
		circlel.push(circle);
	}	
	
	
	if (ksztalt == "dodajopis")
	{
		var markeropis = document.getElementById('opis').value;
		var marker = L.marker(e.latlng,{draggable: 'true',
			clickable: 'true',title: "Twój punkt z opisem",}).addTo(map);
		marker.bindPopup(markeropis.toString()).openPopup();
		wszystkol.push(marker);
	}
	
	
	if (ksztalt == "wsp")
	{
		var popup = L.popup();
		popup.setLatLng(e.latlng);
        popup.setContent("Współrzedne w tym miejscu to: " + e.latlng.toString());
        popup.openOn(map);
		
	}
	

	if (ksztalt == "dlugosc")
		{
			if (licznik_linia == 0)
			{
					pocz = e.latlng;
					licznik_linia = licznik_linia + 1;
			}
			
			else
			{
				kon = e.latlng;
				d = pocz.distanceTo(kon);
				
				
				var prosta = 
				{
			  	"type": "LineString",
    			"coordinates": [ [pocz.lng, pocz.lat], [kon.lng, kon.lat] ]
   				};
   				liniad = L.geoJson(prosta);
   				map.addLayer(liniad);
   				alert ("Odległość wynosi " + d.toFixed(2) + " m");
   				
   				kon = 0;
				pocz = 0;
				d = 0;
				licznik_linia = 0;
				map.removeLayer(liniad);
			}
		}
	
}

map.on('click', onMapClick);



function onMapDblClick(e) 
{
	if (ksztalt == "poligon")
	{
	polygon = new L.polygon([lista]);
	map.addLayer(polygon);
	lista = [];
	i = 0;
	wszystkol.push(polygon);
	}

	if (ksztalt == "linia")
	{
	linia = new L.polyline(listalinia, {color: 'red'});
	map.addLayer(linia);
	listalinia = [];
	j = 0;
	wszystkol.push(linia);
	}
	
	for (var m= 0; m < circlel.length;m++) 
		{
		map.removeLayer(circlel[m]);
		}
}
	
map.on('dblclick', onMapDblClick);