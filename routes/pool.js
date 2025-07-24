const mysql = require("mysql")
const pool = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "netflixdb",
    multipleStatements: true,
    connectionLimit: 100
})

module.exports = pool