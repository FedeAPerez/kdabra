// routes/parameters_routes.js
var parameterDao  = require('../daos/parameter_dao');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

module.exports = function(app, db) {
	/*
	*	kinda routes kinda controller
	*/
	app.get('/parameters', 
		(req, res) => {
	    	// Sends all the parameters
	    	parameterDao.getParameters(db, function(result){
	    		res.status(200).send({ operation : 'Get Prameters', result : result });
	    		return;
	    	});
  		}
  	);

};