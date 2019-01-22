const models = require('../models')

exports.register = async (req,res) => {
  try{
    const storeUser = await models.User.create(req.body)
    res.json(storeUser)
  } catch(erorr){
    res.status(400).json({
      message: 'NIM is already'
    })
  }
}