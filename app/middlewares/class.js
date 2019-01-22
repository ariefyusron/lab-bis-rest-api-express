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
      class_id: req.params.id
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
      message: 'Your not member of class'
    })
  }
}

exports.delete = async (req,res,next) => {
  const deleteForeignKey = await models.MemberClass.destroy({
    where: {
      class_id: req.params.id
    }
  })
  if(deleteForeignKey){
    next()
  } else{
    res.status(400).json({
      message: 'Class invalid'
    }) 
  }
}