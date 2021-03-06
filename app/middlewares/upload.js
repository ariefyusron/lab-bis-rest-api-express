const multer = require('multer')

const storageProfileImg = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, './uploads/profile-img/')
  },
  filename: (req,file,cb) => {
    cb(null, new Date().toISOString()+'-'+req.userData.nim+'-'+file.originalname.replace(/\s/g,''))
  }
})

const fileFilterProfileImg = (req,file,cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

exports.uploadProfileImg = multer({
  storage: storageProfileImg,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilterProfileImg
})


const storageDocument = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, './uploads/documents/')
  },
  filename: (req,file,cb) => {
    cb(null, new Date().toISOString()+'-'+req.userData.nim+'-'+file.originalname.replace(/\s/g,''))
  }
})

exports.uploadDocument = multer({
  storage: storageDocument
});