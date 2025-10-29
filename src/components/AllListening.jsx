
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const AllListening = () => {
  const { year, testName } = useParams();
  const [texts, setTexts] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const allData = [
      {
        year: "2022",
        testName: "Test 1",
        section: "listening",
        texts: [
          "Speaker 1 talks about travelling experience.",
          "A conversation between a teacher and student.",
          "Lecture on global warming and its effects.",
          "Discussion about healthy eating habits.",
          "Interview with a famous musician.",
          "Talk about time management for students.",
          "Radio report on recent events.",
          "Story about an adventurous journey.",
          "Talk show on technology trends.",
          "Closing discussion about IELTS listening tips.",
          "Speaker 1 talks about travelling experience.",
          "A conversation between a teacher and student.",
          "Lecture on global warming and its effects.",
          "Discussion about healthy eating habits.",
          "Interview with a famous musician.",
          "Talk about time management for students.",
          "Radio report on recent events.",
          "Story about an adventurous journey.",
          "Talk show on technology trends.",
          "Closing discussion about IELTS listening tips.",
        ],
        questions: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          title: `Question ${i + 1}`,
          audio: `audio${i + 1}.mp3`,
        })),
      },
      {
        year: "2023",
        testName: "Test 4",
        section: "listening",
        texts: [
          "Introduction to wildlife and animal protection.",
          "Speaker 2 on the importance of recycling.",
          "A report about air pollution in cities.",
          "Conversation about online learning systems.",
          "Interview with a university professor.",
          "Talk about daily exercise routines.",
          "Radio show on environmental awareness.",
          "Story of a volunteer experience.",
          "Discussion about study abroad programs.",
          "Closing summary and motivation speech.",
          "Introduction to wildlife and animal protection.",
          "Speaker 2 on the importance of recycling.",
          "A report about air pollution in cities.",
          "Conversation about online learning systems.",
          "Interview with a university professor.",
          "Talk about daily exercise routines.",
          "Radio show on environmental awareness.",
          "Story of a volunteer experience.",
          "Discussion about study abroad programs.",
          "Closing summary and motivation speech.",
        ],
        questions: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          title: `Question ${i + 1}`,
          audio: `test4_audio${i + 1}.mp3`,
        })),
      },
    ];

    // Filter dynamically based on year & testName
    const filtered = allData.find(
      (item) => item.year === year && item.testName === testName
    );

    if (filtered) {
      setTexts(filtered.texts);
      setQuestions(filtered.questions);
    }
  }, [year, testName]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        Listening - {testName} ({year})
      </h1>

      {/* Main Layout */}
      <div className="flex gap-6 h-[800px]">
        {/* LEFT SIDE (dynamic texts) */}
        <div className="w-1/2 bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Audio Transcripts
          </h2>
          <ul className="space-y-3">
            {texts.length > 0 ? (
              texts.map((text, index) => (
                <li
                  key={index}
                  className="bg-gray-50 border border-gray-200 p-3 rounded-md hover:bg-gray-100"
                >
                  {text}
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No text available</p>
            )}
          </ul>
        </div>

        {/* RIGHT SIDE (dynamic questions) */}
        <div className="w-1/2 border-4 border-black bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Listening Questions
          </h2>
          <ul className="space-y-4">
            {questions.length > 0 ? (
              questions.map((q) => (
                <li
                  key={q.id}
                  className="border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition"
                >
                  <p className="font-medium mb-2">{q.title}</p>
                  <audio controls className="w-full">
                    <source src={q.audio} type="audio/mpeg" />
                  </audio>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No questions available
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllListening;
