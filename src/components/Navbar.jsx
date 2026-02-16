import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { FaClock } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const location = useLocation();

  const [secondsLeft, setSecondsLeft] = useState(null);
  const [running, setRunning] = useState(false);
  const [showTimeOver, setShowTimeOver] = useState(false);

  // Define timer for each page
  const pathTimes = {
    //2024
    "/2025/test 1/listening": 8 * 60,
    "/2025/test 2/listening": 7 * 60 + 30,
    "/2025/test 3/listening": 8 * 60,
    "/2025/test 4/listening": 9 * 60,
    // listening part time
    "/listening1Part22025": 7 * 60 + 30,
    "/listening1Part32025": 8 * 60,
    "/listening1Part42025": 7 * 60,
    "/listening2Part22025": 8 * 60 + 30,
    "/listening2Part32025": 7 * 60 + 30,
    "/listening2Part42025": 8 * 60 + 30,
    "/listening3Part22025": 7 * 60 + 30,
    "/listening3Part32025": 8 * 60 + 30,
    "/listening3Part42025": 7 * 60 + 30,
    "/listening4Part22025": 8 * 60,
    "/listening4Part32025": 7 * 60 + 30,
    "/listening4Part42025": 8 * 60 + 30,

    //   reading
    "/2025/Test 1/reading": 20 * 60,
    "/2025/Test 2/reading": 20 * 60,
    "/2025/Test 3/reading": 20 * 60,
    "/2025/Test 4/reading": 20 * 60,
    // reading part time

    "/Reading1Part22025": 20 * 60,
    "/Reading1Part32025": 20 * 60,
    "/Reading2Part22025": 20 * 60,
    "/Reading2Part32025": 20 * 60,
    "/Reading3Part22025": 20 * 60,
    "/Reading3Part32025": 20 * 60,
    "/Reading4Part22025": 20 * 60,
    "/Reading4Part32025": 20 * 60,

    //  writing
    "/2025/Test 1/writing": 20 * 60,
    "/2025/Test 2/writing": 20 * 60,
    "/2025/Test 3/writing": 20 * 60,
    "/2025/Test 4/writing": 20 * 60,
    // writing part
    "/Writing1Part22025": 40 * 60,
    "/Writing2Part22025": 40 * 60,
    "/Writing3Part22025": 40 * 60,
    "/Writing4Part22025": 40 * 60,

    //2024
    "/2024/test 1/listening": 8 * 60,
    "/2024/test 2/listening": 7 * 60 + 30,
    "/2024/test 3/listening": 8 * 60,
    "/2024/test 4/listening": 8 * 60,
    // listening part time
    "/listening1Part22024": 7 * 60 + 30,
    "/listening1Part32024": 8 * 60,
    "/listening1Part42024": 7 * 60,
    "/listening2Part22024": 8 * 60 + 30,
    "/listening2Part32024": 7 * 60 + 30,
    "/listening2Part42024": 8 * 60 + 30,
    "/listening3Part22024": 7 * 60 + 30,
    "/listening3Part32024": 8 * 60 + 30,
    "/listening3Part42024": 9 * 60 + 30,
    "/listening4Part22024": 8 * 60,
    "/listening4Part32024": 7 * 60 + 30,
    "/listening4Part42024": 8 * 60 + 30,

    //   reading
    "/2024/Test 1/reading": 20 * 60,
    "/2024/Test 2/reading": 20 * 60,
    "/2024/Test 3/reading": 20 * 60,
    "/2024/Test 4/reading": 20 * 60,
    // reading part time

    "/Reading1Part22024": 20 * 60,
    "/Reading1Part32024": 20 * 60,
    "/Reading2Part22024": 20 * 60,
    "/Reading2Part32024": 20 * 60,
    "/Reading3Part22024": 20 * 60,
    "/Reading3Part32024": 20 * 60,
    "/Reading4Part22024": 20 * 60,
    "/Reading4Part32024": 20 * 60,

    //  writing
    "/2024/Test 1/writing": 20 * 60,
    "/2024/Test 2/writing": 20 * 60,
    "/2024/Test 3/writing": 20 * 60,
    "/2024/Test 4/writing": 20 * 60,
    // writing part
    "/Writing1Part22024": 40 * 60,
    "/Writing2Part22024": 40 * 60,
    "/Writing3Part22024": 40 * 60,
    "/Writing4Part22024": 40 * 60,

    //2023
    "/2023/test 1/listening": 8 * 60,
    "/2023/test 2/listening": 7 * 60 + 30,
    "/2023/test 3/listening": 8 * 60,
    "/2023/test 4/listening": 9 * 60,
    // listening part time
    "/listening1Part22023": 7 * 60 + 30,
    "/listening1Part32023": 8 * 60,
    "/listening1Part42023": 7 * 60,
    "/listening2Part22023": 7 * 60 + 30,
    "/listening2Part32023": 7 * 60 + 30,
    "/listening2Part42023": 8 * 60 + 30,
    "/listening3Part22023": 7 * 60 + 30,
    "/listening3Part32023": 8 * 60 + 30,
    "/listening3Part42023": 7 * 60 + 30,
    "/listening4Part22023": 8 * 60,
    "/listening4Part32023": 7 * 60 + 30,
    "/listening4Part42023": 8 * 60 + 30,

    //   reading
    "/2023/Test 1/reading": 20 * 60,
    "/2023/Test 2/reading": 20 * 60,
    "/2023/Test 3/reading": 20 * 60,
    "/2023/Test 4/reading": 20 * 60,
    // reading part time

    "/Reading1Part22023": 20 * 60,
    "/Reading1Part32023": 20 * 60,
    "/Reading2Part22023": 20 * 60,
    "/Reading2Part32023": 20 * 60,
    "/Reading3Part22023": 20 * 60,
    "/Reading3Part32023": 20 * 60,
    "/Reading4Part22023": 20 * 60,
    "/Reading4Part32023": 20 * 60,

    //  writing
    "/2023/Test 1/writing": 20 * 60,
    "/2023/Test 2/writing": 20 * 60,
    "/2023/Test 3/writing": 20 * 60,
    "/2023/Test 4/writing": 20 * 60,
    // writing part
    "/Writing1Part22023": 40 * 60,
    "/Writing2Part22023": 40 * 60,
    "/Writing3Part22023": 40 * 60,
    "/Writing4Part22023": 40 * 60,

    //2022
    "/2022/test 1/listening": 8 * 60,
    "/2022/test 2/listening": 7 * 60 + 30,
    "/2022/test 3/listening": 8 * 60,
    "/2022/test 4/listening": 7 * 60,
    // listening part time
    "/listening1Part22022": 7 * 60 + 30,
    "/listening1Part32022": 8 * 60,
    "/listening1Part42022": 7 * 60,
    "/listening2Part22022": 7 * 60 + 30,
    "/listening2Part32022": 7 * 60 + 30,
    "/listening2Part42022": 8 * 60 + 30,
    "/listening3Part22022": 9 * 60 + 30,
    "/listening3Part32022": 8 * 60 + 30,
    "/listening3Part42022": 7 * 60 + 30,
    "/listening4Part22022": 8 * 60,
    "/listening4Part32022": 7 * 60 + 30,
    "/listening4Part42022": 8 * 60 + 30,

    //   reading
    "/2022/Test 1/reading": 20 * 60,
    "/2022/Test 2/reading": 20 * 60,
    "/2022/Test 3/reading": 20 * 60,
    "/2022/Test 4/reading": 20 * 60,
    // reading part time

    "/Reading1Part22022": 20 * 60,
    "/Reading1Part32022": 20 * 60,
    "/Reading2Part22022": 20 * 60,
    "/Reading2Part32022": 20 * 60,
    "/Reading3Part22022": 20 * 60,
    "/Reading3Part32022": 20 * 60,
    "/Reading4Part22022": 20 * 60,
    "/Reading4Part32022": 20 * 60,

    //  writing
    "/2022/Test 1/writing": 20 * 60,
    "/2022/Test 2/writing": 20 * 60,
    "/2022/Test 3/writing": 20 * 60,
    "/2022/Test 4/writing": 20 * 60,
    // writing part
    "/Writing1Part22022": 40 * 60,
    "/Writing2Part22022": 40 * 60,
    "/Writing3Part22022": 40 * 60,
    "/Writing4Part22022": 40 * 60,

    // 2021  listening

    "/2021/test 1/listening": 8 * 60,
    "/2021/test 2/listening": 7 * 60 + 30,
    "/2021/test 3/listening": 9 * 60,
    "/2021/test 4/listening": 7 * 60,
    // listening part time
    "/listening1Part22021": 7 * 60 + 30,
    "/listening1Part32021": 8 * 60,
    "/listening1Part42021": 8 * 60,
    "/listening2Part22021": 7 * 60 + 30,
    "/listening2Part32021": 7 * 60 + 30,
    "/listening2Part42021": 8 * 60 + 30,
    "/listening3Part22021": 7 * 60 + 30,
    "/listening3Part32021": 8 * 60 + 30,
    "/listening3Part42021": 7 * 60 + 30,
    "/listening4Part22021": 8 * 60,
    "/listening4Part32021": 7 * 60 + 30,
    "/listening4Part42021": 7 * 60 + 30,

    // 2020  reading
    "/2021/Test 1/reading": 20 * 60,
    "/2021/Test 2/reading": 20 * 60,
    "/2021/Test 3/reading": 20 * 60,
    "/2021/Test 4/reading": 20 * 60,
    // reading part time

    "/Reading1Part22021": 20 * 60,
    "/Reading1Part32021": 20 * 60,
    "/Reading2Part22021": 20 * 60,
    "/Reading2Part32021": 20 * 60,
    "/Reading3Part22021": 20 * 60,
    "/Reading3Part32021": 20 * 60,
    "/Reading4Part22021": 20 * 60,
    "/Reading4Part32021": 20 * 60,

    // 2020 writing
    "/2021/Test 1/writing": 20 * 60,
    "/2021/Test 2/writing": 20 * 60,
    "/2021/Test 3/writing": 20 * 60,
    "/2021/Test 4/writing": 20 * 60,
    // writing part
    "/Writing1Part22021": 40 * 60,
    "/Writing2Part22021": 40 * 60,
    "/Writing3Part22021": 40 * 60,
    "/Writing4Part22021": 40 * 60,

    // 2020  listening

    "/2020/test 1/listening": 7 * 60,
    "/2020/test 2/listening": 7 * 60 + 30,
    "/2020/test 3/listening": 7 * 60,
    "/2020/test 4/listening": 7 * 60,
    // listening part time
    "/listening1Part22020": 7 * 60 + 30,
    "/listening1Part32020": 8 * 60,
    "/listening1Part42020": 9 * 60,
    "/listening2Part22020": 7 * 60 + 30,
    "/listening2Part32020": 7 * 60 + 30,
    "/listening2Part42020": 8 * 60 + 30,
    "/listening3Part22020": 7 * 60 + 30,
    "/listening3Part32020": 7 * 60 + 30,
    "/listening3Part42020": 7 * 60 + 30,
    "/listening4Part22020": 7 * 60,
    "/listening4Part32020": 7 * 60 + 30,
    "/listening4Part42020": 7 * 60 + 30,

    // 2020  reading
    "/2020/Test 1/reading": 20 * 60,
    "/2020/Test 2/reading": 20 * 60,
    "/2020/Test 3/reading": 20 * 60,
    "/2020/Test 4/reading": 20 * 60,
    // reading part time

    "/Reading1Part22020": 20 * 60,
    "/Reading1Part32020": 20 * 60,
    "/Reading2Part22020": 20 * 60,
    "/Reading2Part32020": 20 * 60,
    "/Reading3Part22020": 20 * 60,
    "/Reading3Part32020": 20 * 60,
    "/Reading4Part22020": 20 * 60,
    "/Reading4Part32020": 20 * 60,

    // 2020 writing
    "/2020/Test 1/writing": 20 * 60,
    "/2020/Test 2/writing": 20 * 60,
    "/2020/Test 3/writing": 20 * 60,
    "/2020/Test 4/writing": 20 * 60,
    // writing part
    "/Writing1Part22020": 40 * 60,
    "/Writing2Part22020": 40 * 60,
    "/Writing3Part22020": 40 * 60,
    "/Writing4Part22020": 40 * 60,

    // 2019  listening

    "/2019/test 1/listening": 8 * 60,

    "/2019/test 2/listening": 7 * 60,
    "/2019/test 3/listening": 8 * 60,
    "/2019/test 4/listening": 8 * 60,
    // listening part time
    "/listening1Part22019": 7 * 60,
    "/listening1Part32019": 7 * 60 + 30,
    "/listening1Part42019": 8 * 60 + 30,
    "/listening2Part22019": 8 * 60,
    "/listening2Part32019": 8 * 60,
    "/listening2Part42019": 9 * 60,
    "/listening3Part22019": 8 * 60,
    "/listening3Part32019": 8 * 60,
    "/listening3Part42019": 9 * 60 + 30,
    "/listening4Part22019": 7 * 60 + 30,
    "/listening4Part32019": 8 * 60,
    "/listening4Part42019": 9 * 60 + 30,
    // 2019  reading
    "/2019/Test 1/reading": 20 * 60,
    "/2019/Test 2/reading": 20 * 60,
    "/2019/Test 3/reading": 20 * 60,
    "/2019/Test 4/reading": 20 * 60,
    // reading part time

    "/Reading1Part22019": 20 * 60,
    "/Reading1Part32019": 20 * 60,
    "/Reading2Part22019": 20 * 60,
    "/Reading2Part32019": 20 * 60,
    "/Reading3Part22019": 20 * 60,
    "/Reading3Part32019": 20 * 60,
    "/Reading4Part22019": 20 * 60,
    "/Reading4Part32019": 20 * 60,
    // 2019 writing
    "/2019/Test 1/writing": 20 * 60,
    "/2019/Test 2/writing": 20 * 60,
    "/2019/Test 3/writing": 20 * 60,
    "/2019/Test 4/writing": 20 * 60,
    // writing part
    "/Writing1Part22019": 40 * 60,
    "/Writing2Part22019": 40 * 60,
    "/Writing3Part22019": 40 * 60,
    "/Writing4Part22019": 40 * 60,

    // 2018  listening

    "/2018/test 1/listening": 7 * 60,
    "/2018/test 2/listening": 8 * 60 + 30,
    "/2018/test 3/listening": 8 * 60 + 30,
    "/2018/test 4/listening": 7 * 60 + 30,
    // listening part time
    "/listening1Part22018": 7 * 60,
    "/listening1Part32018": 7 * 60 + 30,
    "/listening1Part42018": 7 * 60,
    "/listening2Part22018": 8 * 60,
    "/listening2Part32018": 7 * 60 + 30,
    "/listening2Part42018": 9 * 60 + 30,
    "/listening3Part22018": 7 * 60,
    "/listening3Part32018": 7 * 60,
    "/listening3Part42018": 7 * 60,
    "/listening4Part22018": 7 * 60,
    "/listening4Part32018": 8 * 60 + 30,
    "/listening4Part42018": 8 * 60 + 30,
    // 2018  reading
    "/2018/Test 1/reading": 20 * 60,
    "/2018/Test 2/reading": 20 * 60,
    "/2018/Test 3/reading": 20 * 60,
    "/2018/Test 4/reading": 20 * 60,
    // reading part time

    "/Reading1Part22018": 20 * 60,
    "/Reading1Part32018": 20 * 60,
    "/Reading2Part22018": 20 * 60,
    "/Reading2Part32018": 20 * 60,
    "/Reading3Part22018": 20 * 60,
    "/Reading3Part32018": 20 * 60,
    "/Reading4Part22018": 20 * 60,
    "/Reading4Part32018": 20 * 60,
    // 2018 writing
    "/2018/Test 1/writing": 20 * 60,
    "/2018/Test 2/writing": 20 * 60,
    "/2018/Test 3/writing": 20 * 60,
    "/2018/Test 4/writing": 20 * 60,
    // writing part
    "/Writing1Part22018": 40 * 60,
    "/Writing2Part22018": 40 * 60,
    "/Writing3Part22018": 40 * 60,
    "/Writing4Part22018": 40 * 60,
    // 2017  listening

    "/2017/test 1/listening": 7 * 60 + 30,
    "/2017/test 2/listening": 7 * 60,
    "/2017/test 3/listening": 7 * 60 + 30,
    "/2017/test 4/listening": 7 * 60 + 30,
    // listening part time
    "/listening1Part22017": 7 * 60,
    "/listening1Part32017": 7 * 60,
    "/listening1Part42017": 9 * 60 + 30,
    "/listening2Part22017": 8 * 60,
    "/listening2Part32017": 7 * 60 + 30,
    "/listening2Part42017": 9 * 60 + 30,
    "/listening3Part22017": 7 * 60,
    "/listening3Part32017": 8 * 60,
    "/listening3Part42017": 7 * 60,
    "/listening4Part22017": 7 * 60 + 30,
    "/listening4Part32017": 8 * 60 + 30,
    "/listening4Part42017": 8 * 60 + 30,
    // 2017  reading
    "/2017/Test 1/reading": 20 * 60,
    "/2017/Test 2/reading": 20 * 60,
    "/2017/Test 3/reading": 20 * 60,
    "/2017/Test 4/reading": 20 * 60,
    // reading part time

    "/Reading1Part22017": 20 * 60,
    "/Reading1Part32017": 20 * 60,
    "/Reading2Part22017": 20 * 60,
    "/Reading2Part32017": 20 * 60,
    "/Reading3Part22017": 20 * 60,
    "/Reading3Part32017": 20 * 60,
    "/Reading4Part22017": 20 * 60,
    "/Reading4Part32017": 20 * 60,
    // 2018 writing
    "/2017/Test 1/writing": 20 * 60,
    "/2017/Test 2/writing": 20 * 60,
    "/2017/Test 3/writing": 20 * 60,
    "/2017/Test 4/writing": 20 * 60,
    // writing part
    "/Writing1Part22017": 40 * 60,
    "/Writing2Part22017": 40 * 60,
    "/Writing3Part22017": 40 * 60,
    "/Writing4Part22017": 40 * 60,

    // 2016  listening

    "/2016/test 1/listening": 8 * 60 + 30,
    "/2016/test 2/listening": 8 * 60,
    "/2016/test 3/listening": 8 * 60 + 30,
    "/2016/test 4/listening": 7 * 60 + 30,
    // listening part time
    "/listening1Part22016": 7 * 60,
    "/listening1Part32016": 8 * 60,
    "/listening1Part42016": 9 * 60 + 30,
    "/listening2Part22016": 8 * 60,
    "/listening2Part32016": 7 * 60 + 30,
    "/listening2Part42016": 9 * 60 + 30,
    "/listening3Part22016": 7 * 60,
    "/listening3Part32016": 8 * 60,
    "/listening3Part42016": 7 * 60,
    "/listening4Part22016": 8 * 60 + 30,
    "/listening4Part32016": 8 * 60 + 30,
    "/listening4Part42016": 9 * 60 + 30,
    // 2016  reading
    "/2016/Test 1/reading": 20 * 60,
    "/2016/Test 2/reading": 20 * 60,
    "/2016/Test 3/reading": 20 * 60,
    "/2016/Test 4/reading": 20 * 60,
    // reading part time

    "/Reading1Part22016": 20 * 60,
    "/Reading1Part32016": 20 * 60,
    "/Reading2Part22016": 20 * 60,
    "/Reading2Part32016": 20 * 60,
    "/Reading3Part22016": 20 * 60,
    "/Reading3Part32016": 20 * 60,
    "/Reading4Part22016": 20 * 60,
    "/Reading4Part32016": 20 * 60,
    // 2016 writing
    "/2016/Test 1/writing": 20 * 60,
    "/2016/Test 2/writing": 20 * 60,
    "/2016/Test 3/writing": 20 * 60,
    "/2016/Test 4/writing": 20 * 60,
    // writing part
    "/Writing1Part22016": 40 * 60,
    "/Writing2Part22016": 40 * 60,
    "/Writing3Part22016": 40 * 60,
    "/Writing4Part22016": 40 * 60,

    // 2015  listening

    "/2015/test 1/listening": 7 * 60 + 30,
    "/2015/test 2/listening": 8 * 60,
    "/2015/test 3/listening": 7 * 60 + 30,
    "/2015/test 4/listening": 9 * 60 + 30,
    // listening part time
    "/listening1Part22015": 7 * 60,
    "/listening1Part32015": 7 * 60,
    "/listening1Part42015": 9 * 60 + 30,
    "/listening2Part22015": 8 * 60,
    "/listening2Part32015": 7 * 60 + 30,
    "/listening2Part42015": 9 * 60 + 30,
    "/listening3Part22015": 7 * 60,
    "/listening3Part32015": 8 * 60,
    "/listening3Part42015": 7 * 60,
    "/listening4Part22015": 7 * 60 + 30,
    "/listening4Part32015": 8 * 60 + 30,
    "/listening4Part42015": 8 * 60 + 30,
    // 2017  reading
    "/2015/Test 1/reading": 20 * 60,
    "/2015/Test 2/reading": 20 * 60,
    "/2015/Test 3/reading": 20 * 60,
    "/2015/Test 4/reading": 20 * 60,
    // reading part time

    "/Reading1Part22015": 20 * 60,
    "/Reading1Part32015": 20 * 60,
    "/Reading2Part22015": 20 * 60,
    "/Reading2Part32015": 20 * 60,
    "/Reading3Part22015": 20 * 60,
    "/Reading3Part32015": 20 * 60,
    "/Reading4Part22015": 20 * 60,
    "/Reading4Part32015": 20 * 60,
    // 2015 writing
    "/2015/Test 1/writing": 20 * 60,
    "/2015/Test 2/writing": 20 * 60,
    "/2015/Test 3/writing": 20 * 60,
    "/2015/Test 4/writing": 20 * 60,
    // writing part
    "/Writing1Part22015": 40 * 60,
    "/Writing2Part22015": 40 * 60,
    "/Writing3Part22015": 40 * 60,
    "/Writing4Part22015": 40 * 60,

    //2013
    // 2015  listening

    "/2013/test 1/listening": 7 * 60 + 30,
    "/2013/test 2/listening": 8 * 60,
    "/2013/test 3/listening": 7 * 60 + 30,
    "/2013/test 4/listening": 8 * 60 + 30,
    // li3tening part time
    "/listening1Part22013": 7 * 60,
    "/listening1Part32013": 7 * 60,
    "/listening1Part42013": 9 * 60 + 30,
    "/listening2Part22013": 8 * 60,
    "/listening2Part32013": 7 * 60 + 30,
    "/listening2Part42013": 8 * 60 + 30,
    "/listening3Part22013": 7 * 60,
    "/listening3Part32013": 8 * 60,
    "/listening3Part42013": 7 * 60,
    "/listening4Part22013": 7 * 60 + 30,
    "/listening4Part32013": 7 * 60 + 30,
    "/listening4Part42013": 8 * 60 + 30,
    // 2017  reading
    "/2013/Test 1/reading": 20 * 60,
    "/2013/Test 2/reading": 20 * 60,
    "/2013/Test 3/reading": 20 * 60,
    "/2013/Test 4/reading": 20 * 60,
    // reading part time

    "/Reading1Part22013": 20 * 60,
    "/Reading1Part32013": 20 * 60,
    "/Reading2Part22013": 20 * 60,
    "/Reading2Part32013": 20 * 60,
    "/Reading3Part22013": 20 * 60,
    "/Reading3Part32013": 20 * 60,
    "/Reading4Part22013": 20 * 60,
    "/Reading4Part32013": 20 * 60,
    // 2015 writing
    "/2013/Test 1/writing": 20 * 60,
    "/2013/Test 2/writing": 20 * 60,
    "/2013/Test 3/writing": 20 * 60,
    "/2013/Test 4/writing": 20 * 60,
    // wr3ting part
    "/Writing1Part22013": 40 * 60,
    "/Writing2Part22013": 40 * 60,
    "/Writing3Part22013": 40 * 60,
    "/Writing4Part22013": 40 * 60,
  };

  // Format seconds to mm:ss
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Reset timer when location changes
  useEffect(() => {
    setShowTimeOver(false);
    setRunning(false);

    const path = decodeURIComponent(location.pathname.toLowerCase());
    let dynamicTime = 0;
    for (const key in pathTimes) {
      if (path.includes(key.toLowerCase())) {
        dynamicTime = pathTimes[key];
        break;
      }
    }

    if (dynamicTime > 0) {
      setSecondsLeft(dynamicTime); // fresh timer for the new page
    } else {
      setSecondsLeft(null); // no timer for this page
    }
  }, [location]);

  // Countdown effect
  useEffect(() => {
    if (!running || secondsLeft === null) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRunning(false);
          setShowTimeOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, secondsLeft]);

  const handleClockClick = () => {
    if (secondsLeft !== null) setRunning((prev) => !prev); // toggle start/pause for current page
  };

  return (
    <div className="p-4 mx-auto sticky top-0 z-50 navbar flex justify-between bg-base-100">
      {/* Logo */}
      <div className="flex items-center gap-5">
        <Link to="/">
          <img
            className="h-16"
            src="https://i.ibb.co.com/zTw3NXG3/images.png"
            alt="Logo"
          />
        </Link>
        <Link to="/">
          <h1
            className="text-2xl font-bold text-black hover:text-red-500"
            onMouseEnter={(e) => (e.target.textContent = "IELTS")}
            onMouseLeave={(e) => (e.target.textContent = "Jumpinto")}
          >
            Jumpinto
          </h1>
        </Link>
      </div>

      {/* Clock */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleClockClick}
      >
        <FaClock
          size={24}
          className={`text-green-900 ${running ? "animate-pulse" : ""}`}
        />
        <span className="font-bold">
          {secondsLeft !== null ? formatTime(secondsLeft) : ""}
        </span>

        {showTimeOver && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white py-4 px-14 rounded-xl shadow-xl text-center max-w-sm">
              <h2 className="text-xl font-bold text-red-600 mb-3">
                ⏰ Time’s Up!
              </h2>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setShowTimeOver(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Message & User */}
      <div className="flex items-center gap-5">
        <div className="relative flex flex-col items-center group">
          <div className="bg-white border-2 border-gray-300 h-10 w-10 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-blue-100">
            <img
              className="h-5 w-5"
              src="https://i.ibb.co.com/Y4hBZK9n/message-1.jpg"
              alt="message icon"
            />
          </div>
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-max p-2.5 text-white border border-gray-300 rounded-md text-lg bg-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Have suggestions or need to report an issue? <br /> Email us at
            team@jumpinto.com
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <Link to="/login">
              <button className="btn text-white text-xl font-bold rounded-2xl bg-[#47698F]">
                Sign In
              </button>
            </Link>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL}
                alt="Google profile"
                className="w-10 h-10 rounded-full border-2 border-[#47698F] cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              />
              {showConfirm && (
                <div className="absolute top-12 right-0 bg-white shadow-lg p-4 rounded-2xl border w-56 text-center">
                  <p className="text-gray-700 font-semibold mb-3">
                    Are you sure to sign out?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="px-4 py-1 rounded-lg bg-gray-300 text-gray-800 font-medium hover:bg-gray-400"
                    >
                      No
                    </button>
                    <button
                      onClick={() => {
                        logOut();
                        setShowConfirm(false);
                      }}
                      className="px-4 py-1 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
