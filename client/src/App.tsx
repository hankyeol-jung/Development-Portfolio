import React, {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  RefObject,
} from "react";
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from "react-scroll-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faCss3Alt,
  faBootstrap,
  faSquareJs,
  faReact,
  faNodeJs,
  faPhp,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setMainHeight } from "./store/store";

interface AppProps {}

function App(props: AppProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  let mainHeight: number = useSelector(
    (state: { mainHeight: number }) => state.mainHeight
  );

  return (
    <div className="App">
      <Header />
      <BackColor />
      <div ref={mainRef}>
        <Main />
      </div>
      <SkillDesign1 index={0} />
      <SkillDesign1 index={1} />
      <SkillDesign1 index={2} />
    </div>
  );
}

const skillData = [
  {
    name: "Mark up",
    bgColor: "#256DDA",
    description:
      "HTML, Bootstrap, Tailwind CSS를 사용하여 다양한 디자인 요소를 만들어내고, 레이아웃을 조정하는 등의 작업을 수행할 수 있습니다.",
    skill: [
      {
        name: "HTML",
        logo: <FontAwesomeIcon icon={faHtml5} />,
        description:
          "HTML은 HyperText Markup Language의 약자로, 웹 페이지를 만들기 위한 마크업 언어입니다.",
        bgColor: "#E76328",
        textColor: "text-amber-900",
      },
      {
        name: "CSS",
        logo: <FontAwesomeIcon icon={faCss3Alt} />,
        description:
          "CSS는 Cascading Style Sheets의 약자로, HTML로 작성된 웹 페이지의 스타일과 레이아웃을 꾸며주는 스타일 시트 언어입니다.",
        bgColor: "#244BDD",
        textColor: "text-blue-200",
      },
      {
        name: "Bootstrap",
        logo: <FontAwesomeIcon icon={faBootstrap} />,
        description:
          "Bootstrap은 Twitter에서 개발한 오픈 소스 프론트엔드 프레임워크로, HTML, CSS, JavaScript를 사용하여 반응형 웹 페이지를 구축할 수 있도록 도와줍니다.",
        bgColor: "#533B78",
        textColor: "text-purple-200",
      },
      {
        name: "Tailwind css",
        logo: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 1000 1000"
            fill="none"
          >
            <path
              d="M489.5 226.499C328 231.632 280 346.999 269 409.499C283.333 386.332 328.5 335.5 395 335.5C472.5 335.5 531.5 422 567.5 449C611.237 481.803 699.123 525.115 814.5 490C906.5 462 949.167 364.332 958.5 317.999C914 378.499 846.5 414.838 763 371.999C705.5 342.499 662.5 221 489.5 226.499Z"
              fill="#0C4A6E"
            />
            <path
              d="M261 500.999C99.5 506.132 51.5 621.499 40.5 683.999C54.8333 660.832 100 610 166.5 610C244 610 303 696.5 339 723.5C382.737 756.303 470.623 799.615 586 764.5C678 736.5 720.667 638.832 730 592.499C685.5 652.999 618 689.338 534.5 646.499C477 616.999 434 495.5 261 500.999Z"
              fill="#0C4A6E"
            />
          </svg>
        ),
        description:
          "Tailwind CSS는 클래스 이름으로 스타일을 지정할 수 있는 CSS 프레임워크로, 유연하고 확장성이 높아 커스터마이징이 쉽고 빠르게 디자인을 구현할 수 있습니다.",
        bgColor: "#35AEA9",
        textColor: "text-sky-900",
      },
    ],
  },
  {
    name: "Front-end",
    bgColor: "#FB6251",
    description:
      "JavaScript와 TypeScript를 활용하여 React를 이용한 웹 개발을 수행할 수 있습니다. UX/UI 개발에 자신이 있습니다.",
    skill: [
      {
        name: "JavaScript",
        logo: <FontAwesomeIcon icon={faSquareJs} />,
        description:
          "JavaScript는 웹 페이지를 동적으로 만들기 위한 프로그래밍 언어이며, HTML, CSS와 함께 웹 프론트엔드 개발에서 가장 기본적으로 사용되는 언어입니다.",
        bgColor: "#E8D44E",
        textColor: "text-amber-900",
      },
      {
        name: "Jquery",
        logo: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 32 32"
            version="1.1"
          >
            <path
              fill="#BAE6FD"
              d="M16.232 24.047c-0.15-0.034-0.295-0.081-0.441-0.124-0.037-0.011-0.074-0.022-0.11-0.033-0.143-0.044-0.284-0.090-0.425-0.139-0.019-0.007-0.039-0.014-0.058-0.021-0.126-0.045-0.251-0.091-0.375-0.139-0.035-0.014-0.070-0.027-0.105-0.041-0.136-0.054-0.271-0.11-0.405-0.168-0.027-0.012-0.054-0.024-0.081-0.036-0.115-0.052-0.228-0.105-0.341-0.159-0.033-0.016-0.065-0.031-0.099-0.047-0.089-0.043-0.177-0.090-0.264-0.134-0.059-0.031-0.118-0.060-0.176-0.092-0.107-0.058-0.212-0.117-0.317-0.178-0.035-0.020-0.071-0.038-0.107-0.059-0.139-0.081-0.277-0.166-0.412-0.252-0.037-0.024-0.074-0.050-0.111-0.074-0.099-0.063-0.197-0.128-0.293-0.195-0.032-0.021-0.063-0.045-0.094-0.066-0.093-0.066-0.186-0.132-0.277-0.2-0.042-0.031-0.082-0.062-0.123-0.093-0.084-0.064-0.168-0.129-0.25-0.196-0.037-0.030-0.075-0.060-0.112-0.090-0.105-0.087-0.209-0.173-0.312-0.263-0.011-0.009-0.023-0.018-0.034-0.028-0.111-0.097-0.22-0.197-0.328-0.298-0.031-0.030-0.062-0.059-0.092-0.088-0.080-0.076-0.158-0.153-0.235-0.231-0.031-0.031-0.062-0.061-0.092-0.092-0.098-0.101-0.194-0.203-0.289-0.306-0.005-0.005-0.010-0.010-0.014-0.015-0.1-0.109-0.197-0.221-0.293-0.334-0.026-0.031-0.051-0.060-0.077-0.091-0.071-0.086-0.142-0.173-0.211-0.261-0.026-0.031-0.052-0.064-0.077-0.096-0.083-0.108-0.164-0.215-0.243-0.324-2.197-2.996-2.986-7.129-1.23-10.523l-1.556 1.974c-1.994 2.866-1.746 6.595-0.223 9.64 0.036 0.073 0.074 0.145 0.112 0.217 0.024 0.045 0.046 0.092 0.071 0.137 0.014 0.027 0.030 0.053 0.044 0.079 0.026 0.049 0.053 0.095 0.079 0.142 0.047 0.083 0.096 0.166 0.145 0.249 0.027 0.045 0.055 0.091 0.083 0.136 0.055 0.089 0.111 0.176 0.169 0.264 0.024 0.037 0.047 0.075 0.072 0.111 0.080 0.118 0.161 0.236 0.244 0.353 0.002 0.003 0.005 0.006 0.007 0.009 0.013 0.018 0.028 0.037 0.041 0.056 0.072 0.1 0.147 0.199 0.223 0.296 0.028 0.036 0.056 0.072 0.084 0.107 0.067 0.085 0.136 0.169 0.206 0.253 0.026 0.031 0.052 0.063 0.079 0.094 0.094 0.11 0.189 0.22 0.287 0.328 0.002 0.002 0.004 0.004 0.006 0.005 0.004 0.005 0.008 0.008 0.011 0.013 0.095 0.104 0.193 0.206 0.291 0.307 0.031 0.032 0.062 0.063 0.093 0.094 0.076 0.077 0.154 0.153 0.233 0.228 0.032 0.030 0.063 0.061 0.095 0.091 0.105 0.099 0.211 0.196 0.319 0.291 0.002 0.001 0.003 0.003 0.005 0.004 0.018 0.016 0.038 0.032 0.056 0.047 0.095 0.082 0.192 0.164 0.29 0.245 0.040 0.032 0.080 0.064 0.12 0.096 0.080 0.064 0.16 0.127 0.241 0.189 0.043 0.033 0.086 0.066 0.129 0.098 0.089 0.066 0.18 0.131 0.271 0.194 0.033 0.024 0.065 0.047 0.099 0.070 0.009 0.006 0.018 0.013 0.027 0.019 0.086 0.060 0.175 0.116 0.263 0.174 0.038 0.025 0.075 0.051 0.114 0.076 0.136 0.086 0.273 0.171 0.412 0.253 0.038 0.022 0.076 0.043 0.114 0.064 0.102 0.059 0.205 0.117 0.309 0.174 0.056 0.030 0.114 0.059 0.171 0.088 0.073 0.038 0.147 0.078 0.221 0.115 0.017 0.009 0.035 0.017 0.051 0.025 0.030 0.014 0.060 0.028 0.091 0.044 0.116 0.055 0.233 0.11 0.351 0.163 0.025 0.011 0.049 0.022 0.074 0.033 0.135 0.059 0.271 0.116 0.409 0.17 0.033 0.014 0.066 0.026 0.1 0.039 0.127 0.049 0.256 0.098 0.386 0.143 0.016 0.006 0.032 0.012 0.049 0.017 0.142 0.050 0.286 0.096 0.43 0.141 0.034 0.010 0.069 0.021 0.104 0.031 0.147 0.044 0.293 0.097 0.445 0.125 9.643 1.759 12.444-5.795 12.444-5.795-2.352 3.065-6.528 3.873-10.485 2.974zM12.758 16.231c0.216 0.31 0.456 0.678 0.742 0.927 0.104 0.114 0.213 0.226 0.324 0.336 0.028 0.029 0.057 0.056 0.085 0.084 0.108 0.105 0.217 0.207 0.33 0.307 0.005 0.003 0.009 0.008 0.014 0.012 0.001 0.001 0.002 0.002 0.003 0.003 0.125 0.11 0.255 0.216 0.386 0.319 0.029 0.022 0.058 0.046 0.088 0.069 0.132 0.101 0.266 0.2 0.404 0.295 0.004 0.003 0.008 0.006 0.012 0.009 0.061 0.042 0.123 0.081 0.184 0.122 0.030 0.019 0.058 0.040 0.088 0.058 0.098 0.063 0.198 0.125 0.299 0.183 0.014 0.009 0.028 0.016 0.042 0.024 0.087 0.051 0.176 0.1 0.265 0.148 0.031 0.018 0.063 0.033 0.094 0.049 0.061 0.032 0.123 0.064 0.185 0.096 0.009 0.004 0.019 0.009 0.028 0.012 0.127 0.063 0.255 0.123 0.386 0.18 0.028 0.012 0.057 0.023 0.085 0.035 0.105 0.045 0.21 0.088 0.316 0.129 0.045 0.017 0.091 0.033 0.135 0.050 0.097 0.036 0.193 0.069 0.291 0.101 0.044 0.014 0.087 0.028 0.131 0.042 0.139 0.043 0.276 0.098 0.42 0.122 7.445 1.233 9.164-4.499 9.164-4.499-1.549 2.232-4.55 3.296-7.752 2.465-0.142-0.038-0.282-0.078-0.422-0.122-0.043-0.013-0.084-0.027-0.127-0.041-0.099-0.032-0.197-0.066-0.295-0.102-0.045-0.017-0.089-0.033-0.133-0.050-0.107-0.041-0.213-0.084-0.317-0.128-0.029-0.013-0.058-0.024-0.086-0.036-0.131-0.057-0.261-0.117-0.389-0.18-0.066-0.032-0.13-0.066-0.195-0.099-0.037-0.019-0.075-0.038-0.112-0.058-0.083-0.045-0.165-0.092-0.246-0.139-0.019-0.011-0.040-0.022-0.059-0.033-0.101-0.059-0.2-0.12-0.299-0.182-0.030-0.019-0.060-0.040-0.090-0.060-0.065-0.042-0.13-0.085-0.193-0.128-0.137-0.095-0.271-0.194-0.402-0.294-0.030-0.024-0.061-0.047-0.091-0.071-1.401-1.107-2.512-2.619-3.041-4.334-0.554-1.778-0.434-3.775 0.525-5.395l-1.178 1.663c-1.442 2.075-1.364 4.853-0.239 7.048 0.189 0.368 0.401 0.725 0.638 1.065zM20.606 13.664c0.061 0.023 0.123 0.043 0.185 0.064 0.027 0.008 0.054 0.018 0.082 0.026 0.088 0.027 0.175 0.060 0.265 0.076 4.111 0.794 5.226-2.11 5.523-2.537-0.977 1.406-2.618 1.744-4.632 1.255-0.159-0.039-0.334-0.096-0.488-0.151-0.197-0.070-0.39-0.15-0.579-0.24-0.358-0.172-0.699-0.38-1.015-0.619-1.802-1.367-2.922-3.976-1.746-6.101l-0.637 0.877c-0.85 1.251-0.933 2.805-0.344 4.186 0.622 1.467 1.897 2.617 3.384 3.163z"
            />
          </svg>
        ),
        description:
          "jQuery는 JavaScript 라이브러리로, HTML 문서의 탐색, 이벤트 처리, 애니메이션 등을 쉽게 구현할 수 있도록 도와줍니다.",
        bgColor: "#215D97",
        textColor: "text-sky-200",
      },
      {
        name: "TypeScript",
        logo: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            height="48"
            viewBox="0 0 512 512"
            width="48"
          >
            <rect fill="#BAE6FC" height="512" rx="50" width="512" />
            <path
              clip-rule="evenodd"
              d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z"
              fill="#2F74C0"
              fill-rule="evenodd"
            />
          </svg>
        ),
        description:
          "TypeScript는 Microsoft에서 개발한 정적 타입 지원 언어로, JavaScript의 확장된 기능을 제공하여 개발 생산성과 코드 유지보수성을 높여줍니다.",
        bgColor: "#2F74C0",
        textColor: "text-sky-200",
      },
      {
        name: "React",
        logo: <FontAwesomeIcon icon={faReact} />,
        description:
          "React는 페이스북에서 개발한 UI 라이브러리로, 컴포넌트 기반의 웹 개발을 위한 자바스크립트 라이브러리입니다.",
        bgColor: "#5FD3F3",
        textColor: "text-sky-900",
      },
    ],
  },
  {
    name: "Back-end",
    bgColor: "#FB6251",
    description:
      "JavaScript와 TypeScript를 활용하여 React를 이용한 웹 개발을 수행할 수 있습니다. UX/UI 개발에 자신이 있습니다.",
    skill: [
      {
        name: "Node.js",
        logo: <FontAwesomeIcon icon={faNodeJs} />,
        description:
          "JavaScript는 웹 페이지를 동적으로 만들기 위한 프로그래밍 언어이며, HTML, CSS와 함께 웹 프론트엔드 개발에서 가장 기본적으로 사용되는 언어입니다.",
        bgColor: "#7FC729",
        textColor: "text-green-900",
      },
      {
        name: "PHP",
        logo: <FontAwesomeIcon icon={faPhp} />,
        description:
          "React는 페이스북에서 개발한 UI 라이브러리로, 컴포넌트 기반의 웹 개발을 위한 자바스크립트 라이브러리입니다.",
        bgColor: "#22232D",
        textColor: "text-purple-200",
      },
    ],
  },
];

function BackColor() {
  const [bgColor, setBgColor] = useState("rgb(255,255,255)");

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     if (scrollY >= mainHeight && scrollY <= 300 + mainHeight) {
  //       const percentage =
  //         (scrollY - mainHeight) / (300 + mainHeight - mainHeight);
  //       const newColor = `rgb(${255 - percentage * (255 - 37)}, ${
  //         255 - percentage * (255 - 109)
  //       }, ${255 - percentage * (255 - 218)})`;
  //       setBgColor(newColor);
  //     } else if (scrollY >= skillHeight0 && scrollY <= skillHeight0 + 300) {
  //       const percentage =
  //         (scrollY - skillHeight0) / (300 + skillHeight0 - skillHeight0);
  //       const newColor = `rgb(${37 - percentage * (37 - 251)}, ${
  //         109 - percentage * (109 - 98)
  //       }, ${218 - percentage * (218 - 80)})`;
  //       setBgColor(newColor);
  //     } else if (scrollY >= skillHeight1 && scrollY <= skillHeight1 + 300) {
  //       const percentage =
  //         (scrollY - skillHeight1) / (300 + skillHeight1 - skillHeight1);
  //       const newColor = `rgb(${251 - percentage * (251 - 128)}, ${
  //         98 - percentage * (98 - 89)
  //       }, ${80 - percentage * (80 - 227)})`;
  //       setBgColor(newColor);
  //     } else if (scrollY < mainHeight) {
  //       setBgColor("rgb(255,255,255)");
  //     } else if (scrollY < skillHeight0) {
  //       setBgColor("rgb(37,109,218)");
  //     } else if (scrollY < skillHeight1) {
  //       setBgColor("rgb(251,98,80)");
  //     } else {
  //       setBgColor("rgb(128,89,227)");
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  let mainHeight: number = useSelector(
    (state: { mainHeight: number }) => state.mainHeight
  );

  let skillHeight0 = skillData[0].skill.length * 500 + 1000 + mainHeight;
  let skillHeight1 = skillHeight0 + skillData[1].skill.length * 500 + 1000;

  console.log(skillHeight1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY >= mainHeight && scrollY <= 300 + mainHeight) {
        const percentage =
          (scrollY - mainHeight) / (300 + mainHeight - mainHeight);
        const newColor = `rgb(${255 - percentage * (255 - 37)}, ${
          255 - percentage * (255 - 109)
        }, ${255 - percentage * (255 - 218)})`;
        setBgColor(newColor);
      } else if (scrollY >= skillHeight0 && scrollY <= 300 + skillHeight0) {
        const percentage =
          (scrollY - skillHeight0) / (300 + skillHeight0 - skillHeight0);
        const newColor = `rgb(${37 - percentage * (37 - 251)}, ${
          109 - percentage * (109 - 98)
        }, ${218 - percentage * (218 - 80)})`;
        setBgColor(newColor);
      } else if (scrollY >= skillHeight1 && scrollY <= 300 + skillHeight1) {
        const percentage =
          (scrollY - skillHeight1) / (300 + skillHeight1 - skillHeight1);
        const newColor = `rgb(${251 - percentage * (251 - 128)}, ${
          98 - percentage * (98 - 89)
        }, ${80 - percentage * (80 - 227)})`;
        setBgColor(newColor);
      } else if (scrollY < mainHeight) {
        setBgColor("rgb(255,255,255)");
      } else if (scrollY < skillHeight0) {
        setBgColor("rgb(37,109,218)");
      } else if (scrollY < skillHeight1) {
        setBgColor("rgb(251,98,80)");
      } else {
        setBgColor("rgb(128,89,227)");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed w-screen h-screen"
      style={{ backgroundColor: `${bgColor}` }}
    />
  );
}

function Header() {
  return (
    <nav className="fixed z-10 w-screen bg-opaqueGray-700 backdrop-blur-md">
      <div className="flex items-center justify-between px-10 mx-auto max-w-7xl h-14">
        <div className="text-base font-bold text-white cursor-pointer">
          한결
        </div>
        <ul className="flex items-center text-base font-medium text-white">
          <li className="p-2 mx-2 transition-all rounded cursor-pointer hover:bg-opaqueGray-700">
            게시판
          </li>
          <li className="p-2 mx-2 transition-all rounded cursor-pointer hover:bg-opaqueGray-700">
            방명록
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Main() {
  const ZoomInScroll = batch(Sticky(), ZoomIn(), Fade());
  const ZoomInScrollOut = batch(Sticky(), Fade(), ZoomIn());
  const FadeUp = batch(Move(0, 1000), Fade(), Sticky());

  return (
    <ScrollContainer style={{ height: "7000px" }}>
      <ScrollPage>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
          <span className="text-2xl font-medium text-gray-700">
            스크롤을 시작해 포트폴리오를 봐주세요. 😉
          </span>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <Animator
          animation={ZoomInScroll}
          className="bg-gray-100 rounded-3xl w-[90%] h-[80%] flex justify-center items-center overflow-hidden brightness-100"
        >
          {/* <img src={mainImg1}></img> */}
          <img src="/images/main1.jpg" className="w-full opacity-30"></img>
        </Animator>
        <Animator animation={ZoomInScrollOut}>
          <span className="font-black text-gray-900 text-7xl">
            안녕하세요. <span className="helloHand">👋</span>
          </span>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <Animator animation={FadeUp}>
          <span className="font-black text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            저는
          </span>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <div className="flex items-center justify-center h-full">
          <span className="text-4xl font-bold text-center text-gray-700">
            <Animator animation={MoveIn(-500, 0)} className="mb-10">
              2년 차 프론트엔드 개발자🧑‍💻이며
            </Animator>
            <Animator animation={MoveIn(500, 0)}>
              백엔드 또한 작업을 하고 있습니다.
            </Animator>
          </span>
        </div>
      </ScrollPage>
      <ScrollPage>
        <Animator animation={batch(Fade(), Sticky())} className="text-center ">
          <span className="text-4xl font-bold text-gray-800 break-keep">
            개발자가 되기 전부터 생각하는🤔 즐거움을 따라 살다가,
          </span>
          <br />
          <br />
          <span className="text-5xl font-extrabold text-gray-900">
            지금은 개발에 푹 빠져 있습니다.
          </span>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <div className="flex items-center justify-center h-full">
          <span className="text-4xl font-bold text-center text-gray-700">
            <Animator animation={MoveOut(500, 0)} className="mb-10">
              항상 Clean Code와 Test에 대한 고민을 하며
            </Animator>
            <Animator animation={MoveOut(-500, 0)}>
              디자인과 기술, 그리고 애플🍎에 관심이 많습니다.
            </Animator>
          </span>
        </div>
      </ScrollPage>
      <ScrollPage>
        <Animator
          animation={ZoomInScrollOut}
          className="w-full text-center bg-[#d3e5ff] h-full flex justify-center items-center"
        >
          <span className="font-black text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            생각을 즐기는 개발자, 정한결입니다.
          </span>
        </Animator>
      </ScrollPage>
    </ScrollContainer>
  );
}

interface SkillProps {
  index: number;
}

function SkillDesign1(props: SkillProps) {
  let mainHeight: number = useSelector(
    (state: { mainHeight: number }) => state.mainHeight
  );

  let skillLength = skillData[props.index].skill.length;

  const SKILL_MARGIN = 1000;

  const { index } = props;

  let topLocation = 0;
  let prevSkillsLength = 0;

  for (let i = 0; i < index; i++) {
    prevSkillsLength += skillData[i].skill.length;
  }

  if (props.index === 0) {
    topLocation = 0 + mainHeight;
  } else {
    topLocation = prevSkillsLength * 500 + index * SKILL_MARGIN + mainHeight;
  }

  const [scrollPosition, setScrollPosition] = useState(0);

  const [moveFixed, setMoveFixed] = useState("absolute");

  useEffect(() => {
    // 스크롤 위치를 변경할 때마다 호출되는 이벤트 핸들러 등록
    const handleScroll = () => {
      setScrollPosition(window.scrollY - topLocation);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition >= 0) {
      setMoveFixed("fixed");
    } else {
      setMoveFixed("absolute");
    }
  }, [scrollPosition]);

  let opacityOut = (a: number, b: number) => {
    return 1 - Math.max((scrollPosition - a) / b, 0);
  };
  let opacityIn = (a: number, b: number) => {
    return 0 + Math.max((scrollPosition - a) / b, 0);
  };

  let scale = (a: number, b: number) => {
    return a - Math.max((scrollPosition - b) / 2000, 0);
  };

  let top = (a: number) => {
    return a - Math.max(scrollPosition / 10, 0);
  };

  return (
    <div
      className="relative w-full "
      style={{
        height: `${500 * skillLength + 1500}px`,
      }}
    >
      <div
        className={moveFixed + " transition-all top-0 left-0 w-screen h-screen"}
      >
        <div className="flex justify-between h-screen max-w-5xl pt-40 mx-auto">
          <div className="w-[35%] max-h-screen">
            <div
              className="flex flex-col"
              style={{
                opacity: `${
                  scrollPosition < 1000
                    ? opacityIn(skillLength + 100, 100)
                    : opacityOut(skillLength * 500 + 400, 100)
                }`,
                transform: `translateY(${
                  scrollPosition < 1000
                    ? 100 - Math.max(Math.min(scrollPosition - 100, 100), 0)
                    : -Math.max(
                        Math.min(
                          scrollPosition - (skillLength * 500 + 400),
                          300
                        ),
                        0
                      )
                }px)`,
              }}
            >
              <span className="mb-4 text-5xl font-extrabold text-white ">
                {skillData[props.index].name}
              </span>
              <span className="text-4xl font-bold text-white">
                사용할 수 있습니다.
              </span>
            </div>
            <div
              style={{
                opacity: `${
                  scrollPosition < 1000
                    ? opacityIn(skillLength + 200, 100)
                    : opacityOut(skillLength * 500 + 500, 100)
                }`,
                transform: `translateY(${
                  scrollPosition < 1000
                    ? 100 - Math.max(Math.min(scrollPosition - 200, 100), 0)
                    : -Math.max(
                        Math.min(
                          scrollPosition - (skillLength * 500 + 500),
                          300
                        ),
                        0
                      )
                }px)`,
              }}
            >
              <p className="w-full mt-10 mb-4 text-lg font-medium text-white break-keep ">
                {skillData[props.index].description}
              </p>
              <div>
                <p className="mt-5 mb-1 text-sm font-medium text-white break-keep ">
                  가능한 스킬 셋
                </p>
                <p className="text-sm font-normal text-white break-keep ">
                  Mark up: html, bootstrap, tailwindcss
                  <br />
                  Frontend: JavaScript,TypeScript React
                  <br />
                  Backend: Node.js, PHP
                  <br />
                  Database: Mongodb, Mysql
                </p>
              </div>
            </div>
          </div>
          <div
            className="relative w-[400px]"
            style={{
              opacity: `${
                scrollPosition < 1000
                  ? opacityIn(skillLength + 300, 100)
                  : opacityOut(skillLength * 500 + 300, 100)
              }`,
              transform: `translateY(${
                scrollPosition < 1000
                  ? 100 - Math.max(Math.min(scrollPosition - 300, 100), 0)
                  : -Math.max(
                      Math.min(scrollPosition - (skillLength * 500 + 300), 300),
                      0
                    )
              }px)`,
            }}
          >
            {skillData[props.index].skill.map((a, i) => {
              return (
                <Card
                  bg={a.bgColor}
                  right={
                    i === 0
                      ? Math.min(scrollPosition - (i * 500 + 400), 300)
                      : Math.max(
                          Math.min(scrollPosition - (i * 500 + 400), 300),
                          0
                        )
                  }
                  top={
                    i === 0
                      ? Math.min(scrollPosition - (i * 500 + 400), 300)
                      : Math.max(
                          Math.min(scrollPosition - (i * 500 + 400), 300),
                          0
                        )
                  }
                  rotate={Math.max(
                    Math.min((scrollPosition - (i * 500 + 400)) / 10, 30),
                    0
                  )}
                  opacity={opacityOut(0 + (i * 500 + 400), 500)}
                  scale={scale(1 - i * 0.05, 0 + (i * 500 + 400))}
                  ntop={top(0 + i * 30)}
                  zIndex={-i}
                  name={a.name}
                  logo={a.logo}
                  description={a.description}
                  textColor={a.textColor}
                  tag={skillData[props.index].name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillDesign2(props: SkillProps) {
  let topLocation: number;
  let mainHeight: number = useSelector(
    (state: { mainHeight: number }) => state.mainHeight
  );

  if (props.index === 0) {
    topLocation = 0 + mainHeight;
  } else if (props.index === 1) {
    topLocation = skillData[0].skill.length * 500 + 1000 + mainHeight;
  } else if (props.index === 2) {
    topLocation =
      (skillData[1].skill.length + skillData[1].skill.length) * 500 +
      1000 +
      mainHeight;
  }

  const [scrollPosition, setScrollPosition] = useState(0);

  const [moveFixed, setMoveFixed] = useState("absolute");

  useEffect(() => {
    // 스크롤 위치를 변경할 때마다 호출되는 이벤트 핸들러 등록
    const handleScroll = () => {
      setScrollPosition(window.scrollY - topLocation);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition >= 0) {
      setMoveFixed("fixed");
    } else {
      setMoveFixed("absolute");
    }
  }, [scrollPosition]);

  let opacityOut = (a: number, b: number) => {
    return 1 - Math.max((scrollPosition - a) / b, 0);
  };
  let opacityIn = (a: number, b: number) => {
    return 0 + Math.max((scrollPosition - a) / b, 0);
  };

  let scale = (a: number, b: number) => {
    return a - Math.max((scrollPosition - b) / 2000, 0);
  };

  let top = (a: number) => {
    return a - Math.max(scrollPosition / 10, 0);
  };

  let skillLength = skillData[props.index].skill.length;
  return (
    <div
      className="relative w-full "
      style={{
        height: `${500 * skillLength + 1500}px`,
      }}
    >
      <div
        className={moveFixed + " transition-all top-0 left-0 w-screen h-screen"}
      >
        <div className="flex justify-between h-screen max-w-5xl pt-40 mx-auto">
          <div className="w-[35%] max-h-screen">
            <div
              className="flex flex-col"
              style={{
                opacity: `${
                  scrollPosition < 1000
                    ? opacityIn(skillLength + 100, 100)
                    : opacityOut(skillLength * 500 + 400, 100)
                }`,
                transform: `translateY(${
                  scrollPosition < 1000
                    ? 100 - Math.max(Math.min(scrollPosition - 100, 100), 0)
                    : -Math.max(
                        Math.min(
                          scrollPosition - (skillLength * 500 + 400),
                          300
                        ),
                        0
                      )
                }px)`,
              }}
            >
              <span className="mb-4 text-5xl font-extrabold text-white ">
                {skillData[props.index].name}
              </span>
              <span className="text-4xl font-bold text-white">
                사용할 수 있습니다.
              </span>
            </div>
            <div
              style={{
                opacity: `${
                  scrollPosition < 1000
                    ? opacityIn(skillLength + 200, 100)
                    : opacityOut(skillLength * 500 + 500, 100)
                }`,
                transform: `translateY(${
                  scrollPosition < 1000
                    ? 100 - Math.max(Math.min(scrollPosition - 200, 100), 0)
                    : -Math.max(
                        Math.min(
                          scrollPosition - (skillLength * 500 + 500),
                          300
                        ),
                        0
                      )
                }px)`,
              }}
            >
              <p className="w-full mt-10 mb-4 text-lg font-medium text-white break-keep ">
                {skillData[props.index].description}
              </p>
              <div>
                <p className="mt-5 mb-1 text-sm font-medium text-white break-keep ">
                  가능한 스킬 셋
                </p>
                <p className="text-sm font-normal text-white break-keep ">
                  Mark up: html, bootstrap, tailwindcss
                  <br />
                  Frontend: JavaScript,TypeScript React
                  <br />
                  Backend: Node.js, PHP
                  <br />
                  Database: Mongodb, Mysql
                </p>
              </div>
            </div>
          </div>
          <div
            className="relative w-[400px]"
            style={{
              opacity: `${
                scrollPosition < 1000
                  ? opacityIn(skillLength + 300, 100)
                  : opacityOut(skillLength * 500 + 300, 100)
              }`,
              transform: `translateY(${
                scrollPosition < 1000
                  ? 100 - Math.max(Math.min(scrollPosition - 300, 100), 0)
                  : -Math.max(
                      Math.min(scrollPosition - (skillLength * 500 + 300), 300),
                      0
                    )
              }px)`,
            }}
          >
            {skillData[props.index].skill.map((a, i) => {
              return (
                <Card
                  bg={a.bgColor}
                  right={
                    i === 0
                      ? Math.min(scrollPosition - (i * 500 + 400), 300)
                      : Math.max(
                          Math.min(scrollPosition - (i * 500 + 400), 300),
                          0
                        )
                  }
                  top={
                    i === 0
                      ? Math.min(scrollPosition - (i * 500 + 400), 300)
                      : Math.max(
                          Math.min(scrollPosition - (i * 500 + 400), 300),
                          0
                        )
                  }
                  rotate={Math.max(
                    Math.min((scrollPosition - (i * 500 + 400)) / 10, 30),
                    0
                  )}
                  opacity={opacityOut(0 + (i * 500 + 400), 500)}
                  scale={scale(1 - i * 0.05, 0 + (i * 500 + 400))}
                  ntop={top(0 + i * 30)}
                  zIndex={-i}
                  name={a.name}
                  logo={a.logo}
                  description={a.description}
                  textColor={a.textColor}
                  tag={skillData[props.index].name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  bg: string;
  zIndex: number;
  right: number;
  top: number;
  rotate: number;
  opacity: number;
  scale: number;
  ntop: number;
  name: string;
  logo: JSX.Element;
  description: string;
  textColor: string;
  tag: string;
}

function Card(props: CardProps) {
  const maxRight = 300;
  const maxTop = 300;
  const maxRotate = 30;

  const right = Math.max(Math.min(props.right, maxRight), 0);
  const top = Math.max(Math.min(props.top, maxTop), 0);
  const rotate = Math.max(Math.min(props.rotate, maxRotate), -maxRotate);

  return (
    <div
      className={
        " h-[500px] rounded-3xl absolute top-0 transition-all duration-300 right-0 w-full"
      }
      style={{
        backgroundColor: `${props.bg}`,
        top: `${props.ntop}px`,
        transform: `translate(${right}px,-${top}px) rotate(${rotate}deg)`,
        opacity: `${props.opacity}`,
        scale: `${props.scale}`,
        zIndex: `${props.zIndex}`,
      }}
    >
      <div className={"flex flex-col h-full p-10 " + props.textColor}>
        <div>
          <span className="inline-block w-12 h-12 mb-4 text-5xl">
            {props.logo}
          </span>
          <div className="mb-6 text-4xl font-bold">{props.name}</div>
          <p className="text-xl font-medium break-keep">{props.description}</p>
        </div>
        <p className="mt-auto text-2xl font-semibold">{props.tag}</p>
      </div>
    </div>
  );
}

export default App;
