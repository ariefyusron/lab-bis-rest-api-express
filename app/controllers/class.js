const models = require('../models')

exports.index = async (req,res) => {
  const results = await models.Class.findAll({
    include: {
      model: models.MemberClass,
      where: {
        user_id: req.userData.id
      }
    }
  })
  res.json(results)
}

exports.store = async (req,res) => {
  const storeClass = await models.Class.create(req.body)
  await models.MemberClass.create({
    user_id: req.userData.id,
    class_id: storeClass.id,
    level: 'teacher'
  })
  res.json(storeClass)
}

exports.update = async (req,res) => {
  await models.Class.update(
    req.body,{
      where: {
        id: req.params.id
      }
    }
  )
  const updateClass = await models.Class.findOne({
    where: {
      id: req.params.id
    }
  })
  res.json(updateClass)
}

exports.delete = async (req,res) => {
  await models.Class.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json({
    message: 'Class successfully deleted'
  })
}