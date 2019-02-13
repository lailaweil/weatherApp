const fs = require('fs');

var fetchDefault = () =>{
    try {
		var def = fs.readFileSync('userdata.json'); 
		return JSON.parse(def);
	} catch (e){
		return [];
	}
};

var saveDefault = (def) => {
	fs.writeFileSync('userdata.json', JSON.stringify(def));
};

var getDefault = ()=>{
	var def = fetchDefault();
	return def;
}

var writeDefault = (def)=>{
	saveDefault(def);
}

module.exports = {
	getDefault,
	writeDefault
}