const models = require('../models')

exports.memberValidation = async (req,res,next) => {
  const members = await models.MemberClass.findOne({
    where: {
      class_id: req.params.idClass,
      user_id: req.userData.id,
      isDelete: 0
    }
  })
  if(members){
    req.level = members.level
    next()
  } else{
    res.status(400).json({
      message: 'Class not found'
    })
  }
}

exports.permission = (req,res,next) => {
  if(req.level==='teacher'){
    next()
  } else{
    res.status(400).json({
      message: 'Error permission'
    })
  }
}

exports.delete = async (req,res,next) => {
  const checkFile = await models.File.findOne({
    where: {
      id: req.params.idFile,
      isDelete: 0
    }
  })
  if(checkFile){
    next()
  }else{
    res.status(400).json({
      message: 'File not found'
    })
  }
}