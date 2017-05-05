const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice');

const User = db.define('user', {
// YOUR CODE HERE...
}, {
// ...AND HERE
});

module.exports = User;
