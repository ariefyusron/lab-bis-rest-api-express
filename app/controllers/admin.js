const models = require('../models')

exports.index = async (req,res) => {
  const results = await models.Users.findAll({
    order: [['id','DESC']],
    include: {
      model: models.ProfileUser
    }
  })
  res.json(results)
}