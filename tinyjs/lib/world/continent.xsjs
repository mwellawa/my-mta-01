function saveContinent(continent) {
	var conn = $.hdb.getConnection();
	var output = JSON.stringify(continent);
	var fnCreateContinent = conn.loadProcedure("tinyworld.tinydb::createContinent");
	var result = fnCreateContinent({
		IM_CONTINENT: continent.continentName
	});
	conn.commit();
	conn.close();
	if (result && result.EX_ERROR !== null) {
		return {
			body: result,
			status: $.net.http.BAD_REQUEST
		};
	} else {
		return {
			body: output,
			status: $.net.http.CREATED
		};
	}
}

var body = $.request.body.asString();
var continent = JSON.parse(body);

// validate the inputs here!
var output = saveContinent(continent);
$.response.contentType = "application/json";
$.response.setBody(output.body);
$.response.status = output.status;