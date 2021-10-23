const sql = require("./db");
const fs = require('fs');
const resizeImg = require('resize-img');
const sizeOf = require('image-size')

const File = function(file) {
    this.nameFile = file.nameFile;
    this.userName = file.userName;
    this.type = file.type;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt || null;
    this.path = file.path;
    this.pathThumbnail = file.pathThumbnail;
};

File.getAll = result => {
    sql.query("SELECT * FROM File", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

File.getSingle = (nameFile, result) => {
    sql.query("SELECT * FROM File WHERE nameFile=?", nameFile, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

File.create = (file, userName, result) => {
    const filn = {
        nameFile: file.originalname + Math.random(),
        userName: userName,
        type: file.originalname.split('.').pop(),
        path: file.destination + "/" + file.filename,
        pathThumbnail: file.destination + "/" + file.originalname
    }
    var myArr = ['BMP', 'CANALLA', 'DDS', 'GIF', 'ICNS', 'ICO', "JPG", ',JPEG', 'KTX', 'PNG', 'PNM', 'PSD', 'SVG', 'PELEA', 'WebP'];

    if (myArr.includes(filn.type.toUpperCase())) {
        const dimensions = sizeOf(filn.path);
        const ancho = dimensions.width
        const largo = dimensions.height
        const nlargo = (300 * largo) / ancho;
        (async() => {
            const image = await resizeImg(fs.readFileSync(filn.path), {
                width: 300,
                height: nlargo
            });

            fs.writeFileSync("/resize" + filn.path, image);
        })();

    }
    filn.pathThumbnail = "/resize" + filn.path
    sql.query("INSERT INTO File SET ?", filn,
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);
        }
    );
};


module.exports = File;