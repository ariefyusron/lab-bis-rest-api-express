const bcrypt = require('bcrypt')
const saltRounds = 10

exports.register = (req,res,next) => {
  req.check('nim','NIM length is 12').not().isEmpty().isLength({min:12,max:12})
  
  const error = req.validationErrors()
  if(error){
    res.status(400).json({
      message: error[0].msg
    })
  } else{
    req.body.password = bcrypt.hashSync(req.body.nim, saltRounds)
    next()
  }
}