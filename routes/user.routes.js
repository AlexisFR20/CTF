module.exports = app => {
    const users = require('../controllers/user.controller');
    const files = require('../controllers/files.controller');
    const upload = require('../libs/storage')
    const User = require("../models/user.model");
    const jwt = require('jsonwebtoken')

    app.post('/sign', (req, res) => {
        console.log(req.body);
        const { userName, password } = req.body;
        console.log(userName);
        User.verification(userName, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.mesagge || "Server error getting all users"
                });
            } else {
                if (data.length) {
                    // Aqui se puede inicializar validaciones o realziar operaciones
                    console.log(data);
                    const token = jwt.sign({ data }, 'secretphrase');
                    res.json({ token })
                } else {
                    // si no encontro manar error 404
                    res.status(404).send({
                        mesagge: "user not found"
                    });
                }
            }
        });
    });

    app.get("/users", users.getAll);

    // Get, single user
    app.get("/user/:userName", users.getSingle);
    // /:userId con esto exprss ya sabe que se recibira una variable

    // Create user
    app.post("/user", users.create);

    // Update user
    app.put("/user", users.update);

    //--------------------------------
    app.get("/files", files.getAll);

    // Get, single user
    app.get("/file/:nameFile", files.create);
    // /:userId con esto exprss ya sabe que se recibira una variabl


    // Update user
    // app.put("/file", files.update);

    app.post('/uploadfile', upload.single('myFile'), files.create)




    app.get('/', function(req, res) {
        console.log("funcionaria");
        res.sendFile(__dirname + '/index.html');
    });

    function verifyToken(req, res, next) {
        if (!req.headers.authorization) return res.status(401).json('no autorizado');
        const token = req.headers.authorization.substr(7);
        if (token !== '') {
            const content = jwt.verify(token, 'secretphrase');
            req.data = content;
            next();
        } else {
            res.status(401).json('Token vacio')
        }
    }
};