// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("./models/Question");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Question.deleteMany({});
    console.log("Old questions deleted");

    await Question.insertMany([
      // ---------------------------
      //       GENERAL KNOWLEDGE
      // ---------------------------
      {
        subject: "GK",
        question: "Capital of India?",
        options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
        answer: 0,
      },
      {
        subject: "GK",
        question: "National animal of India?",
        options: ["Lion", "Tiger", "Elephant", "Peacock"],
        answer: 1,
      },
      {
        subject: "GK",
        question: "Who is known as the Father of the Nation?",
        options: ["Nehru", "Bhagat Singh", "Gandhi", "Ambedkar"],
        answer: 2,
      },
      {
        subject: "GK",
        question: "Largest ocean in the world?",
        options: ["Indian", "Pacific", "Atlantic", "Arctic"],
        answer: 1,
      },
      {
        subject: "GK",
        question: "First prime minister of India?",
        options: ["Modi", "Nehru", "Gandhi", "Patel"],
        answer: 1,
      },

      // ---------------------------
      //            MATH
      // ---------------------------
      {
        subject: "Math",
        question: "2 + 2 = ?",
        options: ["3", "4", "22", "5"],
        answer: 1,
      },
      {
        subject: "Math",
        question: "Square root of 81?",
        options: ["9", "8", "7", "6"],
        answer: 0,
      },
      {
        subject: "Math",
        question: "10 × 5 = ?",
        options: ["40", "50", "60", "55"],
        answer: 1,
      },
      {
        subject: "Math",
        question: "Solve: 15 - 4",
        options: ["11", "12", "10", "9"],
        answer: 0,
      },
      {
        subject: "Math",
        question: "Solve: 7 × 6",
        options: ["36", "42", "48", "40"],
        answer: 1,
      },

      // ---------------------------
      //            HTML
      // ---------------------------
      {
        subject: "HTML",
        question: "HTML stands for?",
        options: [
          "Home Tool Markup Language",
          "Hyper Text Markup Language",
          "Hyperlinks Text Markup Language",
          "None",
        ],
        answer: 1,
      },
      {
        subject: "HTML",
        question: "Which tag is used for largest heading?",
        options: ["<h1>", "<h6>", "<p>", "<head>"],
        answer: 0,
      },
      {
        subject: "HTML",
        question: "Which tag is used for inserting an image?",
        options: ["<img>", "<image>", "<pic>", "<src>"],
        answer: 0,
      },
      {
        subject: "HTML",
        question: "Which tag creates a hyperlink?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        answer: 0,
      },
      {
        subject: "HTML",
        question: "Which attribute is used for image URL?",
        options: ["src", "href", "img", "path"],
        answer: 0,
      },
    ]);

    console.log("All questions inserted successfully!");
    process.exit();
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
