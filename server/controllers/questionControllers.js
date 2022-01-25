exports.createQuestion = (req, res) => {
  const { question_text, user_id, title } = req.body;
  db.query(
    "INSERT INTO question(question_text, user_id, title) VALUES(?,?,?)",
    [question_text, user_id, title],
    (err, result) => {
      if (err) {
        console.log("ERROR POSTING QUESTION");
        console.log(err);
        res.status(400).json({
          success: false,
          message: "Error posting question",
          data: null,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Question posted",
          data: { question_text, user_id },
        });
      }
    }
  );
};
exports.getAllQuestions = (req, res) => {
  db.query("SELECT * FROM question", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
exports.getQuestionById = (req, res) => {
  const questionId = req.params.questionId;
  db.query(
    "SELECT * FROM question WHERE question_id = ?",
    [questionId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};
exports.updateQuestionById = (req, res) => {
  const { questionId } = req.params;
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
    `UPDATE question SET ${finalQuery} WHERE question_id = ?`,
    [...fieldsArr, questionId],
    (err, rows) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(rows);
      }
    }
  );
};

exports.deleteQuestionById = (req, res) => {
  const questionId = req.params.questionId;
  db.query(
    "DELETE FROM question WHERE question_id = ?",
    questionId,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

// app.post("/api/questions");

// app.get("/api/questions/:questionId");

// app.put("/api/questions/:questionId");

// app.delete("/api/questions/:questionId");
