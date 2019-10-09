const Sequelize = require('sequelize');
const mysqlConnection = require('C:/Users/atexeira/Documents/Node/login_express/src/config/database.js');
//const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt-nodejs');


const User = mysqlConnection.define('users', {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      defaultValue: "ateixeira@cimapm.com"
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },

  {
    timestamps: false,

  },
  /*
  {
    hooks: {
      beforeCreate: (users) => {
        const salt = bcrypt.genSaltSync();
        users.password = bcrypt.hashSync(users.password, salt);
      }
    }
  },
*/
);

User.prototype.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

mysqlConnection.sync()
  .then(() => console.log('La tabla users se ha creado correctamente si no existe'))
  .catch(error => console.log('Ha ocurrido un error', error));

module.exports = User;
