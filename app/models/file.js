'use strict';
module.exports = (sequelize, DataTypes) => {
  const Modul = sequelize.define('File', {
    class_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    file_url: DataTypes.TEXT
  }, {});
  Modul.associate = function(models) {
    // associations can be defined here
    Modul.belongsTo(models.Class, {
      foreignKey: 'class_id'
    })
    Modul.belongsTo(models.Users, {
      foreignKey: 'user_id'
    })
  };
  return Modul;
};