const axios = require('axios')

const models = require('../models')
const urlLog = process.env.URL_LOG

exports.index = async (req,res) => {
  axios.post(urlLog,{
        nim: req.userData.nim,
        action: 'Open list class'
  })
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
  axios.post(urlLog,{
        nim: req.userData.nim,
        action: 'Create class '+req.body.name
  })
  const storeClass = await models.Class.create(req.body)
  await models.MemberClass.create({
    user_id: req.userData.id,
    class_id: storeClass.id,
    level: 'teacher'
  })
  res.json(storeClass)
}

exports.update = async (req,res) => {
  const updateBefore = await models.Class.findOne({
    where: {
      id: req.params.id,
      isDelete: 0
    }
  })
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
  axios.post(urlLog,{
        nim: req.userData.nim,
        action: 'Update class name '+updateBefore.name+' to '+updateClass.name
  })
  res.json(updateClass)
}

exports.delete = async (req,res) => {
  const deleteClass = await models.Class.findOne({
    where: {
      id: req.params.id,
      isDelete: 0
    }
  })
  axios.post(urlLog,{
        nim: req.userData.nim,
        action: 'Delete class '+deleteClass.name
  })
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