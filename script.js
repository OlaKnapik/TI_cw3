//Inicjalizacja mapy
var map = L.map('map').setView([50.473,17.338], 14);
	
	
//Mapa bazowa
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	{
		attribution: 'Map dat &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 30,
		minZoom: 10,
	}).addTo(map);




//Dodanie punktu 

	var marker;

	$('#punkt').click(function(){
		function onMapClick(e) {
		points = new L.Marker(e.latlng, {draggable: 'true'});
		map.addLayer(points);
	};
	map.on('click', onMapClick);

	});


//Dodanie kola

	var circle;
	
	$('#okrag').click(function(){
		
		function onMapClick(e) {
		circle = new L.circle(e.latlng, 100, {
    	color: 'red',
    	fillColor: '#f03',
    	fillOpacity: 0.5
		});
		map.addLayer(circle);
		};

	map.on('click', onMapClick);

	});
	
//Dodanie poligonu
	var polygon;
	var lista = [];
	i = 0;
	
	$('#poligon').click(function(){
		
		function onMapClick(e) {
		lista[i] = e.latlng;
		i = i+1;
		
		circle = new L.circle(e.latlng, 5, {
    	color: 'red',
    	fillColor: '#f03',
    	fillOpacity: 0.5
		});
		
		map.addLayer(circle);
		
		};
		
		map.on('click', onMapClick);
		

		
		function onMapDblClick(e) {
			polygon = new L.polygon([lista]);
			map.addLayer(polygon);
		};
		
		map.on('dblclick', onMapDblClick);
	
	});
	

//Usuwanie


$('#czysc').click(function(){
	map.removeLayer(points);
	map.removeLayer(circle);
	map.removeLayer(polygon);
});
	
	
