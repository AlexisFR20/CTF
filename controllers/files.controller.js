const File = require("../models/file.model");


exports.getAll = (req, res) => {
    // Aqui se coloca los metodos para la manipulacion de los
    // datos
    File.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.mesagge || "Server error getting all users"
            });
        } else {
            res.status(200).send(data);
        }
    });

};


exports.getSingle = (req, res) => {
    // Aqui se coloca los metodos para la manipulacion de los
    // datos
    console.log(req.fileName);
    console.log(!req.params.nameFile);
    if (!req.params.nameFile) {
        res.status(400).send({
            message: "Error: filename not specified"
        })
    }
    File.getSingle(req.params.nameFile, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.mesagge || "Server error getting all files"
            });
        } else {
            if (data.length) {
                // Aqui se puede inicializar validaciones o realziar operaciones
                res.status(200).send(data);
                // si encontro algo mandarlo o regresarlo
            } else {
                // si no encontro manar error 404
                res.status(404).send({
                    mesagge: "file not found"
                });
            }
        }
    });
};

exports.create =
    (req, res) => {
        console.log("USUARIO:::");
        console.log(req.body.userName);
        console.log("FILES A SUBIR");
        console.log(req.file);
        File.create(req.file, req.body.userName, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.mesagge || "server error creating user"
                });
            } else {
                res.status(200).send({
                    message: "user created succesfully",
                    fileName: data.fileName
                });
            }
        });
    };






// AL FINALIZAR EL API….
// Para subir un api creada, solo basta con copiar el archive del api creada a el servidor