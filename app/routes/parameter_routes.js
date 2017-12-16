// routes/parameters_routes.js
var parameterDao  = require('../daos/parameter_dao');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

module.exports = function(app, db) {

	/*
	*	kinda routes kinda controller
	*/

    // Sends all the parameters
	app.get('/parameters', 
		(req, res) => {

	    	parameterDao.getParameters(db, function(result){
	    		res.status(200).send({ operation : 'Get Prameters', result : result });
	    		return;
	    	});
  		}
  	);
	
	// Saves a new Parameter
  	app.post('/parameters',[
  			check('page_id')
			.isAlphanumeric().withMessage('page_id must be alphanumeric'),
			check('parameter_id')
			.isEmpty().withMessage('parameter_id must not be empty')
  		],
		(req, res) => {

		   	var parameter = {
				page_id 	 	 : req.body.page_id,
				parameter_id	 : req.body.parameter_id,
				value 	 	 	 : req.body.value
			}

			parameterDao.saveParameter(db, parameter, function(parameterSaved, result){
				res.status(200).send({ operation : 'Create Parameter', result : result, item : parameterSaved });
				return;
			});
  		}
  	);
	
	// Gets a Parameter by page id and parameter id
  	app.get('/parameters/page_id/:page_id/parameter_id/:parameter_id',
		(req, res) => {

		    // There are no validation errors
		   	var parameter = {
    			page_id 	 	 : req.params.page_id,
    			parameter_id	 : req.params.parameter_id
    		}

			parameterDao.getParameterByPageId(db, parameter, function(flag, result){
				if(flag) {
    				res.status(200).send({ operation : 'Get Parameter by Page_Id', result : result });
    			}
    			else {
    				res.status(418).send({ operation : 'Get Parameter by Page_Id', errors : 'parameter ' + parameter.parameter_id + ' is not in our db'});
    			}
    		});
  		}
  	);

};