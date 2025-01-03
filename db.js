const mysql = require('mysql2')
const {db} = require('./vars/config')


const connectDB = async () => {
    try {
        const pool = mysql.createPool({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.database,
            waitForConnections: true,
            connectionLimit: 2,
            queueLimit: 0
        })
        const connection = await pool.promise().getConnection()
        connection.release()
    } catch (e) {
        throw new Error(e)
    }
}

module.exports = {connectDB}