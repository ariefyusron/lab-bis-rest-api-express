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