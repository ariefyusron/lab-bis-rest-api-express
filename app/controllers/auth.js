const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const models = require('../models')
const secretKey = process.env.JWT_SECRET

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
      const token = jwt.sign({showUser},secretKey)
      const result = showUser
      res.json({result,token})
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