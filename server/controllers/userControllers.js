const saltRounds = 10;
const db = require("../db");
const bcrypt = require("bcrypt");

exports.createUser = (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  console.log("receive body");
  console.log(req.body);
  bcrypt.hash(password, saltRounds, (error, hash) => {
    if (error) {
      return res.send({
        data: null,
        sucess: false,
        message: "Error creating user",
      });
    }
    db.query(
      "INSERT INTO user(first_name, last_name, email, password, phone_number) VALUES(?,?,?,?,?)",
      [firstName, lastName, email, hash, phoneNumber],
      (err, result) => {
        if (err) {
          console.log("ERRORS");
          console.log("Error creating user" + err.sqlMessage);
          res.send({
            message: "Error creating user" + err.sqlMessage,
            success: false,
            data: null,
          });
        } else {
          res.status(200).json({
            message: "User created successfully ",
            success: true,
            data: result,
          });
        }
      }
    );
  });
};
exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
exports.getUserById = (req, res) => {
  const userId = req.params.userId;
  db.query("SELECT * FROM user WHERE user_id = ?", [userId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
exports.updateUserById = (req, res) => {
  const { userId } = req.params;
  let fieldsArr = [];
  let query = [];
  let finalQuery = [];

  for (let i in req.body) {
    fieldsArr.push(req.body[i]);
    query.push(i);
  }
  query.forEach((q) => {
    finalQuery.push(`${q} = ?`);
  });

  db.query(
    `UPDATE user SET ${finalQuery} WHERE user_id = ?`,
    [...fieldsArr, userId],
    (err, rows) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(rows);
      }
    }
  );
};

exports.deleteUserById = (req, res) => {
  const userId = req.params.userId;
  db.query("DELETE FROM user WHERE user_id = ?", userId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// // app.get("/api/users/",
// //   });
// app.post("/api/users");

// app.get("/api/users/:userId");

// app.put("/api/users/:userId");
// app.delete("/api/users/:userId");
