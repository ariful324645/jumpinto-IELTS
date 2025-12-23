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

import Listening1Pagination2020 from "../components/Academic 2020/Pagination/Listening1Pagination/listening1Pagination2020";
import Listening1Part22020 from "../components/Academic 2020/Listening/Listening1/Listening1Part22020";
import Listening1Part32020 from "../components/Academic 2020/Listening/Listening1/Listening1Part32020";
import Listening1Part42020 from "../components/Academic 2020/Listening/Listening1/Listening1Part42020";
import Listening2Part22020 from "../components/Academic 2020/Listening/Listening2/Listening2Part22020";
import Listening2Part32020 from "../components/Academic 2020/Listening/Listening2/Listening2Part32020";
import Listening2Part42020 from "../components/Academic 2020/Listening/Listening2/Listening2Part42020";
import Listening3Part22020 from "../components/Academic 2020/Listening/Listening3/Listening3Part22020";
import Listening3Part32020 from "../components/Academic 2020/Listening/Listening3/Listening3Part32020";
import Listening3Part42020 from "../components/Academic 2020/Listening/Listening3/Listening3Part42020";
import Listening4Part22020 from "../components/Academic 2020/Listening/Listening4/Listening4Part22020";
import Listening4Part32020 from "../components/Academic 2020/Listening/Listening4/Listening4Part32020";
import Listening4Part42020 from "../components/Academic 2020/Listening/Listening4/Listening4Part42020";
import Reading1Part22020 from "../components/Academic 2020/Reading/Reading1/Reading1Part22020";
import Reading1Part32020 from "../components/Academic 2020/Reading/Reading1/Reading1Part32020";
import Reading2Part22020 from "../components/Academic 2020/Reading/Reading2/Reading2Part22020";
import Reading2Part32020 from "../components/Academic 2020/Reading/Reading2/Reading2Part32020";
import Reading3Part22020 from "../components/Academic 2020/Reading/Reading3/Reading3Part22020";
import Reading3Part32020 from "../components/Academic 2020/Reading/Reading3/Reading3Part32020";
import Reading4Part22020 from "../components/Academic 2020/Reading/Reading4/Reading4Part22020";
import Reading4Part32020 from "../components/Academic 2020/Reading/Reading4/Reading4Part32020";
import Writing1Part22020 from "../components/Academic 2020/Writing/Writing1/Writing1Part22020";
import Writing2Part22020 from "../components/Academic 2020/Writing/Writing2/Writing2Part22020";
import Writing3Part22020 from "../components/Academic 2020/Writing/Writing3/Writing3Part22020";
import Writing4Part22020 from "../components/Academic 2020/Writing/Writing4/Writing4Part22020";
import Speaking1Part22020 from "../components/Academic 2020/Speaking/Speaking1/Speaking1Part22020";
import Speaking1Part32020 from "../components/Academic 2020/Speaking/Speaking1/Speaking1Part32020";
import Speaking2Part22020 from "../components/Academic 2020/Speaking/Speaking2/Speaking2Part22020";
import Speaking2Part32020 from "../components/Academic 2020/Speaking/Speaking2/Speaking2Part32020";
import Speaking3Part22020 from "../components/Academic 2020/Speaking/Speaking3/Speaking3Part22020";
import Speaking3Part32020 from "../components/Academic 2020/Speaking/Speaking3/Speaking3Part32020";
import Speaking4Part22020 from "../components/Academic 2020/Speaking/Speaking4/Speaking4Part22020";
import Speaking4Part32020 from "../components/Academic 2020/Speaking/Speaking4/Speaking4Part32020";
import Test2Speaking2019 from "../components/Academic 2019/Speaking/Test2Speaking2019";
import Test3Speaking2019 from "../components/Academic 2019/Speaking/Test3Speaking2019";
import Test4Speaking2019 from "../components/Academic 2019/Speaking/Test4Speaking2019";
import Listening1Part22019 from "../components/Academic 2019/Parts/Listening1Part22019";
import Listening1Part32019 from "../components/Academic 2019/Parts/Listening1Part32019";
import Listening1Part42019 from "../components/Academic 2019/Parts/Listening1Part42019";
import Listening2Part22019 from "../components/Academic 2019/Parts/Listening2Part22019";
import Listening2Part32019 from "../components/Academic 2019/Parts/Listening2Part32019";
import Listening2Part42019 from "../components/Academic 2019/Parts/Listening2Part42019";
import Listening3Part22019 from "../components/Academic 2019/Parts/Listening3Part22019";
import Listening3Part32019 from "../components/Academic 2019/Parts/Listening3Part32019";
import Listening3Part42019 from "../components/Academic 2019/Parts/Listening3Part42019";
import Listening4Part22019 from "../components/Academic 2019/Parts/Listening4Part22019";
import Listening4Part32019 from "../components/Academic 2019/Parts/Listening4Part32019";
import Listening4Part42019 from "../components/Academic 2019/Parts/Listening4Part42019";
import Reading1Part22019 from "../components/Academic 2019/Parts/Reading1Part22019";
import Reading1Part32019 from "../components/Academic 2019/Parts/Reading1Part32019";
import Reading2Part22019 from "../components/Academic 2019/Parts/Reading2Part22019";

import Reading2Part32019 from "../components/Academic 2019/Parts/Reading2Part32019";
import Reading3Part22019 from "../components/Academic 2019/Parts/Reading3Part22019";
import Reading3Part32019 from "../components/Academic 2019/Parts/Reading3Part32019";
import Reading4Part22019 from "../components/Academic 2019/Parts/Reading4Part22019";
import Reading4Part32019 from "../components/Academic 2019/Parts/Reading4Part32019";
import Writing1Part22019 from "../components/Academic 2019/Parts/Writing1Part22019";
import Writing2Part22019 from "../components/Academic 2019/Parts/Writing2Part22019";

import Writing3Part22019 from "../components/Academic 2019/Parts/Writing3Part22019";
import Writing4Part22019 from "../components/Academic 2019/Parts/Writing4Part22019";
import Speaking1Part22019 from "../components/Academic 2019/Parts/Speaking1Part22019";
import Speaking1Part32019 from "../components/Academic 2019/Parts/Speaking1Part32019";
import Speaking2Part22019 from "../components/Academic 2019/Parts/Speaking2Part22019";
import Speaking2Part32019 from "../components/Academic 2019/Parts/Speaking2Part32019";
import Speaking3Part22019 from "../components/Academic 2019/Parts/Speaking3Part22019";
import Speaking3Part32019 from "../components/Academic 2019/Parts/Speaking3Part32019";
import Speaking4Part22019 from "../components/Academic 2019/Parts/Speaking4Part22019";
import Speaking4Part32019 from "../components/Academic 2019/Parts/Speaking4Part32019";
import Test1Listening2018 from "../components/Academic 2018/Listening/Test1Listening2018";
import Test2Listening2018 from "../components/Academic 2018/Listening/Test2Listening2018";
import Test3Listening2018 from "../components/Academic 2018/Listening/Test3Listening2018";
import Test4Listening2018 from "../components/Academic 2018/Listening/Test4Listening2018";
import Test1Reading2018 from "../components/Academic 2018/Reading/Test1Reading2018";
import Test2Reading2018 from "../components/Academic 2018/Reading/Test2Reading2018";
import Test3Reading2018 from "../components/Academic 2018/Reading/Test3Reading2018";
import Test4Reading2018 from "../components/Academic 2018/Reading/Test4Reading2018";
import Test1Writing2018 from "../components/Academic 2018/Writing2018/Test1Writing2018";
import Test2Writing2018 from "../components/Academic 2018/Writing2018/Test2Writing2018";
import Test3Writing2018 from "../components/Academic 2018/Writing2018/Test3Writing2018";
import Test4Writing2018 from "../components/Academic 2018/Writing2018/Test4Writing2018";
import Test1Speaking2018 from "../components/Academic 2018/Speaking/Test1Speaking2018";
import Test2Speaking2018 from "../components/Academic 2018/Speaking/Test2Speaking2018";
import Test3Speaking2018 from "../components/Academic 2018/Speaking/Test3Speaking2018";
import Test4Speaking2018 from "../components/Academic 2018/Speaking/Test4Speaking2018";
import Listening1Part22018 from "../components/Academic 2018/Parts/Listening1Part22018";
import Listening1Part32018 from "../components/Academic 2018/Parts/Listening1Part32018";
import Listening1Part42018 from "../components/Academic 2018/Parts/Listening1Part42018";
import Listening2Part22018 from "../components/Academic 2018/Parts/Listening2Part22018";
import Listening2Part32018 from "../components/Academic 2018/Parts/Listening2Part32018";
import Listening2Part42018 from "../components/Academic 2018/Parts/Listening2Part42018";
import Listening3Part22018 from "../components/Academic 2018/Parts/Listening3Part22018";
import Listening3Part32018 from "../components/Academic 2018/Parts/Listening3Part32018";
import Listening3Part42018 from "../components/Academic 2018/Parts/Listening3Part42018";
import Listening4Part22018 from "../components/Academic 2018/Parts/Listening4Part22018";
import Listening4Part32018 from "../components/Academic 2018/Parts/Listening4Part32018";
import Listening4Part42018 from "../components/Academic 2018/Parts/Listening4Part42018";
import Reading1Part22018 from "../components/Academic 2018/Parts/Reading1Part22018";
import Reading1Part32018 from "../components/Academic 2018/Parts/Reading1Part32018";
import Reading2Part22018 from "../components/Academic 2018/Parts/Reading2Part22018";
import Reading2Part32018 from "../components/Academic 2018/Parts/Reading2Part32018";
import Reading3Part22018 from "../components/Academic 2018/Parts/Reading3Part22018";
import Reading3Part32018 from "../components/Academic 2018/Parts/Reading3Part32018";
import Reading4Part22018 from "../components/Academic 2018/Parts/Reading4Part22018";
import Reading4Part32018 from "../components/Academic 2018/Parts/Reading4Part32018";
import Writing1Part22018 from "../components/Academic 2018/Parts/Writing1Part22018";
import Writing2Part22018 from "../components/Academic 2018/Parts/Writing2Part22018";
import Writing3Part22018 from "../components/Academic 2018/Parts/Writing3Part22018";
import Writing4Part22018 from "../components/Academic 2018/Parts/Writing4Part22018";
import Speaking1Part22018 from "../components/Academic 2018/Parts/Speaking1Part22018";
import Speaking1Part32018 from "../components/Academic 2018/Parts/Speaking1Part32018";
import Speaking2Part22018 from "../components/Academic 2018/Parts/Speaking2Part22018";
import Speaking2Part32018 from "../components/Academic 2018/Parts/Speaking2Part32018";
import Speaking3Part22018 from "../components/Academic 2018/Parts/Speaking3Part22018";
import Speaking3Part32018 from "../components/Academic 2018/Parts/Speaking3Part32018";
import Speaking4Part22018 from "../components/Academic 2018/Parts/Speaking4Part22018";
import Speaking4Part32018 from "../components/Academic 2018/Parts/Speaking4Part32018";

import Test1Listening2017 from "../components/Academic 2017/Listening/Test1Listening2017";
import Test3Listening2017 from "../components/Academic 2017/Listening/Test3Listening2017";
import Test2Listening2017 from "../components/Academic 2017/Listening/Test2Listening2017";
import Test4Listening2017 from "../components/Academic 2017/Listening/Test4Listening2017";
import Test1Reading2017 from "../components/Academic 2017/Reading/Test1Reading2017";
import Test2Reading2017 from "../components/Academic 2017/Reading/Test2Reading2017";
import Test3Reading2017 from "../components/Academic 2017/Reading/Test3Reading2017";
import Test4Reading2017 from "../components/Academic 2017/Reading/Test4Reading2017";
import Test1Writing2017 from "../components/Academic 2017/Writing/Test1Writing2017";
import Test2Writing2017 from "../components/Academic 2017/Writing/Test2Writing2017";
import Test3Writing2017 from "../components/Academic 2017/Writing/Test3Writing2017";
import Test4Writing2017 from "../components/Academic 2017/Writing/Test4Writing2017";
import Test1Speaking2017 from "../components/Academic 2017/Speaking/Test1Speaking2017";
import Test2Speaking2017 from "../components/Academic 2017/Speaking/Test2Speaking2017";
import Test3Speaking2017 from "../components/Academic 2017/Speaking/Test3Speaking2017";
import Test4Speaking2017 from "../components/Academic 2017/Speaking/Test4Speaking2017";
import Listening1Part22017 from "../components/Academic 2017/Parts/Listening1Part22017";
import Listening1Part32017 from "../components/Academic 2017/Parts/Listening1Part32017";
import Listening1Part42017 from "../components/Academic 2017/Parts/Listening1Part42017";
import Listening2Part22017 from "../components/Academic 2017/Parts/Listening2Part22017";
import Listening2Part32017 from "../components/Academic 2017/Parts/Listening2Part32017";
import Listening2Part42017 from "../components/Academic 2017/Parts/Listening2Part42017";
import Listening3Part22017 from "../components/Academic 2017/Parts/Listening3Part22017";
import Listening3Part32017 from "../components/Academic 2017/Parts/Listening3Part32017";
import Listening3Part42017 from "../components/Academic 2017/Parts/Listening3Part42017";
import Listening4Part22017 from "../components/Academic 2017/Parts/Listening4Part22017";
import Listening4Part32017 from "../components/Academic 2017/Parts/Listening4Part32017";
import Listening4Part42017 from "../components/Academic 2017/Parts/Listening4Part42017";
import Reading1Part22017 from "../components/Academic 2017/Parts/Reading1Part22017";
import Reading1Part32017 from "../components/Academic 2017/Parts/Reading1Part32017";
import Reading2Part22017 from "../components/Academic 2017/Parts/Reading2Part22017";
import Reading2Part32017 from "../components/Academic 2017/Parts/Reading2Part32017";
import Reading3Part22017 from "../components/Academic 2017/Parts/Reading3Part22017";
import Reading3Part32017 from "../components/Academic 2017/Parts/Reading3Part32017";
import Reading4Part22017 from "../components/Academic 2017/Parts/Reading4Part22017";
import Reading4Part32017 from "../components/Academic 2017/Parts/Reading4Part32017";
import Writing1Part22017 from "../components/Academic 2017/Parts/Writing1Part22017";
import Writing2Part22017 from "../components/Academic 2017/Parts/Writing2Part22017";
import Writing3Part22017 from "../components/Academic 2017/Parts/Writing3Part22017";
import Writing4Part22017 from "../components/Academic 2017/Parts/Writing4Part22017";
import Speaking1Part22017 from "../components/Academic 2017/Parts/Speaking1Part22017";
import Speaking1Part32017 from "../components/Academic 2017/Parts/Speaking1Part32017";
import Speaking2Part22017 from "../components/Academic 2017/Parts/Speaking2Part22017";
import Speaking2Part32017 from "../components/Academic 2017/Parts/Speaking2Part32017";
import Speaking3Part22017 from "../components/Academic 2017/Parts/Speaking3Part22017";
import Speaking3Part32017 from "../components/Academic 2017/Parts/Speaking3Part32017";
import Speaking4Part22017 from "../components/Academic 2017/Parts/Speaking4Part22017";
import Speaking4Part32017 from "../components/Academic 2017/Parts/Speaking4Part32017";
import Test1Listening2016 from "../components/Academic 2016/Listening/Test1Listening2016";
import Test2Listening2016 from "../components/Academic 2016/Listening/Test2Listening2016";
import Test3Listening2016 from "../components/Academic 2016/Listening/Test3Listening2016";
import Test4Listening2016 from "../components/Academic 2016/Listening/Test4Listening2016";
import Test1Reading2016 from "../components/Academic 2016/Reading/Test1Reading2016";
import Test2Reading2016 from "../components/Academic 2016/Reading/Test2Reading2016";
import Test3Reading2016 from "../components/Academic 2016/Reading/Test3Reading2016";
import Test4Reading2016 from "../components/Academic 2016/Reading/Test4Reading2016";
import Test1Writing2016 from "../components/Academic 2016/Writing/Test1Writing2016";
import Test2Writng2016 from "../components/Academic 2016/Writing/Test2Writng2016";
import Test3Writing2016 from "../components/Academic 2016/Writing/Test3Writing2016";
import Test4Writng2016 from "../components/Academic 2016/Writing/Test4Writng2016";
import Test1Speaking2016 from "../components/Academic 2016/Speaking/Test1Speaking2016";
import Test2Speaking2016 from "../components/Academic 2016/Speaking/Test2Speaking2016";
import Test3Speaking2016 from "../components/Academic 2016/Speaking/Test3Speaking2016";
import Test4Speaking2016 from "../components/Academic 2016/Speaking/Test4Speaking2016";
import Listening1Part22016 from "../components/Academic 2016/Parts/Listening1Part22016";
import Listening1Part32016 from "../components/Academic 2016/Parts/Listening1Part32016";
import Listening1Part42016 from "../components/Academic 2016/Parts/Listening1Part42016";
import Listening2Part22016 from "../components/Academic 2016/Parts/Listening2Part22016";
import Listening2Part32016 from "../components/Academic 2016/Parts/Listening2Part32016";
import Listening2Part42016 from "../components/Academic 2016/Parts/Listening2Part42016";
import Listening3Part22016 from "../components/Academic 2016/Parts/Listening3Part22016";
import Listening3Part32016 from "../components/Academic 2016/Parts/Listening3Part32016";
import Listening3Part42016 from "../components/Academic 2016/Parts/Listening3Part42016";
import Reading1Part22016 from "../components/Academic 2016/Parts/Reading1Part22016";
import Reading1Part32016 from "../components/Academic 2016/Parts/Reading1Part32016";
import Listening4Part22016 from "../components/Academic 2016/Parts/Listening4Part22016";
import Listening4Part32016 from "../components/Academic 2016/Parts/Listening4Part32016";
import Test1Listening2015 from "../components/Academic 2015/Listening/Test1Listening2015";
import Listening1Part22015 from "../components/Academic 2015/Parts/Listening1Part22015";
import Listening1Part32015 from "../components/Academic 2015/Parts/Listening1Part32015";
import Listening1Part42015 from "../components/Academic 2015/Parts/Listening1Part42015";
import Test2Listening2015 from "../components/Academic 2015/Listening/Test2Listening2015";
import Test3Listening2015 from "../components/Academic 2015/Listening/Test3Listening2015";
import Test4Listening2015 from "../components/Academic 2015/Listening/Test4Listening2015";
import Test1Reading2015 from "../components/Academic 2015/Reading/Test1Reading2015";
import Test2Reading2015 from "../components/Academic 2015/Reading/Test2Reading2015";
import Test4Reading2015 from "../components/Academic 2015/Reading/Test4Reading2015";
import Test3Reading2015 from "../components/Academic 2015/Reading/Test3Reading2015";
import Test1Writing2015 from "../components/Academic 2015/Writing/Test1Writing2015";
import Test2Writing2015 from "../components/Academic 2015/Writing/Test2Writing2015";

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
        path: "/listening1Pagination",
        Component: Listening1Pagination2020,
      },
      {
        path: "/listening1Part22020",
        Component: Listening1Part22020,
      },
      {
        path: "/listening1Part32020",
        Component: Listening1Part32020,
      },
      {
        path: "/listening1Part42020",
        Component: Listening1Part42020,
      },
      {
        path: "/2020/Test 2/listening",
        Component: Test2Listening2020,
      },
      {
        path: "/listening2Part22020",
        Component: Listening2Part22020,
      },
      {
        path: "/listening2Part32020",
        Component: Listening2Part32020,
      },
      {
        path: "/listening2Part42020",
        Component: Listening2Part42020,
      },
      {
        path: "/2020/Test 3/listening",
        Component: Test3Listening2020,
      },
      {
        path: "/listening3Part22020",
        Component: Listening3Part22020,
      },
      {
        path: "/listening3Part32020",
        Component: Listening3Part32020,
      },
      {
        path: "/listening3Part42020",
        Component: Listening3Part42020,
      },

      {
        path: "/2020/Test 4/listening",
        Component: Test4Listening2020,
      },
      {
        path: "/listening4Part22020",
        Component: Listening4Part22020,
      },
      {
        path: "/listening4Part32020",
        Component: Listening4Part32020,
      },
      {
        path: "/listening4Part42020",
        Component: Listening4Part42020,
      },

      {
        path: "/2020/Test 1/reading",
        Component: Test1Reading2020,
      },
      {
        path: "/Reading1Part22020",
        Component: Reading1Part22020,
      },
      {
        path: "/Reading1Part32020",
        Component: Reading1Part32020,
      },
      {
        path: "/2020/Test 2/reading",
        Component: Test2Reading2020,
      },
      {
        path: "/Reading2Part22020",
        Component: Reading2Part22020,
      },
      {
        path: "/Reading2Part32020",
        Component: Reading2Part32020,
      },
      {
        path: "/2020/Test 3/reading",
        Component: Test3Reading2020,
      },
      {
        path: "/Reading3Part22020",
        Component: Reading3Part22020,
      },
      {
        path: "/Reading3Part32020",
        Component: Reading3Part32020,
      },
      {
        path: "/2020/Test 4/reading",
        Component: Test4Reading2020,
      },
      {
        path: "/Reading4Part22020",
        Component: Reading4Part22020,
      },
      {
        path: "/Reading4Part32020",
        Component: Reading4Part32020,
      },
      {
        path: "/2020/Test 1/writing",
        Component: Test1Writing2020,
      },
      {
        path: "/Writing1Part22020",
        Component: Writing1Part22020,
      },
      {
        path: "/2020/Test 2/writing",
        Component: Test2Writing2020,
      },
      {
        path: "/Writing2Part22020",
        Component: Writing2Part22020,
      },
      {
        path: "/2020/Test 3/writing",
        Component: Test3Writing2020,
      },
      {
        path: "/Writing3Part22020",
        Component: Writing3Part22020,
      },
      {
        path: "/2020/Test 4/writing",
        Component: Test4Writing2020,
      },
      {
        path: "/Writing4Part22020",
        Component: Writing4Part22020,
      },
      {
        path: "/2020/Test 1/speaking",
        Component: Test1Speaking2020,
      },
      {
        path: "/Speaking1Part22020",
        Component: Speaking1Part22020,
      },
      {
        path: "/Speaking1Part32020",
        Component: Speaking1Part32020,
      },
      {
        path: "/2020/Test 2/speaking",
        Component: Test2Speaking2020,
      },
      {
        path: "/Speaking2Part22020",
        Component: Speaking2Part22020,
      },
      {
        path: "/Speaking2Part32020",
        Component: Speaking2Part32020,
      },
      {
        path: "/2020/Test 3/speaking",
        Component: Test3Speaking2020,
      },
      {
        path: "/Speaking3Part22020",
        Component: Speaking3Part22020,
      },
      {
        path: "/Speaking3Part32020",
        Component: Speaking3Part32020,
      },
      {
        path: "/2020/Test 4/speaking",
        Component: Test4Speaking2020,
      },
      {
        path: "/Speaking4Part22020",
        Component: Speaking4Part22020,
      },
      {
        path: "/Speaking4Part32020",
        Component: Speaking4Part32020,
      },

      {
        path: "/2019/Test 1/listening",
        Component: Test1Listening2019,
      },
      {
        path: "/listening1Part22019",
        Component: Listening1Part22019,
      },
      {
        path: "/listening1Part32019",
        Component: Listening1Part32019,
      },
      {
        path: "/listening1Part42019",
        Component: Listening1Part42019,
      },
      {
        path: "/2019/Test 2/listening",
        Component: Test2Listening2019,
      },
      {
        path: "/listening2Part22019",
        Component: Listening2Part22019,
      },
      {
        path: "/listening2Part32019",
        Component: Listening2Part32019,
      },
      {
        path: "/listening2Part42019",
        Component: Listening2Part42019,
      },
      {
        path: "/2019/Test 3/listening",
        Component: Test3Listening2019,
      },
      {
        path: "/listening3Part22019",
        Component: Listening3Part22019,
      },
      {
        path: "/listening3Part32019",
        Component: Listening3Part32019,
      },
      {
        path: "/listening3Part42019",
        Component: Listening3Part42019,
      },
      {
        path: "/2019/Test 4/listening",
        Component: Test4Listening2019,
      },
      {
        path: "/listening4Part22019",
        Component: Listening4Part22019,
      },
      {
        path: "/listening4Part32019",
        Component: Listening4Part32019,
      },
      {
        path: "/listening4Part42019",
        Component: Listening4Part42019,
      },

      {
        path: "/2019/Test 1/reading",
        Component: Test1Reading2019,
      },
      {
        path: "/reading1Part22019",
        Component: Reading1Part22019,
      },
      {
        path: "/reading1Part32019",
        Component: Reading1Part32019,
      },
      {
        path: "/2019/Test 2/reading",
        Component: Test2Reading2019,
      },
      {
        path: "/reading2Part22019",
        Component: Reading2Part22019,
      },
      {
        path: "/reading2Part32019",
        Component: Reading2Part32019,
      },
      {
        path: "/2019/Test 3/reading",
        Component: Test3Reading2019,
      },
      {
        path: "/reading3Part22019",
        Component: Reading3Part22019,
      },
      {
        path: "/reading3Part32019",
        Component: Reading3Part32019,
      },
      {
        path: "/2019/Test 4/reading",
        Component: Test4Reading2019,
      },
      {
        path: "/reading4Part22019",
        Component: Reading4Part22019,
      },
      {
        path: "/reading4Part32019",
        Component: Reading4Part32019,
      },
      {
        path: "/2019/Test 1/writing",
        Component: Test1Writing2019,
      },
      {
        path: "/writing1Part22019",
        Component: Writing1Part22019,
      },
      {
        path: "/2019/Test 2/writing",
        Component: Test2Writing2019,
      },
      {
        path: "/writing2Part22019",
        Component: Writing2Part22019,
      },
      {
        path: "/2019/Test 3/writing",
        Component: Test3Writing2019,
      },
      {
        path: "/writing3Part22019",
        Component: Writing3Part22019,
      },
      {
        path: "/2019/Test 4/writing",
        Component: Test4Writing2019,
      },
      {
        path: "/writing4Part22019",
        Component: Writing4Part22019,
      },
      {
        path: "/2019/Test 1/speaking",
        Component: Test1Speaking2019,
      },
      {
        path: "/speaking1Part22019",
        Component: Speaking1Part22019,
      },
      {
        path: "/speaking1Part32019",
        Component: Speaking1Part32019,
      },
      {
        path: "/2019/Test 2/speaking",
        Component: Test2Speaking2019,
      },
      {
        path: "/speaking2Part22019",
        Component: Speaking2Part22019,
      },
      {
        path: "/speaking2Part32019",
        Component: Speaking2Part32019,
      },
      {
        path: "/2019/Test 3/speaking",
        Component: Test3Speaking2019,
      },
      {
        path: "/speaking3Part22019",
        Component: Speaking3Part22019,
      },
      {
        path: "/speaking3Part32019",
        Component: Speaking3Part32019,
      },
      {
        path: "/2019/Test 4/speaking",
        Component: Test4Speaking2019,
      },
      {
        path: "/speaking4Part22019",
        Component: Speaking4Part22019,
      },
      {
        path: "/speaking4Part32019",
        Component: Speaking4Part32019,
      },
      // 2018
      {
        path: "/2018/Test 1/listening",
        Component: Test1Listening2018,
      },
      {
        path: "/listening1Part22018",
        Component: Listening1Part22018,
      },
      {
        path: "/listening1Part32018",
        Component: Listening1Part32018,
      },
      {
        path: "/listening1Part42018",
        Component: Listening1Part42018,
      },

      {
        path: "/2018/Test 2/listening",
        Component: Test2Listening2018,
      },
      {
        path: "/listening2Part22018",
        Component: Listening2Part22018,
      },
      {
        path: "/listening2Part32018",
        Component: Listening2Part32018,
      },
      {
        path: "/listening2Part42018",
        Component: Listening2Part42018,
      },
      {
        path: "/2018/Test 3/listening",
        Component: Test3Listening2018,
      },
      {
        path: "/listening3Part22018",
        Component: Listening3Part22018,
      },
      {
        path: "/listening3Part32018",
        Component: Listening3Part32018,
      },
      {
        path: "/listening3Part42018",
        Component: Listening3Part42018,
      },
      {
        path: "/2018/Test 4/listening",
        Component: Test4Listening2018,
      },
      {
        path: "/listening4Part22018",
        Component: Listening4Part22018,
      },
      {
        path: "/listening4Part32018",
        Component: Listening4Part32018,
      },
      {
        path: "/listening4Part42018",
        Component: Listening4Part42018,
      },
      {
        path: "/2018/Test 1/reading",
        Component: Test1Reading2018,
      },
      {
        path: "/reading1Part22018",
        Component: Reading1Part22018,
      },
      {
        path: "/reading1Part32018",
        Component: Reading1Part32018,
      },
      {
        path: "/2018/Test 2/reading",
        Component: Test2Reading2018,
      },
      {
        path: "/reading2Part22018",
        Component: Reading2Part22018,
      },
      {
        path: "/reading2Part32018",
        Component: Reading2Part32018,
      },
      {
        path: "/2018/Test 3/reading",
        Component: Test3Reading2018,
      },
      {
        path: "/reading3Part22018",
        Component: Reading3Part22018,
      },
      {
        path: "/reading3Part32018",
        Component: Reading3Part32018,
      },
      {
        path: "/2018/Test 4/reading",
        Component: Test4Reading2018,
      },
      {
        path: "/reading4Part22018",
        Component: Reading4Part22018,
      },
      {
        path: "/reading4Part32018",
        Component: Reading4Part32018,
      },
      {
        path: "/2018/Test 1/writing",
        Component: Test1Writing2018,
      },
      {
        path: "/writing1Part22018",
        Component: Writing1Part22018,
      },
      {
        path: "/2018/Test 2/writing",
        Component: Test2Writing2018,
      },
      {
        path: "/writing2Part22018",
        Component: Writing2Part22018,
      },
      {
        path: "/2018/Test 3/writing",
        Component: Test3Writing2018,
      },
      {
        path: "/writing3Part22018",
        Component: Writing3Part22018,
      },
      {
        path: "/writing4Part22018",
        Component: Writing4Part22018,
      },
      {
        path: "/2018/Test 4/writing",
        Component: Test4Writing2018,
      },
      {
        path: "/2018/Test 1/speaking",
        Component: Test1Speaking2018,
      },
      {
        path: "/speaking1Part22018",
        Component: Speaking1Part22018,
      },
      {
        path: "/speaking1Part32018",
        Component: Speaking1Part32018,
      },
      {
        path: "/2018/Test 2/speaking",
        Component: Test2Speaking2018,
      },
      {
        path: "/speaking2Part22018",
        Component: Speaking2Part22018,
      },
      {
        path: "/speaking2Part32018",
        Component: Speaking2Part32018,
      },
      {
        path: "/2018/Test 3/speaking",
        Component: Test3Speaking2018,
      },
      {
        path: "/speaking3Part22018",
        Component: Speaking3Part22018,
      },
      {
        path: "/speaking3Part32018",
        Component: Speaking3Part32018,
      },
      {
        path: "/2018/Test 4/speaking",
        Component: Test4Speaking2018,
      },
      {
        path: "/speaking4Part22018",
        Component: Speaking4Part22018,
      },
      {
        path: "/speaking4Part32018",
        Component: Speaking4Part32018,
      },

      // 2017
      {
        path: "/2017/Test 1/listening",
        Component: Test1Listening2017,
      },
      {
        path: "/listening1Part22017",
        Component: Listening1Part22017,
      },
      {
        path: "/listening1Part32017",
        Component: Listening1Part32017,
      },
      {
        path: "/listening1Part42017",
        Component: Listening1Part42017,
      },
      {
        path: "/2017/Test 2/listening",
        Component: Test2Listening2017,
      },
      {
        path: "/listening2Part22017",
        Component: Listening2Part22017,
      },
      {
        path: "/listening2Part32017",
        Component: Listening2Part32017,
      },
      {
        path: "/listening2Part42017",
        Component: Listening2Part42017,
      },
      {
        path: "/2017/Test 3/listening",
        Component: Test3Listening2017,
      },
      {
        path: "/listening3Part22017",
        Component: Listening3Part22017,
      },
      {
        path: "/listening3Part32017",
        Component: Listening3Part32017,
      },
      {
        path: "/listening3Part42017",
        Component: Listening3Part42017,
      },
      {
        path: "/2017/Test 4/listening",
        Component: Test4Listening2017,
      },
      {
        path: "/listening4Part22017",
        Component: Listening4Part22017,
      },
      {
        path: "/listening4Part32017",
        Component: Listening4Part32017,
      },
      {
        path: "/listening4Part42017",
        Component: Listening4Part42017,
      },
      {
        path: "/2017/Test 1/reading",
        Component: Test1Reading2017,
      },
      {
        path: "/reading1Part22017",
        Component: Reading1Part22017,
      },
      {
        path: "/reading1Part32017",
        Component: Reading1Part32017,
      },

      {
        path: "/2017/Test 2/reading",
        Component: Test2Reading2017,
      },
      {
        path: "/reading2Part22017",
        Component: Reading2Part22017,
      },
      {
        path: "/reading2Part32017",
        Component: Reading2Part32017,
      },
      {
        path: "/2017/Test 3/reading",
        Component: Test3Reading2017,
      },
      {
        path: "/reading3Part22017",
        Component: Reading3Part22017,
      },
      {
        path: "/reading3Part32017",
        Component: Reading3Part32017,
      },

      {
        path: "/2017/Test 4/reading",
        Component: Test4Reading2017,
      },
      {
        path: "/reading4Part22017",
        Component: Reading4Part22017,
      },
      {
        path: "/reading4Part32017",
        Component: Reading4Part32017,
      },
      {
        path: "/2017/Test 1/writing",
        Component: Test1Writing2017,
      },
      {
        path: "/writing1Part22017",
        Component: Writing1Part22017,
      },
      {
        path: "/2017/Test 2/writing",
        Component: Test2Writing2017,
      },
      {
        path: "/writing2Part22017",
        Component: Writing2Part22017,
      },
      {
        path: "/2017/Test 3/writing",
        Component: Test3Writing2017,
      },
      {
        path: "/writing3Part22017",
        Component: Writing3Part22017,
      },
      {
        path: "/2017/Test 4/writing",
        Component: Test4Writing2017,
      },
      {
        path: "/writing4Part22017",
        Component: Writing4Part22017,
      },
      {
        path: "/2017/Test 1/speaking",
        Component: Test1Speaking2017,
      },
      {
        path: "/speaking1Part22017",
        Component: Speaking1Part22017,
      },
      {
        path: "/speaking1Part32017",
        Component: Speaking1Part32017,
      },
      {
        path: "/2017/Test 2/speaking",
        Component: Test2Speaking2017,
      },
      {
        path: "/speaking2Part22017",
        Component: Speaking2Part22017,
      },
      {
        path: "/speaking2Part32017",
        Component: Speaking2Part32017,
      },
      {
        path: "/2017/Test 3/speaking",
        Component: Test3Speaking2017,
      },
      {
        path: "/speaking3Part22017",
        Component: Speaking3Part22017,
      },
      {
        path: "/speaking3Part32017",
        Component: Speaking3Part32017,
      },
      {
        path: "/2017/Test 4/speaking",
        Component: Test4Speaking2017,
      },
      {
        path: "/speaking4Part22017",
        Component: Speaking4Part22017,
      },
      {
        path: "/speaking4Part32017",
        Component: Speaking4Part32017,
      },
      {
        path: "/2016/Test 1/listening",
        Component: Test1Listening2016,
      },
      {
        path: "/listening1Part22016",
        Component: Listening1Part22016,
      },
      {
        path: "/listening1Part32016",
        Component: Listening1Part32016,
      },
      {
        path: "/listening1Part42016",
        Component: Listening1Part42016,
      },
      {
        path: "/2016/Test 2/listening",
        Component: Test2Listening2016,
      },
      {
        path: "/listening2Part22016",
        Component: Listening2Part22016,
      },
      {
        path: "/listening2Part32016",
        Component: Listening2Part32016,
      },
      {
        path: "/listening2Part42016",
        Component: Listening2Part42016,
      },
      {
        path: "/2016/Test 3/listening",
        Component: Test3Listening2016,
      },
      {
        path: "/listening3Part22016",
        Component: Listening3Part22016,
      },
      {
        path: "/listening3Part32016",
        Component: Listening3Part32016,
      },
      {
        path: "/listening3Part42016",
        Component: Listening3Part42016,
      },
      {
        path: "/2016/Test 4/listening",
        Component: Test4Listening2016,
      },
      {
        path: "/listening4Part22016",
        Component: Listening4Part22016,
      },
      {
        path: "/listening4Part32016",
        Component: Listening4Part32016,
      },
      {
        path: "/2016/Test 1/reading",
        Component: Test1Reading2016,
      },
      {
        path: "/reading1Part22016",
        Component: Reading1Part22016,
      },
      {
        path: "/reading1Part32016",
        Component: Reading1Part32016,
      },
      {
        path: "/2016/Test 2/reading",
        Component: Test2Reading2016,
      },
      {
        path: "/2016/Test 3/reading",
        Component: Test3Reading2016,
      },
      {
        path: "/2016/Test 4/reading",
        Component: Test4Reading2016,
      },
      {
        path: "/2016/Test 1/writing",
        Component: Test1Writing2016,
      },
      {
        path: "/2016/Test 2/writing",
        Component: Test2Writng2016,
      },
      {
        path: "/2016/Test 3/writing",
        Component: Test3Writing2016,
      },
      {
        path: "/2016/Test 4/writing",
        Component: Test4Writng2016,
      },
      {
        path: "/2016/Test 1/speaking",
        Component: Test1Speaking2016,
      },
      {
        path: "/2016/Test 2/speaking",
        Component: Test2Speaking2016,
      },
      {
        path: "/2016/Test 3/speaking",
        Component: Test3Speaking2016,
      },
      {
        path: "/2016/Test 4/speaking",
        Component: Test4Speaking2016,
      },
      // 2015
      {
        path: "/2015/Test 1/listening",
        Component: Test1Listening2015,
      },
      {
        path: "/listening1Part22015",
        Component: Listening1Part22015,
      },
      {
        path: "/listening1Part32015",
        Component: Listening1Part32015,
      },
      {
        path: "/listening1Part42015",
        Component: Listening1Part42015,
      },
      {
        path: "/2015/Test 2/listening",
        Component: Test2Listening2015,
      },
      // {
      //   path: "/listening2Part22016",
      //   Component: Listening2Part22016,
      // },
      // {
      //   path: "/listening2Part32016",
      //   Component: Listening2Part32016,
      // },
      // {
      //   path: "/listening2Part42016",
      //   Component: Listening2Part42016,
      // },
      {
        path: "/2015/Test 3/listening",
        Component: Test3Listening2015,
      },
      // {
      //   path: "/listening3Part22016",
      //   Component: Listening3Part22016,
      // },
      // {
      //   path: "/listening3Part32016",
      //   Component: Listening3Part32016,
      // },
      // {
      //   path: "/listening3Part42016",
      //   Component: Listening3Part42016,
      // },
      {
        path: "/2015/Test 4/listening",
        Component: Test4Listening2015,
      },
      // {
      //   path: "/listening4Part22016",
      //   Component: Listening4Part22016,
      // },
      // {
      //   path: "/listening4Part32016",
      //   Component: Listening4Part32016,
      // },
      {
        path: "/2015/Test 1/reading",
        Component: Test1Reading2015,
      },
      // {
      //   path: "/reading1Part22016",
      //   Component: Reading1Part22016,
      // },
      // {
      //   path: "/reading1Part32016",
      //   Component: Reading1Part32016,
      // },
      {
        path: "/2015/Test 2/reading",
        Component: Test2Reading2015,
      },
      {
        path: "/2015/Test 3/reading",
        Component: Test3Reading2015,
      },
      {
        path: "/2015/Test 4/reading",
        Component: Test4Reading2015,
      },
      {
        path: "/2015/Test 1/writing",
        Component: Test1Writing2015,
      },
      {
        path: "/2015/Test 2/writing",
        Component: Test2Writing2015,
      },
      // {
      //   path: "/2016/Test 3/writing",
      //   Component: Test3Writing2016,
      // },
      // {
      //   path: "/2016/Test 4/writing",
      //   Component: Test4Writng2016,
      // },
      // {
      //   path: "/2016/Test 1/speaking",
      //   Component: Test1Speaking2016,
      // },
      // {
      //   path: "/2016/Test 2/speaking",
      //   Component: Test2Speaking2016,
      // },
      // {
      //   path: "/2016/Test 3/speaking",
      //   Component: Test3Speaking2016,
      // },
      // {
      //   path: "/2016/Test 4/speaking",
      //   Component: Test4Speaking2016,
      // },
    ],
  },
]);
