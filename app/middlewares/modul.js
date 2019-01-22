const models = require('../models')

exports.memberValidation = async (req,res,next) => {
  const members = await models.MemberClass.findOne({
    where: {
      class_id: req.params.idClass,
      user_id: req.userData.id
    }
  })
  if(members){
    next()
  } else{
    res.status(400).json({
      message: 'Your not member of class'
    })
  }
}