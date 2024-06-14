
const multer = require('multer')
const crypto = require('crypto')

function generateUID() {
  return crypto.randomBytes(5).toString('hex');
}


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./bucket")
  },
  filename: function (req, file, cb) {

    return cb(null, `${generateUID()}_${file.originalname}`)
  }
})

const upload = multer({storage})



module.exports = upload;



// app.use(
//   '/:s',

// ) 
