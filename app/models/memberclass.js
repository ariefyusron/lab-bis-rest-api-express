'use strict';
module.exports = (sequelize, DataTypes) => {
  const MemberClass = sequelize.define('MemberClass', {
    user_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER
  }, {});
  MemberClass.associate = function(models) {
    // associations can be defined here
    MemberClass.belongsTo(models.User, {
      foreignKey: 'user_id'
    })

    MemberClass.belongsTo(models.class, {
      foreignKey: 'class_id'
    })
  };
  return MemberClass;
};