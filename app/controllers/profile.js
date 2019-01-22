const models = require('../models')

exports.update = async (req,res) => {
  await models.ProfileUser.update(
    req.body,{
      where: {
        id: req.params.id
      }
    }
  )
  const updateProfile = await models.ProfileUser.findOne({
    where: {
      user_id: req.params.id
    }
  })
  res.json(updateProfile)
}