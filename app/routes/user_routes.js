// routes/user_routes.js
var userDao  = require('../daos/user_dao');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

module.exports = function(app, db) {

	app.get('/users', 
		(req, res) => {
	    	// Sends all the users
	    	userDao.getUsers(db, function(result){
	    		res.status(200).send({users : result});
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
    				res.status(200).send({ operation : 'Get User', result : result });
    			}
    			else {
    				res.status(418).send({ operation : 'Get User', errors : 'username is not in our db'});
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
	    			username : req.body.username,
	    			password : req.body.password,
	    			email 	 : req.body.email
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