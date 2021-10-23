const mysql = require("mysql2");

const dbConfig = require("../config/db.config");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE
        // No se importa el archivo dbConfig, por que si tenemos otra configuracion extra
        // tambien se importara completo, por lo que, podria fallar al cargar un campo
        // inexistente
});

connection.connect(error => {
    if (error) {
        console.log(error);
        throw error;
    } else {
        console.log("Funciono");
    }

});

module.exports = connection;