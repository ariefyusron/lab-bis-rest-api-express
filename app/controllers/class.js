const models = require('../models')

exports.index = async (req,res) => {
  const results = await models.Class.findAll({
    where: {
      isDelete: 0
    },
    order: [['id','DESC']],
    include: {
      model: models.MemberClass,
      where: {
        user_id: req.userData.id,
        isDelete: 0
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
  await models.Class.update({
    name: req.body.name
  },{
      where: {
        id: req.params.id,
        isDelete: 0
      }
    }
  )
  const updateClass = await models.Class.findOne({
    where: {
      id: req.params.id,
      isDelete: 0
    }
  })
  res.json(updateClass)
}

exports.delete = async (req,res) => {
  await models.Class.update({
    isDelete: 1,
    deletedAt: new Date().toISOString()
  },{
    where: {
      id: req.params.id,
      isDelete: 0
    }
  })
  res.json({
    message: 'Class successfully deleted'
  })
}