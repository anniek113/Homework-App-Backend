require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const aws = require("aws-sdk");
const asyncMap = require("./helpers");
const PORT = 4000;

const app = express();
app.use(express.json());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
app.post("/user", async (request, response) => {
  try {
    console.log("postuser");
    if (
      !request.body.username ||
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.role
    ) {
      response.status(400).send({ message: "enter all required information" });
    }

    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      "INSERT INTO homeworkapp.user (username, firstName, lastName, role) VALUES (?, ?, ?, ?)",
      [
        request.body.username,
        request.body.firstName,
        request.body.lastName,
        request.body.role,
      ]
    );
    con.release();

    console.log(queryResponse);

    response.status(200).send({ messge: queryResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

app.get("/user", authorizeUser, async (request, response) => {
  try {
    console.log("GET ONE USER");

    /*const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }*/

    const con = await pool.getConnection();
    const recordset = await con.execute(
      "SELECT * FROM homeworkapp.user WHERE username=?",
      [request.query.username]
    );
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

function authorizeUser(request, response, next) {
  console.log("AuthroizeUser");

  /*if (request.query.token) request.body.token = request.query.token;
  const tokenFromRequestBody = request.body.token;*/

  try {
    /*jwt.verify(tokenFromRequestBody, pem, function (error, decodedToken) {
      if (error) {
        console.log(error);
        return response.status(403).send(error);
      }

      request.decodedToken = decodedToken;
    });*/

    next();
  } catch (error) {
    console.log(error);
    return response.status(500).send(error);
  }
}

app.post("/student", authorizeUser, async (request, response) => {
  try {
    console.log("poststudentinfo");

    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      "INSERT INTO homeworkapp.student ( username, skype, bio, birthday, profilepic) VALUES ( ?, ?, ?, ?, ?)",
      [
        request.body.username,
        request.body.skype ? request.body.skype : null,
        request.body.bio ? request.body.bio : null,
        request.body.birthday ? request.body.birthday : null,
        request.body.profilepic ? request.body.profilepic : null,
      ]
    );
    con.release();

    console.log(queryResponse);

    response.status(200).send({ messge: queryResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

app.post("/teacher", authorizeUser, async (request, response) => {
  try {
    console.log("poststudentinfo");

    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      "INSERT INTO homeworkapp.teacher ( username, skype, bio, birthday, profilepic, subject, experience, method, price) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        request.body.username,
        request.body.skype ? request.body.skype : null,
        request.body.bio ? request.body.bio : null,
        request.body.birthday ? request.body.birthday : null,
        request.body.profilepic ? request.body.profilepic : null,
        request.body.subject ? request.body.subject : null,
        request.body.experience ? request.body.experience : null,
        request.body.method ? request.body.method : null,
        request.body.price ? request.body.price : null,
      ]
    );
    con.release();

    console.log(queryResponse);

    response.status(200).send({ messge: queryResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
