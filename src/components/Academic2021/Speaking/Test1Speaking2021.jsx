import React, { useState, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { VscDebugStart } from "react-icons/vsc";

const Test1Speaking2021 = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [spokenQuestion, setSpokenQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [totalMark, setTotalMark] = useState(0);

  const recognitionRef = useRef(null);

  const questions = [
    "Who do you spend most time studying or working with?",
    "What kinds of things do you study or work on with other people?",
    "Are there times when you study or work better by yourself?",
    "Is it important to like the people you study or work with?",
  ];

  // ✅ keywords for each question (at least 2-3 keywords per question)
  const questionKeywords = [
    ["friend", "classmate", "colleague", "family", "partner", "team"],
    ["project", "assignment", "study", "discussion", "work", "task"],
    ["alone", "myself", "quiet", "focus", "concentration", "independent"],
    ["like", "respect", "friend", "relationship", "teamwork", "important"],
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
  // ✅ Live answer only, do not show "No answer given"
  const calculateMark = (answer, questionIdx) => {
    const text = answer.toLowerCase();
    if (!text) return 0; // empty answer → 0 mark

    const keywords = questionKeywords[questionIdx];
    for (let kw of keywords) {
      if (text.includes(kw)) return 1; // match → 1 mark
    }
    return 0; // no keyword → 0 mark
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

      setAnswers((prev) => [
        ...prev,
        {
          question: questions[questionIndex],
          answer: answerText || "No answer given",
          mark,
        },
      ]);

      setTimeout(() => {
        if (questionIndex < questions.length - 1) {
          setQuestionIndex((prev) => prev + 1);
          setSpokenQuestion("");
          setCurrentAnswer("");
        } else {
          const total = [
            ...answers,
            {
              question: questions[questionIndex],
              answer: answerText || "No answer given",
              mark,
            },
          ].reduce((sum, a) => sum + a.mark, 0);
          setTotalMark(total);
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
          🎉 Speaking Test Complete!
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
            🏆 Total Score: {totalMark} / {questions.length}
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
    <div className="p-6 flex justify-between">
      {/* left div */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold">PART 1</h1> <br />
        <p className="text-lg">
          The examiner asks you about yourself, your home, work or studies and
          other familiar topics.
        </p>
        <br />
        <h1 className="text-2xl font-bold"> EXAMPLE</h1> <br />
        <ul className="list-disc pl-8 list-inside space-y-2">
          <li className=""> How much walking do you do in your daily life?</li>
          <li className="">
            {" "}
            Did you walk more when you were at school than now?
          </li>
          <li className="">
            {" "}
            What places are there to go for a walk near where you live?
          </li>
          <li className=""> Would you ever like to go on a walking holiday?</li>
        </ul>
      </div>
      {/* right div */}
      <div className="flex-1 max-w-xl text-center border rounded-xl shadow-lg p-6 bg-gray-50">
        <p className="flex items-center justify-center">
          {" "}
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
  );
};

export default Test1Speaking2021;
