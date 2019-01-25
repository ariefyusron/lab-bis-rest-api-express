'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    name: DataTypes.STRING,
    isDelete: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {});
  Class.associate = function(models) {
    // associations can be defined here
    Class.hasMany(models.MemberClass, {
      foreignKey: 'class_id'
    })
  };
  return Class;
};