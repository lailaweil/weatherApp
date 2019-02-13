const yargs = require('yargs');
const weather = require('./getWeather.js');
const userdata = require ('./default-address.js')

const argv = yargs
	.options({
		direccion: {
			demand: false,
			describe: 'IP para buscar el clima',
			string:true
		},
		default: {
			alias: 'f',
			describe: 'Dirección que busca por default',
			string: true
		}
	})
	.command('otra', 'Busca otra dirrección que no es la default.',{
		direccion:{
			demand:true,
			alias: 'd',
		}
	})
	.help()
	.alias('help','h')
	.argv;	

var command = argv._[0];

if(command == 'otra'){
	weather.getWeather(argv.direccion);
}
else if(argv.default){
	userdata.writeDefault(argv.default);
	weather.getWeather(argv.default);
}else{
	var direccion = userdata.getDefault();
	if(direccion.length !== 0){
		weather.getWeather(direccion);
	}else{
		console.log('Error. Especifique una dirección con el comando -d ó guarde un default con el comando -f.');
	}
}