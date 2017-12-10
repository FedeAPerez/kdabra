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

  	app.post('/parameters', [
			check('page_id')
	    	.isNumeric().withMessage('page_id must be numeric'),
	    	check('value')
	    	.isAlphanumeric().withMessage('value must be alphanumeric')
		],

		(req, res) => {
	    	// Saves a new Parameter

	    	var errors = validationResult(req);

			if (!errors.isEmpty()) {
			    res.status(422).send({ operation: 'Create Parameter', errors: errors.mapped() });
	    		return;
	    		
			}
			else {
			    // There are no validation errors
			   	var parameter = {
	    			page_id 	 	 : req.body.page_id,
	    			parameter_id	 : req.body.parameter_id,
	    			value 	 	 	 : req.body.value
	    		}

				parameterDao.saveUser(db, parameter, function(parameterSaved, result){
	    			res.status(200).send( {operation : 'Create Parameter', result : result, item : parameterSaved});
	    			return;
	    		});

			}
  		}
  	);

};