// routes/parameter_dao.js

module.exports = {
	saveParameter
	 : function(db, parameter, callback) {
		db.collection('Parameters').insert(parameter, function(err, result) {
			 if (err) { 
		        console.error('An error has occurred saving parameter'); 
		        return callback(parameter, false);
		      } else {
		        return callback(parameter, true);
		      }
		});
	},

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

	getParameterByPageId
	: function(db, partialParameter, callback) {
		db.collection('Parameters').findOne({page_id : partialParameter.page_id, parameter_id : partialParameter.parameter_id}, function(err, result){
			if(err) {
				console.error('An error has occurred getting parameter by page_id and parameter_id'); 
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