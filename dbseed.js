require('dotenv').config();
const sql = require('mysql2/promise');
//const {DB_HOST, DB_PASSWORD, DB_USER}=require("./creds")

const pool = sql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// (async function testConnection() {
//     try {
//         const conn = await pool.getConnection();
//         console.log("Connection Successful");
//         conn.release();

//     } catch (error) {
//         console.log(error);
//     }
// })();

(async function createUserTable() {
  try {
    const conn = await pool.getConnection();

    conn.query('CREATE DATABASE IF NOT EXISTS homeworkapp');
    conn.query('USE homeworkapp');

    const userDB = await conn.query(
      'CREATE TABLE IF NOT EXISTS user (username VARCHAR(255) UNIQUE NOT NULL, firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, role VARCHAR(10) NOT NULL, PRIMARY KEY(username) )'
    );
    console.log(userDB);
    conn.release();
  } catch (error) {
    console.log(error);
  }
})();

(async function createStudentTable() {
  try {
    const conn = await pool.getConnection();
    conn.query('CREATE DATABASE IF NOT EXISTS homeworkapp');
    conn.query('USE homeworkapp');

    const studentDB = await conn.query(
      'CREATE TABLE IF NOT EXISTS student (id INT UNIQUE NOT NULL AUTO_INCREMENT, username VARCHAR(255), location VARCHAR(255), skype VARCHAR(255), bio VARCHAR (4095), birthday VARCHAR(10), profilepic VARCHAR(255), PRIMARY KEY(id), FOREIGN KEY(username) REFERENCES user(username))'
    );
    console.log(studentDB);
    conn.release();
  } catch (error) {
    console.log(error);
  }
})();

(async function createTeacherTable() {
  try {
    const conn = await pool.getConnection();
    conn.query('CREATE DATABASE IF NOT EXISTS homeworkapp');
    conn.query('USE homeworkapp');

    const teacherDB = await conn.query(
      'CREATE TABLE IF NOT EXISTS teacher (id INT UNIQUE NOT NULL AUTO_INCREMENT, username VARCHAR(255), subject VARCHAR(255), experience VARCHAR(255), method VARCHAR(255), price VARCHAR(255), location VARCHAR(255), skype VARCHAR(255), bio VARCHAR (4095), birthday VARCHAR(10), profilepic VARCHAR(255), PRIMARY KEY(id), FOREIGN KEY(username) REFERENCES user(username) )'
    );
    console.log(teacherDB);
    conn.release();
  } catch (error) {
    console.log(error);
  }
})();

(async function createReviewsTable() {
  try {
    const conn = await pool.getConnection();
    conn.query('CREATE DATABASE IF NOT EXISTS homeworkapp');
    conn.query('USE homeworkapp');

    const reviewsDB = await conn.query(
      'CREATE TABLE IF NOT EXISTS reviews (id INT UNIQUE NOT NULL AUTO_INCREMENT, username VARCHAR(255), date VARCHAR(255), reviewer VARCHAR(255), comments VARCHAR(4000), rating VARCHAR(5), PRIMARY KEY(id), FOREIGN KEY(username) REFERENCES user(username) )'
    );
    console.log(reviewsDB);
    conn.release();
  } catch (error) {
    console.log(error);
  }
})();

// (async function createTransactionsTable(){
// try {
//     const conn = await pool.getConnection();
//     conn.query("CREATE DATABASE IF NOT EXISTS homeworkapp")
//     conn.query("USE homeworkapp");
// const transactionsDB = await conn.query(
//     "CREATE TABLE IF NOT EXISTS reviews (id INT UNIQUE NOT NULL AUTO_INCREMENT, username VARCHAR(255), date VARCHAR(255), name VARCHAR(255), shipto VARCHAR(255), class)"
// )

// } catch (error) {

// }

// })
