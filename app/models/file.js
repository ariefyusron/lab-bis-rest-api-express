'use strict';
module.exports = (sequelize, DataTypes) => {
  const Modul = sequelize.define('File', {
    class_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    isDelete: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
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