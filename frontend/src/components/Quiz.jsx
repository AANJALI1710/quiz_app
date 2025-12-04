import React, { useEffect, useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";
import "../quiz.css";

export default function Quiz() {
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState("select"); // select → quiz → result
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/login");
    }
  }, []);

  // Load questions for selected subject
  const loadQuestions = async () => {
    if (!subject) return;

    setLoading(true);
    try {
      // FIXED: removed the extra "/api"
      const res = await API.get(`/quiz/questions/${subject}`);
      setQuestions(res.data);
      setStep("quiz");
    } catch (err) {
      console.error("Error loading questions:", err);
    }
    setLoading(false);
  };

  // Select an answer
  const selectOption = (qid, idx) => {
    setAnswers({ ...answers, [qid]: idx });
  };

  // Submit quiz
  const finishQuiz = async () => {
    const payload = {
      answers: Object.entries(answers).map(([qid, selectedIndex]) => ({
        qid,
        selectedIndex,
      })),
    };

    try {
      // FIXED: removed "/api" from the path
      const res = await API.post("/quiz/submit", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setScore(res.data.score);
      setStep("result");
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div className="quiz-wrapper">
      <h1 className="quiz-title">Quiz</h1>

      {/* Step 1 — Choose Subject */}
      {step === "select" && (
        <div className="start-box">
          <h2>Select a Subject</h2>

          <select
            className="subject-select"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">-- Select Subject --</option>
            <option value="GK">General Knowledge</option>
            <option value="Math">Math</option>
            <option value="HTML">HTML</option>
          </select>

          <button
            className="start-btn"
            disabled={!subject}
            onClick={loadQuestions}
          >
            Start Quiz
          </button>
        </div>
      )}

      {/* Step 2 – Quiz Questions */}
      {step === "quiz" && (
        <>
          {loading && <p className="loading">Loading questions...</p>}

          {!loading &&
            questions.map((q, i) => (
              <div key={q._id} className="q-card">
                <h3>
                  {i + 1}. {q.question}
                </h3>

                {q.options.map((opt, idx) => (
                  <label className="option" key={idx}>
                    <input
                      type="radio"
                      name={q._id}
                      checked={answers[q._id] === idx}
                      onChange={() => selectOption(q._id, idx)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ))}

          <button className="submit-btn" onClick={finishQuiz}>
            Submit Quiz
          </button>
        </>
      )}

      {/* Step 3 – Results */}
      {step === "result" && (
        <div className="result-box">
          <h2>Your Score</h2>
          <h1>
            {score} / {questions.length}
          </h1>

          <button
            className="restart-btn"
            onClick={() => {
              setStep("select");
              setAnswers({});
              setSubject("");
            }}
          >
            Take another Quiz
          </button>
        </div>
      )}
    </div>
  );
}
