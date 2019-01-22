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