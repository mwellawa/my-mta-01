function saveContinent(continent) {
	var conn = $.hdb.getConnection();
	var output = JSON.stringify(continent);
	var fnCreateContinent = conn.loadProcedure("tinyworld.tinydb::createContinent");
	var result = fnCreateContinent({
		IM_CONTINENT: continent.name
	});
	conn.commit();
	conn.close();
	if (result && result.EX_ERROR !== null) {
		return result.EX_ERROR;
	} else {
		return output;
	}
}
var continent = {
	name: $.request.parameters.get("continent")
};
// validate the inputs here!
var output = saveContinent(continent);
$.response.contentType = "application/json";
$.response.setBody(output);