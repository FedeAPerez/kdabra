// routes/user_routes.js
var userDao  = require('../daos/user_dao');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

module.exports = function(app, db) {
	/*
	*	kinda routes kinda controller
	*/
	app.get('/users', 
		(req, res) => {
	    	// Sends all the users
	    	userDao.getUsers(db, function(result){
	    		res.status(200).send({ operation : 'Users Get All OK', result : result });
	    		return;
	    	});
  		}
  	);

	app.get('/users/username/:username', [
			check('username')
			.isAlphanumeric().withMessage('username must be alphanumeric')
		],
		(req, res) => {
	    	// Sends user by username

	    	var errors = validationResult(req);

	    	if (!errors.isEmpty()) {
			    res.status(422).send({ operation: 'Users Get by Username Errors', errors: errors.mapped() });
	    		return;
	    		
			}
			else {
		    	userDao.getUserByUsername(db, req.params.username, function(flag, result){
	    			if(flag) {
	    				res.status(200).send({ operation : 'Users Get by Username OK', result : result });
	    			}
	    			else {
	    				res.status(418).send({ operation : 'Users Get by Username Fail', errors : 'username is not in our db'});
	    			}
		    	});
		    }
  		}
  	);

	app.get('/users/page_id/:page_id', [
			check('page_id')
			.isNumeric().withMessage('page_id must be numeric')
		],
		(req, res) => {
	    	// Sends user by page_id

	    	var errors = validationResult(req);

	    	if (!errors.isEmpty()) {
			    res.status(422).send({ operation: 'Users Get by Page_Id Errors', errors: errors.mapped() });
	    		return;
	    		
			}
			else {
		    	userDao.getUserByPageId(db, req.params.page_id, function(flag, result){
	    			if(flag) {
	    				res.status(200).send({ operation : 'Users Get by Page_Id OK', result : result });
	    			}
	    			else {
	    				res.status(418).send({ operation : 'Users Get by Page_Id Fail', errors : 'page_id is not in our db'});
	    			}
		    	});
		    }
  		}
  	);

	app.post('/users', [
			check('username')
	    	.isAlphanumeric().withMessage('username must be alphanumeric'),
	    	check('email')
	    	.isEmail().withMessage('email must be a valid email address')
		],

		(req, res) => {
	    	// Saves a new user

	    	var errors = validationResult(req);

			if (!errors.isEmpty()) {
			    res.status(422).send({ operation: 'Users Create Errors', errors: errors.mapped() });
	    		return;
	    		
			}
			else {
			    // There are no validation errors
			   	var user = {
	    			username 	 	 : req.body.username,
	    			password 	 	 : req.body.password,
	    			email 	 	 	 : req.body.email,
	    			app_secret 	 	 : req.body.app_secret,
	    			access_token 	 : req.body.access_token,
	    			validation_token : req.body.validation_token,
	    			page_id			 : req.body.page_id
	    		}
	    		userDao.getUserByUsername(db, user.username, function(flag, resultFind){
	    			if(!flag) {
	    				userDao.saveUser(db, user, function(userSaved, result){
			    			res.status(200).send( {operation : 'Users Create Fail', result : result, item : userSaved});
			    			return;
			    		});
	    			}
	    			else {
	    				res.status(418).send({ operation : 'Users Create Fail', errors : 'username is not available'});
	    			}

	    		});

			}
  		}
  	);
};