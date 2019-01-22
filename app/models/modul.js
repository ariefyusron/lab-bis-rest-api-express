'use strict';
module.exports = (sequelize, DataTypes) => {
  const Modul = sequelize.define('Modul', {
    class_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  Modul.associate = function(models) {
    // associations can be defined here
    Modul.belongsTo(models.Class, {
      foreignKey: 'class_id'
    })
  };
  return Modul;
};