const User = require("../models/user.model");


exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.mesagge || "Server error getting all users"
            });
        } else {
            console.log("Hubo conexion");
            res.status(200).send(data);
        }
    });
};

exports.getSingle = (req, res) => {
    if (!req.body.userName) {
        res.status(400).send({
            message: "Error: user id not specified"
        })
    }
    User.getSingle(req.body.userName, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.mesagge || "Server error getting all users"
            });
        } else {
            if (data.length) {
                res.status(200).send(data);
            } else {
                res.status(404).send({
                    mesagge: "user not found"
                });
            }
        }
    });
};

exports.create = (req, res) => {
    console.log("creacion de usuario");
    User.create(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.mesagge || "server error creating user"
            });
        } else {
            console.log(data);
            res.status(200).send({
                message: "user created succesfully",
                userId: data
            });
        }
    });
};

exports.update = (req, res) => {
    User.update(req.body.userName, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.mesagge || "server error updating user"
            });
        } else {
            User.getSingle(req.body.userName, (err2, data2) => {
                res.send({
                    message: "user updated succesfully",
                    user: data2
                });
            });
        }
    });
};