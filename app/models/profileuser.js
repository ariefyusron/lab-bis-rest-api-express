'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProfileUser = sequelize.define('ProfileUser', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    prodi: DataTypes.STRING,
    tahunAngkatan: DataTypes.STRING,
    img_url: DataTypes.TEXT
  }, {});
  ProfileUser.associate = function(models) {
    // associations can be defined here
    ProfileUser.belongsTo(models.Users, {
      foreignKey: 'user_id'
    })
  };
  return ProfileUser;
};