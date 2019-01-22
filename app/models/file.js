'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    modul_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  File.associate = function(models) {
    // associations can be defined here
    File.belongsTo(models.Modul, {
      foreignKey: 'modul_id'
    })
  };
  return File;
};