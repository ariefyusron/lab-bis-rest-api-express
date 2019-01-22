'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    name: DataTypes.STRING
  }, {});
  Class.associate = function(models) {
    // associations can be defined here
  };
  return Class;
};