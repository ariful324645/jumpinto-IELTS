import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import VoiceIelts from "../components/VoiceIelts";
import VocabularySearch from "../components/VocabularySearch";
import AllListening from "../components/AllListening";
import Test1Listening from "../components/Academic 2025/Test1Listening";
import Test2Listening from "../components/Academic 2025/Test2Listening";
import Test3Listening from "../components/Academic 2025/Test3Listening";
import Test4Listening from "../components/Academic 2025/Test4Listening";
import Test1Reading from "../components/Academic 2025/Reading/Test1Reading";
import Test2Reading from "../components/Academic 2025/Reading/Test2Reading";
import Test3Reading from "../components/Academic 2025/Reading/Test3Reading";
import Test4Reading from "../components/Academic 2025/Reading/Test4Reading";
import Test1Writing from "../components/Academic 2025/Writing/Test1Writing";
import Test2Writing from "../components/Academic 2025/Writing/Test2Writing";
import Test3Writing from "../components/Academic 2025/Writing/Test3Writing";
import Test4Writing from "../components/Academic 2025/Writing/Test4Writing";
import Test1Speaking from "../components/Academic 2025/Speaking/Test1Speaking";
import Test2Speaking from "../components/Academic 2025/Speaking/Test2Speaking";
import Test3Speaking from "../components/Academic 2025/Speaking/Test3Speaking";
import Test4Speaking from "../components/Academic 2025/Speaking/Test4Speaking";

import Pagination from "../components/Pagination";
import Test1Listening2024 from "../components/Academic 2024/Listening/Test1Listening2024";
import Test2Listening2024 from "../components/Academic 2024/Listening/Test2Listening2024";
import Test3Listening2024 from "../components/Academic 2024/Listening/Test3Listening2024";
import Test4Listening2024 from "../components/Academic 2024/Listening/Test4Listening2024";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/voiceIelts",
        Component: VoiceIelts,
      },
      {
        path: "/vocabularySearch",
        Component: VocabularySearch,
      },
      // {
      //   path: "/:year/:testName/listening",
      //   Component: AllListening,
      // },
      {
        path: "/2025/Test 1/listening",
        Component: Test1Listening,
      },
      {
        path: "/2025/Test 2/listening",
        Component: Test2Listening,
      },
      {
        path: "/2025/Test 3/listening",
        Component: Test3Listening,
      },
      {
        path: "/2025/Test 4/listening",
        Component: Test4Listening,
      },
      {
        path: "/2025/Test 1/reading",
        Component: Test1Reading,
      },
      {
        path: "/2025/Test 2/reading",
        Component: Test2Reading,
      },
      {
        path: "/2025/Test 3/reading",
        Component: Test3Reading,
      },
      {
        path: "/2025/Test 4/reading",
        Component: Test4Reading,
      },
      {
        path: "/2025/Test 1/writing",
        Component: Test1Writing,
      },
      {
        path: "/2025/Test 2/writing",
        Component: Test2Writing,
      },
      {
        path: "/2025/Test 3/writing",
        Component: Test3Writing,
      },
      {
        path: "/2025/Test 4/writing",
        Component: Test4Writing,
      },
      {
        path: "/2025/Test 1/speaking",
        Component: Test1Speaking,
      },
      {
        path: "/2025/Test 2/speaking",
        Component: Test2Speaking,
      },
      {
        path: "/2025/Test 3/speaking",
        Component: Test3Speaking,
      },
      {
        path: "/2025/Test 4/speaking",
        Component: Test4Speaking,
      },
      {
        path: "/pagination",
        Component: Pagination,
      },
      {
        path: "/2024/Test 1/listening",
        Component: Test1Listening2024,
      },
      {
        path: "/2024/Test 2/listening",
        Component: Test2Listening2024,
      },
      {
        path: "/2024/Test 3/listening",
        Component: Test3Listening2024,
      },
      {
        path: "/2024/Test 4/listening",
        Component: Test4Listening2024,
      },
    ],
  },
]);
