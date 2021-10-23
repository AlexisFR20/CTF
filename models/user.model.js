const sql = require("./db");

const User = function(user) {
    this.userName = user.firstName;
    this.name = user.lastName;
    this.lastName = user.location;
    this.email = user.phone;
    this.password = user.gender;
    this.privilege = user.privilege;
    this.createdAt = user.createdAt;
};

User.getAll = result => {
    sql.query("SELECT * FROM User", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

User.getSingle = (userName, result) => {
    sql.query("SELECT * FROM User WHERE userName=?", userName,
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);
        });
};

User.create = (user, result) => {
    sql.query("INSERT INTO User SET ?", user,
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);

        }
    );
};

User.update = (userName, user, result) => {
    sql.query("UPDATE User SET name=?, lastName=?, email=?, password=?, privilege=? WHERE userName=?", [
            user.name,
            user.lastName,
            user.email,
            user.password,
            user.privilege,
            userName
        ],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            } else {
                result(null, res);
            }

        }
    );
};

User.verification = (userName, result) => {
    sql.query("SELECT * FROM User where userName = ?;", [userName],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);
        });
};

module.exports = User;