// routes/user_routes.js
var userDao  = require('../daos/user_dao');

module.exports = function(app, db) {

	app.get('/users', (req, res) => {
    	// Sends all the users
    	res.send('Users son')
  	});

	app.post('/users', (req, res) => {
    	// Saves a new user
    	req.checkBody('username', 'username required').isAlpha();
		req.checkBody('password', 'password must be between 5 and 18 chars.').isLength({ min: 5, max: 18 })

	    //Trim and escape the name field. 
	    req.sanitize('password').escape();
	    req.sanitize('password').trim();

    	var errors = req.validationErrors();
    	var user = {
    		username : req.body.username,
    		password : req.body.password
    	}
		if (errors) {
		    // Render the form using error information
		    res.send({operation: 'Create User', errors: errors});
    		return;
    		
		}
		else {
		   // There are no errors so perform action with valid data (e.g. save record).
	       	userDao.saveUser(db, user, function(userSaved, result){
	    		res.send({result : result, item : userSaved});
	    		return;
	    	});
		}


  	});
};