const multer = require("multer")
const mimeType = require('mime-types')

const storage = multer.diskStorage({
    destination: '/images',
    filename: function(req, file, cb) {
        cb("", Date.now() + file.originalname);
    }
})

const upload = multer({ storage: storage })


module.exports = upload