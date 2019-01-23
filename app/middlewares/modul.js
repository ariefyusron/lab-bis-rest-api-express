const models = require('../models')

exports.store = (req,res,next) => {
  req.check('name','name is required').not().isEmpty()
  
  const error = req.validationErrors()
  if(error){
    res.status(400).json({
      message: error[0].msg
    })
  } else{
    next()
  }
}

exports.memberValidation = async (req,res,next) => {
  const members = await models.MemberClass.findOne({
    where: {
      class_id: req.params.idClass,
      user_id: req.userData.id
    }
  })
  if(members){
    req.level = members.level
    next()
  } else{
    res.status(400).json({
      message: 'Your not member of class'
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
  const checkModul = await models.Modul.findOne({
    where: {
      id: req.params.idModul
    }
  })
  if(checkModul){
    await models.File.destroy({
      where: {
        modul_id: req.params.idModul
      }
    })
    next()
  }else{
    res.status(400).json({
      message: 'Modul invalid'
    })
  }
}