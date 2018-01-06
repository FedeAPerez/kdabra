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
	    		res.status(200).send({ operation : 'Prameters Get All OK', result : result });
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
			switch(req.body.type)
			{
				case "number":
					var parameter = {
						page_id 	 	 : req.body.page_id,
						parameter_id	 : req.body.parameter_id,
						value 	 	 	 : req.body.value,
						type			 : req.body.type,
						number			 : req.body.number
					}
				;break;
				default:
					var parameter = {
						page_id 	 	 : req.body.page_id,
						parameter_id	 : req.body.parameter_id,
						value 	 	 	 : req.body.value,
						type			 : req.body.type
					}
				;break;
			}


			parameterDao.saveParameter(db, parameter, function(parameterSaved, result){
				res.status(200).send({ operation : 'Parameters Create OK', result : result, item : parameterSaved });
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

			parameterDao.getParameterByPageIdAndParameterId(db, parameter, function(flag, result){
				if(flag) {
    				res.status(200).send({ operation : 'Parameters Get by Page_Id OK', result : result });
    			}
    			else {
    				parameterDao.getDefaultParameter(db, parameter, function(flag, result){
    					if(flag) {
		    				res.status(200).send({ operation : 'Parameters Get by Parameter_Id OK', result : result });
		    			}
		    			else {
		    				res.status(418).send({ operation : 'Parameters Get by Page_Id Fail', errors : 'parameter ' + parameter.parameter_id + ' is not in our db'});
		    			}
    				});
    			}
    		});
  		}
  	);

  	// Gets all the parameters by page id
	app.get('/parameters/page_id/:page_id/', 
		(req, res) => {

			// There are no validation errors
		   	var parameter = {
    			page_id 	 	 : req.params.page_id
    		}

	    	parameterDao.getParameterByPageId(db, function(result){
	    		res.status(200).send({ operation : 'Prameters Get All OK', result : result });
	    		return;
	    	});
  		}
  	);

};