exports.getAllAnswers = (req, res) => {
  db.query("SELECT * FROM answer", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
exports.getAnswerById = (req, res) => {
  const answerId = req.params.answerId;
  db.query(
    "SELECT * FROM answer WHERE answer_id = ?",
    [answerId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

exports.createAnswer = (req, res) => {
  const { answer_text, question_id, answered_by } = req.body;
  db.query(
    "INSERT INTO answer(answer_text, question_id, answered_by) VALUES(?,?,?)",
    [answer_text, question_id, answered_by],
    (err, result) => {
      if (err) {
        console.log("ERROR POSTING ANSWER");
        console.log(err);
        res.status(400).json({
          success: false,
          message: "Error posting answer",
          data: null,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Answer posted",
          data: { answer_text, question_id, answered_by },
        });
      }
    }
  );
};
exports.updateAnswerById = (req, res) => {
  const { answerId } = req.params;
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
    `UPDATE answer SET ${finalQuery} WHERE answer_id = ?`,
    [...fieldsArr, answerId],
    (err, rows) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(rows);
      }
    }
  );
};
exports.deleteAnswerById = (req, res) => {
  const answerId = req.params.answerId;
  db.query(
    "DELETE FROM answer WHERE answer_id = ?",
    answerId,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};
// app.post("/api/answers", );

// app.get("/api/answers/:answerId",);

// app.put("/api/answers/:answerId", );

// app.delete("/api/answers/:answerId");
