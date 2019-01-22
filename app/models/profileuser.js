'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProfileUser = sequelize.define('ProfileUser', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    prodi: DataTypes.STRING,
    tahunAngkatan: DataTypes.STRING
  }, {});
  ProfileUser.associate = function(models) {
    // associations can be defined here
    ProfileUser.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
  };
  return ProfileUser;
};