const models = require('../models')

exports.index = async (req,res) => {
  const results = await models.Modul.findAll({
    where: {
      class_id: req.params.idClass
    }
  })
  res.json(results)
}

exports.store = async (req,res) => {
  const storeModul = await models.Modul.create({
    name: req.body.name,
    class_id: req.params.idClass
  })
  res.json(storeModul)
}

exports.update = async (req,res) => {
  
}

exports.delete = async (req,res) => {
  
}