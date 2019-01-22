const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET

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

exports.checkAuth = (req,res,next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token,secret_key)
    req.userData = decoded.showUser
    next()
  } catch(error){
    res.status(400).json({message: 'Auth failed'})
  }
}