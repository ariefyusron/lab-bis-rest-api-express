const models = require('../models')

exports.index = async (req,res) => {
  const results = await models.File.findAll({
    where: {
      class_id: req.params.idClass
    },
    order: [['updatedAt','DESC']],
    include: {
      model: models.Users,
      include: models.ProfileUser
    }
  })
  res.json(results)
}

exports.store = async (req,res) => {
  const storeFile = await models.File.create({
    name: req.file.originalname,
    class_id: req.params.idClass,
    user_id: req.userData.id,
    file_url: req.file.path
  })
  res.json(storeFile)
}

exports.update = async (req,res) => {
  await models.File.update({
    name: req.body.name
  },{
    where: {
      id: req.params.idFile
    }
  })
  const updateFile = await models.File.findOne({
    where: {
      id: req.params.idFile
    }
  })
  res.json(updateFile)
}

exports.delete = async (req,res) => {
  await models.File.destroy({
    where: {
      id: req.params.idFile
    }
  })
  res.json({
    message: 'File successfully deleted'
  })
}