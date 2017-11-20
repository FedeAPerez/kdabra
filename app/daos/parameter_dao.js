// routes/parameter_dao.js

module.exports = {
	getParameters 
	: function(db, callback) {
		db.collection('Parameters').find().toArray(function(err, result) {
			 if (err) { 
		        console.error('An error has occurred getting parameters'); 
		        return callback(false);
		      } else {
		        return callback(result);
		      }
		});
	},				

}