var multer = require("multer");
const { uuid } = require('uuidv4');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'poster') {
      cb(null, path.join(__dirname, '../public/images'));
    } else if (file.fieldname === 'video') {
      cb(null, path.join(__dirname, '../public/videos'));
    }
  },
  filename: (req, file, path)=> {
    var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    var myfile = uuid() + ext;
    path(null, myfile);
  },
});

const upload = multer({ storage });

module.exports = upload;

