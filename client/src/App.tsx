import React, { useEffect, useState, useRef } from "react";
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
  faGit,
  faGithubAlt,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Link } from "react-router-dom";
import Project from "./Routes/Project";
import { projectData } from "./data/data";

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  let [skillHeight, setSkillHeight] = useState(0);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    // 스크롤 위치를 변경할 때마다 호출되는 이벤트 핸들러 등록
    const handleScroll = () => {
      setSkillHeight(skillRef.current?.clientHeight ?? 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (skillHeight != 0) {
      setLoading(true);
    }
  }, [skillHeight]);

  return (
    <div className="App">
      <Header />
      <div id="scrollbar">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BackColor />
                <div ref={mainRef}>
                  <Main />
                </div>
                <div ref={skillRef}>
                  <SkillDesign1 index={0} />
                  <SkillDesign1 index={1} />
                  <SkillDesign1 index={2} />
                  <SkillDesign2 index={3} />
                </div>
                {loading === true ? (
                  <Projects index={3} skillHeight={skillHeight} />
                ) : null}
                <Footer />
              </>
            }
          />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative flex justify-center py-10 bg-neutral-200">
      <div className="text-center">
        <div className="mb-4 text-lg font-medium text-gray-700">
          한결 포트폴리오
        </div>
        <div className="text-sm font-normal text-gray-600">
          <p className="mb-2">전화번호: 010-3349-6506</p>
          <p className="mb-2">이메일: whd6023@gmail.com</p>
          <p className="mb-2">주소: 대전광역시 중구 어딘가</p>
        </div>
        <div className="mt-5">
          <span className="mx-2 text-4xl text-gray-500 transition-all cursor-pointer hover:text-gray-800">
            <FontAwesomeIcon icon={faGithub} />
          </span>
          <span className="mx-2 text-4xl text-gray-500 transition-all cursor-pointer hover:text-gray-800">
            <FontAwesomeIcon icon={faLinkedin} />
          </span>
        </div>
      </div>
    </div>
  );
}

interface ProjectsProps {
  index: number;
  skillHeight?: number;
}

function Projects(props: ProjectsProps) {
  let mainHeight: number = useSelector(
    (state: { mainHeight: number }) => state.mainHeight
  );

  let topLocation: number = props.skillHeight || 0;
  topLocation = topLocation - 300 + mainHeight;

  const [scrollPosition, setScrollPosition] = useState(0);
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

  let opacityIn = (a: number, b: number) => {
    return 0 + Math.max((scrollPosition - a) / b, 0);
  };

  return (
    <div className="relative flex flex-col pb-40">
      <h2
        className="mt-32 mb-16 text-6xl font-extrabold text-center text-white opacity-0"
        style={{
          opacity: `${opacityIn(100, 100)}`,
          transform: `translateY(${
            100 - Math.max(Math.min(scrollPosition - 100, 100), 0)
          }px)`,
        }}
      >
        프로젝트
      </h2>
      <div
        className="flex flex-wrap justify-center"
        style={{
          opacity: `${opacityIn(200, 100)}`,
          transform: `translateY(${
            100 - Math.max(Math.min(scrollPosition - 200, 100), 0)
          }px)`,
        }}
      >
        {projectData.map((a, i) => (
          <ProjectCard
            id={a.id}
            title={a.title}
            company={a.company}
            index={i}
            image={a.image}
          />
        ))}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  id: number;
  title: string;
  company: string;
  index: number;
  image: string;
}

function ProjectCard(props: ProjectCardProps) {
  return (
    <Link
      to={"/project/" + props.id}
      className="w-[480px] h-[300px] rounded-xl mx-10 px-7 py-10 relative overflow-hidden group cursor-pointer mb-10 flex justify-between flex-col"
    >
      <div>
        <div className="relative z-10 mb-5 transition-all duration-500 opacity-0 group-hover:opacity-100 ">
          <p className="mb-2 text-3xl font-bold text-center text-white break-keep ">
            {props.title}
          </p>
          <p className="text-xl font-medium text-center text-gray-200 break-keep ">
            {props.company}
          </p>
          {/* <p className="text-base font-medium text-center text-white break-keep ">
              React를 비롯한 여러 기술들을 활용하여 농업 네비게이션의
              Front-end를 개발하였습니다. 공공 API를 이용해 데이터를 수집하고,
              react-chartjs-2를 활용하여 시각화를 구현했습니다. 또한 react
              query를 이용하여 데이터의 캐싱 및 관리를 효율적으로 처리했습니다.
              이를 통해 사용자들이 더욱 편리하고 직관적으로 정보를 확인할 수
              있도록 구현했습니다.
            </p> */}
        </div>
        <div className="relative z-10 flex flex-wrap items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100">
          {projectData[props.index].skill.map((a) => (
            <span className="bg-[rgba(100,100,100,0.8)] text-gray-200 py-1 px-2 rounded-full mx-1 mb-2 text-sm">
              {a}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10 flex justify-center transition-all duration-500 opacity-0 group-hover:opacity-100">
        <span className="px-4 py-2 font-bold text-white transition-all border rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-gray-500 hover:border-none">
          자세히 보기
        </span>
      </div>
      <img
        src={props.image}
        className="absolute top-0 object-cover w-full h-full transition-all duration-500 -translate-x-1/2 left-1/2 group-hover:brightness-50 group-hover:scale-125"
      ></img>
    </Link>
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
      "node.js와 php를 사용하여 서버사이드 렌더링 및 RESTful API를 구현할 수 있습니다.",
    skill: [
      {
        name: "Node.js",
        logo: <FontAwesomeIcon icon={faNodeJs} />,
        description:
          "Node.js는 자바스크립트 런타임 환경으로, 서버사이드 애플리케이션 개발에 사용되며 비동기 I/O 작업에 특화되어 있다.",
        bgColor: "#7FC729",
        textColor: "text-green-900",
      },
      {
        name: "PHP",
        logo: <FontAwesomeIcon icon={faPhp} />,
        description:
          "PHP는 서버측에서 실행되는 스크립트 언어로, 동적 웹 페이지 개발에 이용됩니다. 간단한 문법과 높은 호환성이 특징입니다.",
        bgColor: "#22232D",
        textColor: "text-purple-200",
      },
    ],
  },
  {
    name: "Database",
    bgColor: "#E8D04F",
    description:
      "MySQL와 MongoDB를 사용하여 데이터베이스 설계 및 관리, 쿼리 작성, API와의 연동 경험이 있습니다.",
    skill: [
      {
        name: "Mongodb",
        logo: (
          <svg
            width="48px"
            height="48px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="512" cy="512" r="512" style={{ fill: "#195335" }} />
            <path
              d="M648.86 449.44c-32.34-142.73-108.77-189.66-117-207.59-9-12.65-18.12-35.15-18.12-35.15-.15-.38-.39-1.05-.67-1.7-.93 12.65-1.41 17.53-13.37 30.29-18.52 14.48-113.54 94.21-121.27 256.37-7.21 151.24 109.25 241.36 125 252.85l1.79 1.27v-.11c.1.76 5 36 8.44 73.34H526a726.68 726.68 0 0 1 13-78.53l1-.65a204.48 204.48 0 0 0 20.11-16.45l.72-.65c33.48-30.93 93.67-102.47 93.08-216.53a347.07 347.07 0 0 0-5.05-56.76zM512.35 659.12s0-212.12 7-212.08c5.46 0 12.53 273.61 12.53 273.61-9.72-1.17-19.53-45.03-19.53-61.53z"
              style={{ fill: "#13aa52" }}
            />
          </svg>
        ),
        description:
          "MongoDB는 NoSQL 데이터베이스로, 높은 확장성과 유연성, 빠른 속도, JSON 기반의 문서 저장 방식 등을 특징으로 합니다.",
        bgColor: "#13aa52",
        textColor: "text-green-900",
      },
      {
        name: "Mysql",
        logo: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            width="100"
            viewBox="-58.46985 -50.32625 506.7387 301.9575"
          >
            <path
              d="M0 183.354h12.842v-50.711l19.88 44.208c2.346 5.35 5.557 7.244 11.854 7.244 6.298 0 9.385-1.893 11.732-7.244l19.88-44.208v50.71H89.03v-50.627c0-4.94-1.976-7.327-6.05-8.561-9.755-3.046-16.3-.412-19.264 6.174l-19.51 43.63-18.892-43.63c-2.84-6.586-9.508-9.22-19.263-6.174C1.976 125.399 0 127.787 0 132.725v50.629zm99.708-41.276h12.838v27.938c-.12 1.518.487 5.08 7.522 5.19 3.589.057 27.7 0 27.925 0v-33.264h12.868c.059 0-.013 45.364-.012 45.557.07 11.188-13.882 13.618-20.313 13.806h-40.55v-8.64c.072 0 40.52.009 40.622-.001 8.265-.873 7.289-4.981 7.288-6.364v-3.368H120.6c-12.7-.117-20.786-5.66-20.886-12.035-.01-.591.274-28.54-.007-28.82z"
              fill="#BFDBFE"
            />
            <path
              d="M170.758 183.354h36.92c4.322 0 8.52-.905 11.855-2.47 5.556-2.551 8.273-6.008 8.273-10.537v-9.384c0-3.705-3.087-7.163-9.138-9.467-3.211-1.236-7.162-1.894-10.99-1.894h-15.56c-5.184 0-7.654-1.564-8.271-5.021-.124-.412-.124-.742-.124-1.153v-5.844c0-.33 0-.66.124-1.071.617-2.634 1.976-3.376 6.544-3.787.37 0 .864-.083 1.235-.083H228.3v-8.56h-36.057c-5.186 0-7.903.329-10.372 1.069-7.656 2.388-10.99 6.175-10.99 12.76v7.492c0 5.763 6.545 10.702 17.534 11.854 1.236.082 2.47.164 3.704.164h13.336c.495 0 .989 0 1.359.083 4.075.33 5.803 1.07 7.039 2.552.74.74.987 1.482.987 2.305v7.49c0 .907-.617 2.06-1.851 3.047-1.112.988-2.964 1.647-5.434 1.812-.494 0-.864.082-1.358.082h-35.44v8.56zm137.16-14.9c0 8.808 6.544 13.748 19.757 14.736 1.234.082 2.47.164 3.704.164h33.464v-8.561h-33.711c-7.532 0-10.372-1.894-10.372-6.421v-44.29h-12.842v44.372zm-71.916.449V138.38c0-7.754 5.445-12.457 16.209-13.942a24.63 24.63 0 013.465-.247h24.376c1.237 0 2.352.083 3.589.247 10.765 1.485 16.209 6.188 16.209 13.942v30.522c0 6.29-2.312 9.658-7.641 11.852l12.65 11.418h-14.911l-10.234-9.238-10.303.653h-13.735c-2.351 0-4.825-.331-7.548-1.073-8.166-2.227-12.126-6.517-12.126-13.612zm13.86-.742c0 .413.124.825.248 1.32.742 3.547 4.083 5.527 9.156 5.527h11.667l-10.717-9.675h14.91l9.348 8.438c1.722-.918 2.856-2.322 3.252-4.125.123-.412.123-.825.123-1.237v-29.285c0-.33 0-.743-.123-1.156-.743-3.3-4.084-5.196-9.033-5.196h-19.427c-5.691 0-9.403 2.475-9.403 6.352v29.037z"
              fill="#BFDBFE"
            />
            <path
              d="M376.14 109.88c-7.893-.214-13.923.52-19.078 2.694-1.465.618-3.801.634-4.04 2.47.805.844.93 2.104 1.57 3.142 1.23 1.992 3.309 4.661 5.163 6.061 2.026 1.53 4.114 3.165 6.286 4.49 3.863 2.355 8.176 3.7 11.896 6.06 2.192 1.391 4.37 3.143 6.509 4.713 1.057.776 1.768 1.983 3.142 2.47v-.225c-.722-.919-.908-2.183-1.571-3.143l-2.918-2.918c-2.853-3.787-6.475-7.113-10.325-9.876-3.07-2.204-9.942-5.18-11.223-8.754l-.225-.225c2.177-.245 4.726-1.033 6.735-1.57 3.375-.906 6.39-.672 9.876-1.572 1.57-.449 3.142-.899 4.714-1.347v-.898c-1.762-1.808-3.018-4.2-4.94-5.836-5.025-4.28-10.511-8.556-16.16-12.121-3.133-1.978-7.005-3.263-10.325-4.939-1.117-.563-3.08-.856-3.817-1.796-1.744-2.223-2.694-5.042-4.04-7.632-2.817-5.425-5.584-11.351-8.08-17.06-1.703-3.892-2.815-7.73-4.938-11.223-10.192-16.757-21.163-26.87-38.158-36.812-3.616-2.114-7.97-2.95-12.571-4.04l-7.407-.45c-1.507-.63-3.075-2.473-4.49-3.367-5.63-3.556-20.07-11.293-24.24-1.122-2.633 6.42 3.935 12.685 6.284 15.938 1.649 2.282 3.76 4.84 4.938 7.407.775 1.687.909 3.378 1.572 5.163 1.632 4.397 3.05 9.18 5.162 13.243 1.067 2.056 2.243 4.222 3.592 6.06.827 1.129 2.244 1.626 2.468 3.368-1.386 1.94-1.465 4.95-2.244 7.407-3.508 11.062-2.185 24.81 2.918 32.997 1.566 2.513 5.254 7.903 10.325 5.836 4.436-1.807 3.445-7.406 4.714-12.345.287-1.12.11-1.944.673-2.694v.225l4.04 8.08c2.99 4.815 8.298 9.848 12.795 13.244 2.332 1.761 4.168 4.806 7.183 5.836v-.225h-.225c-.584-.91-1.498-1.288-2.244-2.02-1.757-1.722-3.71-3.863-5.163-5.836-4.09-5.553-7.705-11.63-10.998-17.957-1.573-3.02-2.94-6.354-4.266-9.428-.511-1.185-.505-2.977-1.57-3.592-1.452 2.253-3.591 4.075-4.714 6.735-1.796 4.252-2.028 9.437-2.693 14.814-.394.141-.22.044-.45.224-3.126-.754-4.225-3.972-5.386-6.733-2.94-6.982-3.485-18.225-.9-26.262.67-2.08 3.694-8.63 2.47-10.55-.584-1.917-2.512-3.026-3.591-4.49-1.335-1.811-2.668-4.195-3.592-6.286-2.405-5.444-3.528-11.555-6.06-17.058-1.21-2.631-3.257-5.293-4.938-7.632-1.861-2.59-3.945-4.5-5.387-7.633-.513-1.113-1.21-2.895-.45-4.04.243-.772.584-1.095 1.348-1.347 1.302-1.003 4.928.334 6.284.898 3.6 1.495 6.604 2.919 9.653 4.938 1.464.971 2.944 2.848 4.713 3.368h2.02c3.16.726 6.7.225 9.652 1.122 5.218 1.586 9.894 4.052 14.14 6.734 12.939 8.169 23.517 19.798 30.753 33.67 1.164 2.233 1.668 4.365 2.693 6.734 2.069 4.778 4.675 9.694 6.733 14.366 2.054 4.66 4.056 9.365 6.959 13.244 1.527 2.039 7.422 3.133 10.1 4.264 1.879.794 4.956 1.621 6.735 2.693 3.398 2.05 6.69 4.49 9.877 6.735 1.593 1.122 6.489 3.583 6.733 5.611z"
              fill="#BFDBFE"
            />
            <path
              d="M275.807 24.359c-1.646-.03-2.81.18-4.041.448v.225h.225c.785 1.613 2.17 2.651 3.142 4.04a6815.3 6815.3 0 002.245 4.714l.224-.224c1.39-.98 2.027-2.547 2.02-4.938-.557-.586-.64-1.322-1.122-2.021-.642-.932-1.884-1.46-2.693-2.244z"
              fill="#BFDBFE"
              fill-rule="evenodd"
            />
            <path
              d="M370.87 174.549c0 5.654 4.468 9.464 9.465 9.464s9.464-3.81 9.464-9.464c0-5.653-4.467-9.463-9.464-9.463-4.997 0-9.464 3.81-9.464 9.463zm16.809 0c0 4.29-3.28 7.496-7.344 7.496-4.113 0-7.344-3.206-7.344-7.496 0-4.29 3.23-7.496 7.344-7.496 4.064 0 7.344 3.206 7.344 7.496zm-4.794 5.4h2.119l-3.103-4.743c1.665-.177 2.926-.985 2.926-2.953 0-2.196-1.387-3.104-4.062-3.104h-4.215v10.8h1.817v-4.668h1.69l2.828 4.669zm-4.518-6.182v-3.104h2.094c1.086 0 2.398.202 2.398 1.464 0 1.513-1.186 1.64-2.55 1.64h-1.942z"
              fill="#BFDBFE"
              fill-rule="evenodd"
            />
          </svg>
        ),
        description:
          "Mysql은 오픈소스 관계형 데이터베이스 관리 시스템으로 데이터를 구조화하고 저장하는 데 사용됩니다.",
        bgColor: "#00618a",
        textColor: "text-blue-200",
      },
    ],
  },
];

function BackColor() {
  const [bgColor, setBgColor] = useState("rgb(255,255,255)");

  let mainHeight: number = useSelector(
    (state: { mainHeight: number }) => state.mainHeight
  );

  let skillHeight0 = skillData[0].skill.length * 500 + 1000 + mainHeight;
  let skillHeight1 = skillHeight0 + skillData[1].skill.length * 500 + 1000;
  let skillHeight2 = skillHeight1 + skillData[2].skill.length * 500 + 1000;
  let skillHeight3 = skillHeight2 + skillData[3].skill.length * 1200 + 1000;

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
      } else if (scrollY >= skillHeight2 && scrollY <= 300 + skillHeight2) {
        const percentage =
          (scrollY - skillHeight2) / (300 + skillHeight2 - skillHeight2);
        const newColor = `rgb(${128 - percentage * (128 - 232)}, ${
          89 - percentage * (89 - 170)
        }, ${227 - percentage * (227 - 77)})`;
        setBgColor(newColor);
      } else if (scrollY >= skillHeight3 && scrollY <= 300 + skillHeight3) {
        const percentage =
          (scrollY - skillHeight3) / (300 + skillHeight3 - skillHeight3);
        const newColor = `rgb(${232 - percentage * (232 - 25)}, ${
          170 - percentage * (170 - 31)
        }, ${77 - percentage * (77 - 40)})`;
        setBgColor(newColor);
      } else if (scrollY < mainHeight) {
        setBgColor("rgb(255,255,255)");
      } else if (scrollY < skillHeight0) {
        setBgColor("rgb(37,109,218)");
      } else if (scrollY < skillHeight1) {
        setBgColor("rgb(251,98,80)");
      } else if (scrollY < skillHeight2) {
        setBgColor("rgb(128,89,227)");
      } else if (scrollY < skillHeight3) {
        setBgColor("rgb(232,170,77)");
      } else {
        setBgColor("rgb(25,31,40)");
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
        <Link to="/" className="text-base font-bold text-white cursor-pointer">
          한결
        </Link>
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
          <span className="text-5xl font-extrabold text-gray-900 break-keep">
            지금은 개발에 푹 빠져 있습니다.
          </span>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <div className="flex items-center justify-center h-full">
          <span className="text-4xl font-bold text-center text-gray-700">
            <Animator animation={MoveOut(500, 0)} className="mb-10 break-keep">
              항상 Clean Code와 Test에 대한 고민을 하며
            </Animator>
            <Animator animation={MoveOut(-500, 0)} className=" break-keep">
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
          <span className="font-black text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 break-keep">
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

  let top = (a: number) => {
    return a - Math.max(scrollPosition / 10, 0);
  };

  let scale = (a: number, b: number) => {
    return a - Math.max((scrollPosition - b) / 2000, 0);
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
                  marginTop={0}
                  position={"absolute"}
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
                    : opacityOut(skillLength * 1200 + 400, 100)
                }`,
                transform: `translateY(${
                  scrollPosition < 1000
                    ? 100 - Math.max(Math.min(scrollPosition - 100, 100), 0)
                    : -Math.max(
                        Math.min(
                          scrollPosition - (skillLength * 1200 + 400),
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
                    : opacityOut(skillLength * 1200 + 500, 100)
                }`,
                transform: `translateY(${
                  scrollPosition < 1000
                    ? 100 - Math.max(Math.min(scrollPosition - 200, 100), 0)
                    : -Math.max(
                        Math.min(
                          scrollPosition - (skillLength * 1200 + 500),
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
              opacity: `1`,
              transform: `translateY(${
                1000 -
                Math.max(
                  Math.min(scrollPosition - 200, skillLength * 1000 + 1000),
                  0
                )
              }px)`,
            }}
          >
            {skillData[props.index].skill.map((a, i) => {
              return (
                <Card
                  bg={a.bgColor}
                  right={0}
                  top={0}
                  rotate={0}
                  opacity={1}
                  scale={1}
                  ntop={0}
                  zIndex={-i}
                  name={a.name}
                  logo={a.logo}
                  description={a.description}
                  textColor={a.textColor}
                  tag={skillData[props.index].name}
                  marginTop={props.index === 0 ? 0 : 60}
                  position={"relative"}
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
  marginTop: number;
  position: string;
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
        props.position +
        " h-[500px] rounded-3xl top-0 transition-all duration-300 right-0 w-full"
      }
      style={{
        backgroundColor: `${props.bg}`,
        top: `${props.ntop}px`,
        transform: `translate(${right}px,-${top}px) rotate(${rotate}deg)`,
        opacity: `${props.opacity}`,
        scale: `${props.scale}`,
        zIndex: `${props.zIndex}`,
        marginTop: `${props.marginTop}px`,
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
