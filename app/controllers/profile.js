const models = require('../models')
const host = process.env.HOST

exports.show = async (req,res) => {
  const showUser = await models.ProfileUser.findOne({
    where: {
      user_id: req.userData.id
    }
  })
  showUser.img_url = host+showUser.img_url
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
  updateProfile.img_url = host+updateProfile.img_url
  res.json(updateProfile)
}

exports.updateImg = async (req,res) => {
  await models.ProfileUser.update({
    img_url: req.file.path
  },{
    where: {
      id: req.userData.id
    }
  })
  const updateProfile = await models.ProfileUser.findOne({
    where: {
      user_id: req.userData.id
    }
  })
  updateProfile.img_url = host+updateProfile.img_url
  res.json(updateProfile)
}