const bcrypt = require('bcrypt')

const models = require('../models')

exports.register = async (req,res) => {
  try{
    const storeUser = await models.Users.create(req.body)
    res.json(storeUser)
  } catch{
    res.status(400).json({
      message: 'NIM is already'
    })
  }
}

exports.login = async (req,res) => {
  const showUser = await models.Users.findOne({
                      where: {
                        nim: req.body.nim
                      }
                    })
  if(showUser){
    const compare = bcrypt.compareSync(req.body.password || '', showUser.password)
    if(compare){
      res.json(showUser)
    } else{
      res.status(400).json({
        message: 'invalid Password'
      })
    }
  } else{
    res.status(400).json({
      message: 'NIM is not available'
    })
  }
}