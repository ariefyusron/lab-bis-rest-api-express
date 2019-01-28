const axios = require('axios')

const models = require('../models')
const host = process.env.HOST
const urlLog = process.env.URL_LOG

exports.index = async (req,res) => {
  axios.post(urlLog,{
    nim: req.userData.nim,
    action: 'Open class '+req.body.className
  })
  const results = await models.File.findAll({
    where: {
      class_id: req.params.idClass,
      isDelete: 0
    },
    order: [['updatedAt','DESC']],
    include: {
      model: models.Users,
      include: models.ProfileUser
    }
  })
  for(i in results) {
    results[i].file_url = host+results[i].file_url
  }
  res.json(results)
}

exports.store = async (req,res) => {
  axios.post(urlLog,{
    nim: req.userData.nim,
    action: 'Upload file '+req.file.originalname+' in class '+req.body.className
  })
  const storeFile = await models.File.create({
    name: req.file.originalname,
    class_id: req.params.idClass,
    user_id: req.userData.id,
    file_url: req.file.path
  })
  storeFile.file_url = host+storeFile.file_url
  res.json(storeFile)
}

exports.update = async (req,res) => {
  try{
    const updateBefore = await models.File.findOne({
      where: {
        id: req.params.idFile,
        isDelete: 0
      }
    })
    await models.File.update({
      name: req.body.name
    },{
      where: {
        id: req.params.idFile,
        isDelete: 0
      }
    })
    const updateFile = await models.File.findOne({
      where: {
        id: req.params.idFile,
        isDelete: 0
      }
    })
    axios.post(urlLog,{
      nim: req.userData.nim,
      action: 'Rename file '+updateBefore.name+' to '+updateFile.name+' in class '+req.body.className
    })
    updateFile.file_url = host+updateFile.file_url
    res.json(updateFile)
  } catch{
    res.status(400).json({
      message: 'File not found'
    })
  }
}

exports.delete = async (req,res) => {
  const deleteFile = await models.File.findOne({
    where: {
      id: req.params.idFile,
      isDelete: 0
    }
  })
  await models.File.update({
    isDelete: 1,
    deletedAt: new Date().toISOString()
  },{
    where: {
      id: req.params.idFile
    }
  })
  axios.post(urlLog,{
    nim: req.userData.nim,
    action: 'Delete file '+deleteFile.name+' in class '+req.body.className
  })
  res.json({
    message: 'File successfully deleted'
  })
}