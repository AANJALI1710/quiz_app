const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ⭐ GET QUESTIONS BY SUBJECT
router.get("/questions/:subject", async (req, res) => {
  const subject = req.params.subject;
  const questions = await Question.find({ subject });
  res.json(questions);
});

// ⭐ SUBMIT QUIZ
router.post("/submit", async (req, res) => {
  const answers = req.body.answers;
  const qids = answers.map(a => a.qid);

  const questions = await Question.find({ _id: { $in: qids } });

  let score = 0;
  for (const a of answers) {
    const q = questions.find(x => x._id.equals(a.qid));
    if (q && q.answer === a.selectedIndex) score++;
  }

  // Save high score
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) {
    try {
      const token = auth.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (score > user.highScore) {
        user.highScore = score;
        await user.save();
      }
    } catch (err) {}
  }

  res.json({ score });
});

// ⭐ LEADERBOARD
router.get("/leaderboard", async (req, res) => {
  const top = await User.find().select("name highScore -_id").sort({ highScore: -1 });
  res.json(top);
});

module.exports = router;
