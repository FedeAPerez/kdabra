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
	    		res.status(200).send({ operation : 'Get Users', result : result });
	    		return;
	    	});
  		}
  	);

	app.get('/users/:username', [
			check('username')
			.isAlphanumeric().withMessage('username must be alphanumeric')
		],
		(req, res) => {
	    	// Sends user by username
	    	userDao.getUserByUsername(db, req.params.username, function(flag, result){
    			if(flag) {
    				res.status(200).send({ operation : 'Get User by username', result : result });
    			}
    			else {
    				res.status(418).send({ operation : 'Get User by username', errors : 'username is not in our db'});
    			}
	    	});
  		}
  	);

	app.get('/users/pageid/:page_id', [
			check('page_id')
			.isAlphanumeric().withMessage('page_id must be alphanumeric')
		],
		(req, res) => {
	    	// Sends user by username
	    	userDao.getUserByPageId(db, req.params.page_id, function(flag, result){
    			if(flag) {
    				res.status(200).send({ operation : 'Get User by page_id', result : result });
    			}
    			else {
    				res.status(418).send({ operation : 'Get User by page_id', errors : 'page_id is not in our db'});
    			}
	    	});
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
			    res.status(422).send({ operation: 'Create User', errors: errors.mapped() });
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
	    			validation_token : req.body.validation_token
	    		}
	    		userDao.getUserByUsername(db, user.username, function(flag, resultFind){
	    			if(!flag) {
	    				userDao.saveUser(db, user, function(userSaved, result){
			    			res.status(200).send( {operation : 'Create User', result : result, item : userSaved});
			    			return;
			    		});
	    			}
	    			else {
	    				res.status(418).send({ operation : 'Create User', errors : 'username is not available'});
	    			}

	    		});

			}
  		}
  	);
};