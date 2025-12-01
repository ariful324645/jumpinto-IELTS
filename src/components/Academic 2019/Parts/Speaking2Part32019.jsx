import React, { useState, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { VscDebugStart } from "react-icons/vsc";

import Speaking2Pagination2019 from "../Pagination/Speaking2Pagination2019";

const Speaking2Part32019 = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [spokenQuestion, setSpokenQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [totalMark, setTotalMark] = useState(0);

  const recognitionRef = useRef(null);

  const storageKey = "/2020/Test 1/speaking"; // ✅ localStorage key

const questions = [
  "Why do some people buy lots of things for their home?",
  "Do you think it is very expensive to make a home look nice?",
  "Why don't some people care about how their home looks?",
  "In what ways is living in a flat/apartment better than living in a house?",
  "Do you think homes will look different in the future?",
  "Do you agree that the kinds of homes people prefer change as they get older?",
];

const questionKeywords = [
  ["buy", "things", "home", "shopping", "decoration", "consumer"],
  ["expensive", "cost", "home decor", "budget", "money", "appearance"],
  ["care", "home looks", "appearance", "interest", "lifestyle"],
  ["flat", "apartment", "house", "better", "living", "comparison"],
  ["future", "homes", "design", "architecture", "changes"],
  ["homes", "preferences", "age", "older", "change", "lifestyle"],
];


  // ▶ Speak current question
  const handleStartClick = () => {
    if (questionIndex >= questions.length) return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(questions[questionIndex]);
    utterance.rate = 1;
    utterance.pitch = 1;

    setSpokenQuestion(questions[questionIndex]);
    setCurrentAnswer("");
    setIsSpeaking(true);

    utterance.onend = () => setIsSpeaking(false);

    synth.speak(utterance);
  };

  // ✅ keyword-based mark calculation
  const calculateMark = (answer, questionIdx) => {
    const text = answer.toLowerCase();
    if (!text) return 0;

    const keywords = questionKeywords[questionIdx];
    for (let kw of keywords) {
      if (text.includes(kw)) return 1;
    }
    return 0;
  };

  // 🎤 Microphone click
  const handleMicrophoneClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    let finalTranscript = "";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript + " ";
        }
      }
      setCurrentAnswer(finalTranscript + interimTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);

      const answerText = finalTranscript.trim() || currentAnswer.trim();
      const mark = calculateMark(answerText, questionIndex);

      const updatedAnswers = [
        ...answers,
        {
          question: questions[questionIndex],
          answer: answerText || "No answer given",
          mark,
        },
      ];

      setAnswers(updatedAnswers);

      const total = updatedAnswers.reduce((sum, a) => sum + a.mark, 0);
      setTotalMark(total);

      // ✅ Save mark to localStorage
      localStorage.setItem(storageKey, total);

      setTimeout(() => {
        if (questionIndex < questions.length - 1) {
          setQuestionIndex((prev) => prev + 1);
          setSpokenQuestion("");
          setCurrentAnswer("");
        } else {
          setShowResult(true);
        }
      }, 800);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  if (showResult) {
    return (
      <div className="p-6 max-w-2xl mx-auto border rounded-xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          Speaking Test Complete!
        </h1>

        <ul className="space-y-6 text-left">
          {answers.map((item, index) => (
            <li
              key={index}
              className="p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <p className="text-lg font-semibold text-blue-700 mb-1">
                Question {index + 1}:
              </p>
              <p className="text-gray-800 mb-3">{item.question}</p>
              <p className="font-semibold text-gray-800 mb-1 inline gap-2">
                Your Answer:{" "}
                <span className="text-green-700 font-bold">{item.answer}</span>
              </p>
              <p className="text-yellow-600 font-medium">Mark: {item.mark}</p>
            </li>
          ))}
        </ul>

        <div className="text-center mt-8">
          <p className="text-xl font-bold text-blue-700 mb-4">
            Total Score: {totalMark} / {questions.length}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Restart Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {" "}
      <div className="p-6 flex justify-between">
        {/* left div */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">PART 3</h1> <br />
          <br />
          <h1 className="text-2xl font-bold">Discussion topics: </h1> <br />
          <ul className="list-disc pl-8 list-inside space-y-2">
            <h1 className="text-2xl font-bold text-center mb-5">
              Creating a nice home & Different types of home
            </h1>

            <p className="text-lg font-bold">Creating a nice home</p>
            <li>Why do some people buy lots of things for their home?</li>
            <li>Do you think it is very expensive to make a home look nice?</li>
            <li>Why don't some people care about how their home looks?</li>

            <p className="text-lg font-bold mt-4">Different types of home</p>
            <li>
              In what ways is living in a flat/apartment better than living in a
              house?
            </li>
            <li>Do you think homes will look different in the future?</li>
            <li>
              Do you agree that the kinds of homes people prefer change as they
              get older?
            </li>
          </ul>
        </div>

        {/* right div */}
        <div className="flex-1 max-w-xl text-center border rounded-xl shadow-lg p-6 bg-gray-50">
          <p className="flex items-center justify-center">
            <span className="bg-amber-100 text-gray-400 rounded-sm w-96 mb-10">
              2/3 speaking practices finished in 180 minutes.
            </span>
          </p>

          <div className="flex justify-center items-center gap-10 mb-10">
            <VscDebugStart
              size={60}
              className={`cursor-pointer transition ${
                isSpeaking
                  ? "text-blue-500 animate-pulse"
                  : "hover:text-green-600"
              }`}
              onClick={handleStartClick}
              title="Speak Question"
            />
            <FaMicrophone
              size={50}
              className={`cursor-pointer transition ${
                isListening ? "text-red-500 animate-pulse" : "text-gray-700"
              }`}
              onClick={handleMicrophoneClick}
              title="Speak Answer"
            />
          </div>

          <div className="text-left bg-white p-4 rounded-lg shadow-inner min-h-[150px]">
            {spokenQuestion && (
              <div>
                <p className="text-lg font-semibold text-blue-700 mb-2">
                  Question:
                </p>
                <p className="text-gray-800">{spokenQuestion}</p>
              </div>
            )}

            {currentAnswer && (
              <div className="mt-4">
                <p className="text-lg font-semibold text-green-700 mb-2">
                  Your Answer (live):
                </p>
                <p className="text-gray-800 whitespace-pre-line">
                  {currentAnswer}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 text-sm text-gray-500">
            Question {questionIndex + 1} of {questions.length}
          </div>
        </div>
      </div>
      <Speaking2Pagination2019></Speaking2Pagination2019>
    </div>
  );
};

export default Speaking2Part32019;
