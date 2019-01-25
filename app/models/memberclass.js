'use strict';
module.exports = (sequelize, DataTypes) => {
  const MemberClass = sequelize.define('MemberClass', {
    user_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER,
    level: DataTypes.ENUM('teacher','student'),
    isDelete: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {});
  MemberClass.associate = function(models) {
    // associations can be defined here
    MemberClass.belongsTo(models.Users, {
      foreignKey: 'user_id'
    })

    MemberClass.belongsTo(models.Class, {
      foreignKey: 'class_id'
    })
  };
  return MemberClass;
};