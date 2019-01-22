const models = require('../models')

exports.register = async (req,res) => {
  try{
    const storeUser = await models.Users.create(req.body)
    res.json(storeUser)
  } catch(error){
    res.status(400).json({
      message: 'NIM is already'
    })
  }
}