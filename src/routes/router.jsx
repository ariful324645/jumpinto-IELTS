import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import VoiceIelts from "../components/VoiceIelts";
import VocabularySearch from "../components/VocabularySearch";

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
import Test1Reading2024 from "../components/Academic 2024/Reading/Test1Reading2024";
import Test2Reading2024 from "../components/Academic 2024/Reading/Test2Reading2024";
import Test3Reading2024 from "../components/Academic 2024/Reading/Test3Reading2024";
import Test4Reading2024 from "../components/Academic 2024/Reading/Test4Reading2024";
import Test1Writing2024 from "../components/Academic 2024/Writing/Test1Writing2024";
import Test2Writing2024 from "../components/Academic 2024/Writing/Test2Writing2024";
import Test3Writing2024 from "../components/Academic 2024/Writing/Test3Writing2024";
import Test4Writing2024 from "../components/Academic 2024/Writing/Test4Writing2024";
import Test1Speaking2024 from "../components/Academic 2024/Speaking/Test1Speaking2024";
import Test2Speaking2024 from "../components/Academic 2024/Speaking/Test2Speaking2024";
import Test3Speaking2024 from "../components/Academic 2024/Speaking/Test3Speaking2024";
import Test4Speaking2024 from "../components/Academic 2024/Speaking/Test4Speaking2024";
import Test1Listening2023 from "../components/Academic 2023/Listening/Test1Listening2023";
import Test2Listening2023 from "../components/Academic 2023/Listening/Test2Listening2023";
import Test3Listening2023 from "../components/Academic 2023/Listening/Test3Listening2023";
import Test4Listening2023 from "../components/Academic 2023/Listening/Test4Listening2023";
import Test1Reading2023 from "../components/Academic 2023/Reading/Test1Reading2023";
import Test2Reading2023 from "../components/Academic 2023/Reading/Test2Reading2023";
import Test3Reading2023 from "../components/Academic 2023/Reading/Test3Reading2023";
import Test4Reading2023 from "../components/Academic 2023/Reading/Test4Reading2023";
import Test1Writing2023 from "../components/Academic 2023/Writing/Test1Writing2023";
import Test2Writing2023 from "../components/Academic 2023/Writing/Test2Writing2023";
import Test3Writing2023 from "../components/Academic 2023/Writing/Test3Writing2023";
import Test4Writing2023 from "../components/Academic 2023/Writing/Test4Writing2023";
import Test1Speaking2023 from "../components/Academic 2023/Speaking/Test1Speaking2023";
import Test2Speaking2023 from "../components/Academic 2023/Speaking/Test2Speaking2023";
import Test3Speaking2023 from "../components/Academic 2023/Speaking/Test3Speaking2023";
import Test4Speaking2023 from "../components/Academic 2023/Speaking/Test4Speaking2023";
import Test1Listening2022 from "../components/Academic 2022/Listening/Test1Listening2022";
import Test2Listening2022 from "../components/Academic 2022/Listening/Test2Listening2022";
import Test3Listening2022 from "../components/Academic 2022/Listening/Test3Listening2022";
import Test4Listening2022 from "../components/Academic 2022/Listening/Test4Listening2022";
import Test1Reading2022 from "../components/Academic 2022/Reading/Test1Reading2022";
import Test2Reading2022 from "../components/Academic 2022/Reading/Test2Reading2022";
import Test3Reading2022 from "../components/Academic 2022/Reading/Test3Reading2022";
import Test4Reading2022 from "../components/Academic 2022/Reading/Test4Reading2022";
import Test1Writing2022 from "../components/Academic 2022/Writing/Test1Writing2022";
import Test2Writing2022 from "../components/Academic 2022/Writing/Test2Writing2022";
import Test3Writing2022 from "../components/Academic 2022/Writing/Test3Writing2022";
import Test4Writing2022 from "../components/Academic 2022/Writing/Test4Writing2022";
import Test1Speaking2022 from "../components/Academic 2022/Speaking/Test1Speaking2022";
import Test2Speaking2022 from "../components/Academic 2022/Speaking/Test2Speaking2022";
import Test3Speaking2022 from "../components/Academic 2022/Speaking/Test3Speaking2022";
import Test4Speaking2022 from "../components/Academic 2022/Speaking/Test4Speaking2022";
import Test1Listening2021 from "../components/Academic2021/Listening/Test1Listening2021";
import Test2Listening2021 from "../components/Academic2021/Listening/Test2Listening2021";
import Test3Listening2021 from "../components/Academic2021/Listening/Test3Listening2021";
import Test4Listening2021 from "../components/Academic2021/Listening/Test4Listening2021";
import Test1Reading2021 from "../components/Academic2021/Reading/Test1Reading2021";
import Test2Reading2021 from "../components/Academic2021/Reading/Test2Reading2021";
import Test3Reading2021 from "../components/Academic2021/Reading/Test3Reading2021";
import Test4Reading2021 from "../components/Academic2021/Reading/Test4Reading2021";
import Test1Writing2021 from "../components/Academic2021/Writing/Test1Writing2021";
import Test2Writing2021 from "../components/Academic2021/Writing/Test2Writing2021";
import Test3Writing2021 from "../components/Academic2021/Writing/Test3Writing2021";
import Test4Writing2021 from "../components/Academic2021/Writing/Test4Writing2021";
import Test1Speaking2021 from "../components/Academic2021/Speaking/Test1Speaking2021";
import Test2Speaking2021 from "../components/Academic2021/Speaking/Test2Speaking2021";
import Test3Speaking2021 from "../components/Academic2021/Speaking/Test3Speaking2021";
import Test4Speaking2021 from "../components/Academic2021/Speaking/Test4Speaking2021";
import Test1Listening2020 from "../components/Academic 2020/Listening/Test1Listening2020";
import Test2Listening2020 from "../components/Academic 2020/Listening/Test2Listening2020";
import Test3Listening2020 from "../components/Academic 2020/Listening/Test3Listening2020";
import Test4Listening2020 from "../components/Academic 2020/Listening/Test4Listening2020";
import Test1Reading2020 from "../components/Academic 2020/Reading/Test1Reading2020";
import Test2Reading2020 from "../components/Academic 2020/Reading/Test2Reading2020";
import Test3Reading2020 from "../components/Academic 2020/Reading/Test3Reading2020";
import Test4Reading2020 from "../components/Academic 2020/Reading/Test4Reading2020";
import Test1Writing2020 from "../components/Academic 2020/Writing/Test1Writing2020";
import Test2Writing2020 from "../components/Academic 2020/Writing/Test2Writing2020";
import Test3Writing2020 from "../components/Academic 2020/Writing/Test3Writing2020";
import Test4Writing2020 from "../components/Academic 2020/Writing/Test4Writing2020";
import Test1Speaking2020 from "../components/Academic 2020/Speaking/Test1Speaking2020";
import Test2Speaking2020 from "../components/Academic 2020/Speaking/Test2Speaking2020";
import Test3Speaking2020 from "../components/Academic 2020/Speaking/Test3Speaking2020";
import Test4Speaking2020 from "../components/Academic 2020/Speaking/Test4Speaking2020";
import Test1Listening2019 from "../components/Academic 2019/Listening/Test1Listening2019";
import Test2Listening2019 from "../components/Academic 2019/Listening/Test2Listening2019";
import Test3Listening2019 from "../components/Academic 2019/Listening/Test3Listening2019";
import Test4Listening2019 from "../components/Academic 2019/Listening/Test4Listening2019";
import Test1Reading2019 from "../components/Academic 2019/Reading/Test1Reading2019";
import Test2Reading2019 from "../components/Academic 2019/Reading/Test2Reading2019";
import Test3Reading2019 from "../components/Academic 2019/Reading/Test3Reading2019";
import Test4Reading2019 from "../components/Academic 2019/Reading/Test4Reading2019";
import Test1Writing2019 from "../components/Academic 2019/Writing/Test1Writing2019";
import Test2Writing2019 from "../components/Academic 2019/Writing/Test2Writing2019";
import Test3Writing2019 from "../components/Academic 2019/Writing/Test3Writing2019";
import Test4Writing2019 from "../components/Academic 2019/Writing/Test4Writing2019";
import Test1Speaking2019 from "../components/Academic 2019/Speaking/Test1Speaking2019";

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
      {
        path: "/2024/Test 1/reading",
        Component: Test1Reading2024,
      },
      {
        path: "/2024/Test 2/reading",
        Component: Test2Reading2024,
      },
      {
        path: "/2024/Test 3/reading",
        Component: Test3Reading2024,
      },
      {
        path: "/2024/Test 4/reading",
        Component: Test4Reading2024,
      },
      {
        path: "/2024/Test 1/writing",
        Component: Test1Writing2024,
      },
      {
        path: "/2024/Test 2/writing",
        Component: Test2Writing2024,
      },
      {
        path: "/2024/Test 3/writing",
        Component: Test3Writing2024,
      },
      {
        path: "/2024/Test 4/writing",
        Component: Test4Writing2024,
      },
      {
        path: "/2024/Test 1/speaking",
        Component: Test1Speaking2024,
      },
      {
        path: "/2024/Test 2/speaking",
        Component: Test2Speaking2024,
      },
      {
        path: "/2024/Test 3/speaking",
        Component: Test3Speaking2024,
      },
      {
        path: "/2024/Test 4/speaking",
        Component: Test4Speaking2024,
      },
      {
        path: "/2023/Test 1/listening",
        Component: Test1Listening2023,
      },
      {
        path: "/2023/Test 2/listening",
        Component: Test2Listening2023,
      },
      {
        path: "/2023/Test 3/listening",
        Component: Test3Listening2023,
      },
      {
        path: "/2023/Test 4/listening",
        Component: Test4Listening2023,
      },
      {
        path: "/2023/Test 1/reading",
        Component: Test1Reading2023,
      },
      {
        path: "/2023/Test 2/reading",
        Component: Test2Reading2023,
      },
      {
        path: "/2023/Test 3/reading",
        Component: Test3Reading2023,
      },
      {
        path: "/2023/Test 4/reading",
        Component: Test4Reading2023,
      },
      {
        path: "/2023/Test 1/writing",
        Component: Test1Writing2023,
      },
      {
        path: "/2023/Test 2/writing",
        Component: Test2Writing2023,
      },
      {
        path: "/2023/Test 3/writing",
        Component: Test3Writing2023,
      },
      {
        path: "/2023/Test 4/writing",
        Component: Test4Writing2023,
      },
      {
        path: "/2023/Test 1/speaking",
        Component: Test1Speaking2023,
      },
      {
        path: "/2023/Test 2/speaking",
        Component: Test2Speaking2023,
      },
      {
        path: "/2023/Test 3/speaking",
        Component: Test3Speaking2023,
      },
      {
        path: "/2023/Test 4/speaking",
        Component: Test4Speaking2023,
      },
      {
        path: "/2022/Test 1/listening",
        Component: Test1Listening2022,
      },
      {
        path: "/2022/Test 2/listening",
        Component: Test2Listening2022,
      },
      {
        path: "/2022/Test 3/listening",
        Component: Test3Listening2022,
      },
      {
        path: "/2022/Test 4/listening",
        Component: Test4Listening2022,
      },
      {
        path: "/2022/Test 1/reading",
        Component: Test1Reading2022,
      },
      {
        path: "/2022/Test 2/reading",
        Component: Test2Reading2022,
      },
      {
        path: "/2022/Test 3/reading",
        Component: Test3Reading2022,
      },
      {
        path: "/2022/Test 4/reading",
        Component: Test4Reading2022,
      },
      {
        path: "/2022/Test 1/writing",
        Component: Test1Writing2022,
      },
      {
        path: "/2022/Test 2/writing",
        Component: Test2Writing2022,
      },
      {
        path: "/2022/Test 3/writing",
        Component: Test3Writing2022,
      },
      {
        path: "/2022/Test 4/writing",
        Component: Test4Writing2022,
      },
      {
        path: "/2022/Test 1/speaking",
        Component: Test1Speaking2022,
      },
      {
        path: "/2022/Test 2/speaking",
        Component: Test2Speaking2022,
      },
      {
        path: "/2022/Test 3/speaking",
        Component: Test3Speaking2022,
      },
      {
        path: "/2022/Test 4/speaking",
        Component: Test4Speaking2022,
      },
      {
        path: "/2021/test 1/listening",
        Component: Test1Listening2021,
      },
      {
        path: "/2021/Test 2/listening",
        Component: Test2Listening2021,
      },
      {
        path: "/2021/Test 3/listening",
        Component: Test3Listening2021,
      },
      {
        path: "/2021/Test 4/listening",
        Component: Test4Listening2021,
      },
      {
        path: "/2021/Test 1/reading",
        Component: Test1Reading2021,
      },
      {
        path: "/2021/Test 2/reading",
        Component: Test2Reading2021,
      },
      {
        path: "/2021/Test 3/reading",
        Component: Test3Reading2021,
      },
      {
        path: "/2021/Test 4/reading",
        Component: Test4Reading2021,
      },
      {
        path: "/2021/Test 1/writing",
        Component: Test1Writing2021,
      },
      {
        path: "/2021/Test 2/writing",
        Component: Test2Writing2021,
      },
      {
        path: "/2021/Test 3/writing",
        Component: Test3Writing2021,
      },
      {
        path: "/2021/Test 4/writing",
        Component: Test4Writing2021,
      },
      {
        path: "/2021/Test 1/speaking",
        Component: Test1Speaking2021,
      },
      {
        path: "/2021/Test 2/speaking",
        Component: Test2Speaking2021,
      },
      {
        path: "/2021/Test 3/speaking",
        Component: Test3Speaking2021,
      },
      {
        path: "/2021/Test 4/speaking",
        Component: Test4Speaking2021,
      },

      {
        path: "/2020/test 1/listening",
        Component: Test1Listening2020,
      },
      {
        path: "/2020/Test 2/listening",
        Component: Test2Listening2020,
      },
      {
        path: "/2020/Test 3/listening",
        Component: Test3Listening2020,
      },
      {
        path: "/2020/Test 4/listening",
        Component: Test4Listening2020,
      },
      {
        path: "/2020/Test 1/reading",
        Component: Test1Reading2020,
      },
      {
        path: "/2020/Test 2/reading",
        Component: Test2Reading2020,
      },
      {
        path: "/2020/Test 3/reading",
        Component: Test3Reading2020,
      },
      {
        path: "/2020/Test 4/reading",
        Component: Test4Reading2020,
      },
      {
        path: "/2020/Test 1/writing",
        Component: Test1Writing2020,
      },
      {
        path: "/2020/Test 2/writing",
        Component: Test2Writing2020,
      },
      {
        path: "/2020/Test 3/writing",
        Component: Test3Writing2020,
      },
      {
        path: "/2020/Test 4/writing",
        Component: Test4Writing2020,
      },
      {
        path: "/2020/Test 1/speaking",
        Component: Test1Speaking2020,
      },
      {
        path: "/2020/Test 2/speaking",
        Component: Test2Speaking2020,
      },
      {
        path: "/2020/Test 3/speaking",
        Component: Test3Speaking2020,
      },
      {
        path: "/2020/Test 4/speaking",
        Component: Test4Speaking2020,
      },
      {
        path: "/2019/Test 1/listening",
        Component: Test1Listening2019,
      },
      {
        path: "/2019/Test 2/listening",
        Component: Test2Listening2019,
      },
      {
        path: "/2019/Test 3/listening",
        Component: Test3Listening2019,
      },
      {
        path: "/2019/Test 4/listening",
        Component: Test4Listening2019,
      },
      {
        path: "/2019/Test 1/reading",
        Component: Test1Reading2019,
      },
      {
        path: "/2019/Test 2/reading",
        Component: Test2Reading2019,
      },
      {
        path: "/2019/Test 3/reading",
        Component: Test3Reading2019,
      },
      {
        path: "/2019/Test 4/reading",
        Component: Test4Reading2019,
      },
      {
        path: "/2019/Test 1/writing",
        Component: Test1Writing2019,
      },
      {
        path: "/2019/Test 2/writing",
        Component: Test2Writing2019,
      },
      {
        path: "/2019/Test 3/writing",
        Component: Test3Writing2019,
      },
      {
        path: "/2019/Test 4/writing",
        Component: Test4Writing2019,
      },
      {
        path: "/2019/Test 1/speaking",
        Component: Test1Speaking2019,
      },
    ],
  },
]);
