// routes/user_dao.js

module.exports = {
	saveUser : function(db, user, callback) {
					db.collection('Users').insert(user, function(err, result) {
						 if (err) { 
					        console.error('An error has occurred saving user'); 
					        return callback(user, false);
					      } else {
					        return callback(user, true);
					      }
					});
				}				

}