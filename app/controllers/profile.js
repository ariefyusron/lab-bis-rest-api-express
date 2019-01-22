const models = require('../models')

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