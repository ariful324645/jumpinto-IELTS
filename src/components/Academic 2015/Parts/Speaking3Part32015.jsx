import React, { useState, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { VscDebugStart } from "react-icons/vsc";


import Speaking3Pagination2015 from "../Pagination 2015/Speaking3Pagination2015";

const Speaking3Part32015 = () => {
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
  "How much time do children spend with their parents in your country? Do you think that is enough?",
  "How important do you think spending time together is for the relationships between parents and children? Why?",
  "Have relationships between parents and children changed in recent years? Why do you think that is?",
  "What are the most popular free-time activities with children today?",
  "Do you think the free-time activities children do today are good for their health? Why is that?",
  "How do you think children's activities will change in the future? Will this be a positive change?",
];

const questionKeywords = [
  [
    "time with parents",
    "children",
    "spend time",
    "enough",
    "how much",
    "country",
  ],
  [
    "importance",
    "spending time together",
    "relationship",
    "parents",
    "children",
    "why",
  ],
  ["changes", "relationships", "parents", "children", "recent years", "why"],
  ["free-time activities", "children", "popular", "hobbies", "games", "today"],
  ["activities", "health", "children", "good for health", "why", "exercise"],
  ["future", "children", "activities", "change", "positive", "development"],
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
          <h1 className="text-2xl font-bold">PART 3</h1>
          <br />
          <h1 className="text-2xl font-bold">Discussion topics:</h1>
          <br />

          <ul className="list-disc pl-8 list-inside space-y-2">
            <h1 className="text-2xl font-bold text-center mb-5">
              Relationships between parents and children & Children's free-time
              activities
            </h1>

            <p className="text-lg font-bold">
              Relationships between parents and children
            </p>
            <li>
              How much time do children spend with their parents in your
              country? Do you think that is enough?
            </li>
            <li>
              How important do you think spending time together is for the
              relationships between parents and children? Why?
            </li>
            <li>
              Have relationships between parents and children changed in recent
              years? Why do you think that is?
            </li>

            <p className="text-lg font-bold mt-4">
              Children's free-time activities
            </p>
            <li>
              What are the most popular free-time activities with children
              today?
            </li>
            <li>
              Do you think the free-time activities children do today are good
              for their health? Why is that?
            </li>
            <li>
              How do you think children's activities will change in the future?
              Will this be a positive change?
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
      <Speaking3Pagination2015></Speaking3Pagination2015>
    </div>
  );
};

export default Speaking3Part32015;
