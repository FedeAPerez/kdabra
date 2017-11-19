// routes/user_routes.js
var userDao  = require('../daos/user_dao');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

module.exports = function(app, db) {

	app.get('/users', (req, res) => {
    	// Sends all the users
    	userDao.getUsers(db, function(result){
    		res.status(200).send({users : result});
    		return;
    	});
  	});

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
			    // Render the form using error information
			    res.status(422).send({ operation: 'Create User', errors: errors.mapped() });
	    		return;
	    		
			}
			else {
			    // There are no errors so perform action with valid data (e.g. save record).
			   	var user = {
	    			username : req.body.username,
	    			password : req.body.password,
	    			email 	 : req.body.email
	    		}
		       	userDao.saveUser(db, user, function(userSaved, result){
		    		res.status(200).send({result : result, item : userSaved});
		    		return;
		    	});
			}
  		});
};