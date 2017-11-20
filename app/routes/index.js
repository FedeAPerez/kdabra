// routes/index.js
const userRoutes = require('./user_routes');
const parameterRoutes = require('./parameter_routes');
module.exports = function(app, db) {
  userRoutes(app, db);
  parameterRoutes(app, db);
};