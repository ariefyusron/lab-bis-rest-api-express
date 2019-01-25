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

exports.permission = async (req,res,next) => {
  const updateClass = await models.MemberClass.findOne({
    where: {
      user_id: req.userData.id,
      class_id: req.params.id,
      isDelete: 0
    }
  })
  if (updateClass){
    if(updateClass.level==='teacher'){
      next()
    } else{
      res.status(400).json({
        message: 'Error permission'
      })
    }
  } else{
    res.status(400).json({
      message: 'Class not found'
    })
  }
}

exports.delete = async (req,res,next) => {
  const deleteForeignKey = await models.MemberClass.update({
    isDelete: 1,
    deletedAt: new Date().toISOString()
  },{
    where: {
      class_id: req.params.id,
      isDelete: 0
    }
  })
  if(deleteForeignKey){
    next()
  } else{
    res.status(400).json({
      message: 'Class not found'
    }) 
  }
}