const models = require('../models')

exports.show = async (req,res) => {
  const showUser = await models.ProfileUser.findOne({
    where: {
      user_id: req.userData.id
    }
  })
  res.json(showUser)
}

exports.update = async (req,res) => {
  await models.ProfileUser.update(
    req.body,{
      where: {
        id: req.userData.id
      }
    }
  )
  const updateProfile = await models.ProfileUser.findOne({
    where: {
      user_id: req.userData.id
    }
  })
  res.json(updateProfile)
}