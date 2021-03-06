// routes/user_dao.js

module.exports = {
	saveUser
	 : function(db, user, callback) {
		db.collection('Users').insert(user, function(err, result) {
			 if (err) { 
		        console.error('An error has occurred saving user'); 
		        return callback(user, false);
		      } else {
		        return callback(user, true);
		      }
		});
	},

	getUsers 
	: function(db, callback) {
		db.collection('Users').find().toArray(function(err, result) {
			 if (err) { 
		        console.error('An error has occurred getting user'); 
		        return callback(false);
		      } else {
		        return callback(result);
		      }
		});
	},

	getUserByUsername
	: function(db, username, callback) {
		db.collection('Users').findOne({username : username}, function(err, result){
			if(err) {
				console.error('An error has occurred getting user by username'); 
			} else {
				if(result)
				{
					return callback(true, result);
				}
				else {
					return callback(false, result);
				}
			}
		});
	},

	getUserByPageId					
	: function(db, page_id, callback) {
		db.collection('Users').findOne({page_id : page_id}, function(err, result){
			if(err) {
				console.error('An error has occurred getting user by page_id'); 
			} else {
				if(result)
				{
					return callback(true, result);
				}
				else {
					return callback(false, result);
				}
			}
		});
	},
}