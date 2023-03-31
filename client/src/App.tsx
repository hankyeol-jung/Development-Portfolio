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
import { motion, Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faCss3Alt,
  faBootstrap,
  faSquareJs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <About /> */}
      <BackColor />
      {/* <Main /> */}
      <SkillDesign1 topLocation={0} index={0} />
      <SkillDesign1 topLocation={3000} index={1} />
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
];

function BackColor() {
  const [bgColor, setBgColor] = useState("rgb(37,109,218)");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY >= 3000 && scrollY <= 3300) {
        const percentage = (scrollY - 3000) / (3300 - 3000);
        const newColor = `rgb(${37 - percentage * (37 - 251)}, ${
          109 - percentage * (109 - 98)
        }, ${218 - percentage * (218 - 80)})`;
        setBgColor(newColor);
      } else if (scrollY < 3000) {
        setBgColor("rgb(37,109,218)");
      } else {
        setBgColor("rgb(251,98,80)");
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

// function About() {
//   const scrollRef = useRef(null);

//   return (
//     <div ref={scrollRef} style={{ overflow: "scroll" }}>
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ root: scrollRef }}
//       >
//         <article className="w-52">
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
//             rhoncus quam.
//           </p>
//           <p>
//             Fringilla quam urna. Cras turpis elit, euismod eget ligula quis,
//             imperdiet sagittis justo. In viverra fermentum ex ac vestibulum.
//             Aliquam eleifend nunc a luctus porta. Mauris laoreet augue ut felis
//             blandit, at iaculis odio ultrices. Nulla facilisi. Vestibulum cursus
//             ipsum tellus, eu tincidunt neque tincidunt a.
//           </p>
//           <h2>Sub-header</h2>
//           <p>
//             In eget sodales arcu, consectetur efficitur metus. Duis efficitur
//             tincidunt odio, sit amet laoreet massa fringilla eu.
//           </p>
//           <p>
//             Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
//             Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
//             Proin sit amet lacus mollis, semper massa ut, rutrum mi.
//           </p>
//           <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
//           <p>
//             Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
//             leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
//           </p>
//           <h2>Sub-header</h2>
//           <p>
//             Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
//             aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
//             sem, sit amet tempor nulla. Quisque fermentum felis faucibus,
//             vehicula metus ac, interdum nibh. Curabitur vitae convallis ligula.
//             Integer ac enim vel felis pharetra laoreet. Interdum et malesuada
//             fames ac ante ipsum primis in faucibus. Pellentesque hendrerit ac
//             augue quis pretium.
//           </p>
//           <p>
//             Morbi ut scelerisque nibh. Integer auctor, massa non dictum
//             tristique, elit metus efficitur elit, ac pretium sapien nisl nec
//             ante. In et ex ultricies, mollis mi in, euismod dolor.
//           </p>
//           <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
//           <p>
//             Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
//             Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
//             Proin sit amet lacus mollis, semper massa ut, rutrum mi.
//           </p>
//           <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
//           <p>
//             Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
//             leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
//           </p>
//           <h2>Sub-header</h2>
//           <p>
//             Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
//             aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
//             sem, sit amet tempor nulla. Quisque fermentum felis faucibus,
//             vehicula metus ac, interdum nibh. Curabitur vitae convallis ligula.
//             Integer ac enim vel felis pharetra laoreet. Interdum et malesuada
//             fames ac ante ipsum primis in faucibus. Pellentesque hendrerit ac
//             augue quis pretium.
//           </p>
//           <p>
//             Morbi ut scelerisque nibh. Integer auctor, massa non dictum
//             tristique, elit metus efficitur elit, ac pretium sapien nisl nec
//             ante. In et ex ultricies, mollis mi in, euismod dolor.
//           </p>
//           <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
//         </article>
//       </motion.div>
//     </div>
//   );
// }

// function Main() {
//   const ZoomInScroll = batch(Sticky(), ZoomIn(), Fade());
//   const ZoomInScrollOut = batch(Sticky(), Fade(), ZoomIn());
//   const FadeUp = batch(Move(0, 1000), Fade(), Sticky());

//   return (
//     <ScrollContainer>
//       <ScrollPage>
//         <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
//           <span className="text-2xl font-medium text-gray-700">
//             스크롤을 시작해 포트폴리오를 봐주세요. 😉
//           </span>
//         </Animator>
//       </ScrollPage>
//       <ScrollPage>
//         <Animator
//           animation={ZoomInScroll}
//           className="bg-gray-100 rounded-3xl w-[90%] h-[80%] flex justify-center items-center overflow-hidden brightness-100"
//         >
//           {/* <img src={mainImg1}></img> */}
//           <img src="/images/main1.jpg" className="w-full opacity-30"></img>
//         </Animator>
//         <Animator animation={ZoomInScrollOut}>
//           <span className="font-black text-gray-900 text-7xl">
//             안녕하세요. <span className="helloHand">👋</span>
//           </span>
//         </Animator>
//       </ScrollPage>
//       <ScrollPage>
//         <Animator animation={FadeUp}>
//           <span className="font-black text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//             저는
//           </span>
//         </Animator>
//       </ScrollPage>
//       <ScrollPage>
//         <div className="flex items-center justify-center h-full">
//           <span className="text-4xl font-bold text-center text-gray-700">
//             <Animator animation={MoveIn(-500, 0)} className="mb-10">
//               2년 차 프론트엔드 개발자🧑‍💻이며
//             </Animator>
//             <Animator animation={MoveIn(500, 0)}>
//               백엔드 또한 작업을 하고 있습니다.
//             </Animator>
//           </span>
//         </div>
//       </ScrollPage>
//       <ScrollPage>
//         <Animator animation={batch(Fade(), Sticky())} className="text-center ">
//           <span className="text-4xl font-bold text-gray-800">
//             개발자가 되기 전부터 생각하는🤔 즐거움을 따라 살다가,
//           </span>
//           <br />
//           <br />
//           <span className="text-5xl font-extrabold text-gray-900">
//             지금은 개발에 푹 빠져 있습니다.
//           </span>
//         </Animator>
//       </ScrollPage>
//       <ScrollPage>
//         <div className="flex items-center justify-center h-full">
//           <span className="text-4xl font-bold text-center text-gray-700">
//             <Animator animation={MoveOut(500, 0)} className="mb-10">
//               항상 Clean Code와 Test에 대한 고민을 하며
//             </Animator>
//             <Animator animation={MoveOut(-500, 0)}>
//               디자인과 기술, 그리고 애플🍎에 관심이 많습니다.
//             </Animator>
//           </span>
//         </div>
//       </ScrollPage>
//       <ScrollPage>
//         <Animator
//           animation={ZoomInScrollOut}
//           className="w-full text-center bg-[#d3e5ff] h-full flex justify-center items-center"
//         >
//           <span className="font-black text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//             생각을 즐기는 개발자, 정한결입니다.
//           </span>
//         </Animator>
//       </ScrollPage>
//     </ScrollContainer>
//   );
// }

interface SkillProps {
  topLocation: number;
  index: number;
}

function SkillDesign1(props: SkillProps) {
  const topLocation = props.topLocation;
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
