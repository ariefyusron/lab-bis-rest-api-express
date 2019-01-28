const adminKey = process.env.ADMIN_KEY

exports.key = (req,res,next) => {
  const key = req.query.key
  if(key===adminKey){
    next()
  } else{
    res.status(400).json({
      message: 'Error permission'
    })
  }
}