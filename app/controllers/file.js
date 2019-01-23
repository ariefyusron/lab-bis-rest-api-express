const models = require('../models')

exports.index = async (req,res) => {
  const results = await models.File.findAll({
    where: {
      class_id: req.params.idClass
    },
    order: [['updatedAt','DESC']]
  })
  res.json(results)
}

exports.store = async (req,res) => {
  const storeFile = await models.File.create({
    name: req.body.name,
    class_id: req.params.idClass
  })
  res.json(storeFile)
}

exports.update = async (req,res) => {
  await models.File.update(
    req.body,{
      where: {
        id: req.params.idFile
      }
    }
  )
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