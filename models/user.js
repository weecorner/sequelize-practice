const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice', { logging: false });

const User = db.define('user', {
// YOUR CODE HERE...
	first: {
		type: Sequelize.STRING,
		// allowNull: false

	},
	last: {
		type: Sequelize.STRING,
		// allowNull: false
	},
	age: {
		type: Sequelize.INTEGER,
		validate: {
			min: 18
		}
		
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		isEmail: true
	},
	bio: {
		type: Sequelize.TEXT
	}
}, {
// ...AND HERE
	getterMethods: {
		fullName: function(){
			return `${this.first} ${this.last}`;
		}
	},
	// instanceMethods: {
	// 	haveBirthday: function(){
	// 		return this.update({
	// 			age: this.age + 1
	// 		})
	// 		.catch()
	// 	}
	// }
	instanceMethods: {
		haveBirthday: function(){
			return this.update({
				age: this.age + 1
			})
			.catch()
		}
	}

});

module.exports = User;
