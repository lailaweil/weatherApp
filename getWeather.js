const axios = require('axios');

var getWeather = (direccion) =>{
	var encodedDireccion = encodeURIComponent(direccion);
	var geocodeURL = `https://us1.locationiq.com/v1/search.php?key=0c9059d3f5a394&q=${encodedDireccion}&format=json&limit=1&language=es&addressdetails=1`;

	axios.get(geocodeURL).then((response)=>{
	
		var lat = response.data[0].lat;
		var lon = response.data[0].lon;
		var address = response.data[0].display_name;
		var weatherURL = `https://api.darksky.net/forecast/68cd64b1805e2a8df15780bf440a77f5/${lat},${lon}?exclude=minutely,hourly,daily,alerts,flags&lang=es&units=si`;
	
		console.log(address);
		return axios.get(weatherURL);

	}).then((response)=>{
	
		console.log(`Clima: ${response.data.currently.summary}`);
    	console.log(`Temperatura: ${response.data.currently.temperature}`);
    	console.log(`Sensación Térmica: ${response.data.currently.apparentTemperature}`);
	}).catch((e)=>{
		if(e.code ==='ENOTFOUND'){
			console.log('No se pudo conectar al API server.');
		}else{
			console.log('404. No se encontro la página. Ingrese una dirección válida.');
		}
	});
}
module.exports = {
	getWeather
};
