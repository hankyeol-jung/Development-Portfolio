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
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <About /> */}

      {/* <Main /> */}
      <Skill />
    </div>
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

function Skill() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // 스크롤 위치를 변경할 때마다 호출되는 이벤트 핸들러 등록
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let opacity = (a: number) => {
    return 1 - Math.max((scrollPosition - a) / 500, 0);
  };

  let scale = (a: number, b: number) => {
    return a - Math.max((scrollPosition - b) / 2000, 0);
  };

  let top = (a: number) => {
    return a - Math.max(scrollPosition / 10, 0);
  };

  return (
    <div className="bg-[#256DDA] w-full h-[300vh]">
      <div className="fixed top-0 left-0 w-screen h-screen">
        <div className="flex justify-between h-screen max-w-5xl pt-40 mx-auto">
          <div className="w-[35%] max-h-screen">
            <div className="flex flex-col">
              <span className="mb-4 text-5xl font-extrabold text-white ">
                Mark up
              </span>
              <span className="text-4xl font-bold text-white">
                사용할 수 있습니다.
              </span>
            </div>
            <div>
              <p className="w-full mt-10 mb-4 text-lg font-medium text-white break-words ">
                HTML, Bootstrap, Tailwind CSS를 사용하여 다양한 디자인 요소를
                만들어내고, 레이아웃을 조정하는 등의 작업을 수행할 수 있습니다.
              </p>
              <div>
                <p className="mt-5 mb-1 text-sm font-medium text-white break-words ">
                  가능한 스킬 셋
                </p>
                <p className="text-sm font-normal text-white break-words ">
                  Mark up: html, bootstrap, tailwindcss
                  <br />
                  Frontend: Javascript, React.js
                  <br />
                  Backend: Node.js, PHP
                  <br />
                  Database: Mongodb, Mysql
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-[400px]">
            <Card
              bg="bg-[#E76328]"
              right={Math.min(scrollPosition, 300)}
              top={Math.min(scrollPosition, 300)}
              rotate={Math.min(scrollPosition / 10, 30)}
              opacity={opacity(0)}
              scale={scale(1, 0)}
              ntop={0}
              index={3}
            />
            <Card
              bg="bg-yellow-300"
              right={Math.max(Math.min(scrollPosition - 500, 300), 0)}
              top={Math.max(Math.min(scrollPosition - 500, 300), 0)}
              rotate={Math.max(Math.min((scrollPosition - 500) / 10, 30), 0)}
              opacity={opacity(500)}
              scale={scale(0.95, 500)}
              ntop={top(30)}
              index={2}
            />
            <Card
              bg="bg-gray-300"
              right={Math.max(Math.min(scrollPosition - 1000, 300), 0)}
              top={Math.max(Math.min(scrollPosition - 1000, 300), 0)}
              rotate={Math.max(Math.min((scrollPosition - 1000) / 10, 30), 0)}
              opacity={opacity(1000)}
              scale={scale(0.9, 1000)}
              ntop={top(60)}
              index={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  bg: string;
  index: number;
  right: number;
  top: number;
  rotate: number;
  opacity: number;
  scale: number;
  ntop: number;
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
        props.bg +
        " h-[500px] rounded-3xl absolute top-0 transition-all duration-300 right-0 w-full"
      }
      style={{
        top: `${props.ntop}px`,
        transform: `translate(${right}px,-${top}px) rotate(${rotate}deg)`,
        opacity: `${props.opacity}`,
        scale: `${props.scale}`,
        zIndex: `${props.index}`,
      }}
    >
      <div className="flex flex-col h-full p-10 text-amber-900">
        <div>
          <span className="inline-block w-12 h-12 mb-4 text-5xl">
            <FontAwesomeIcon icon={faHtml5} />
          </span>
          <div className="mb-6 text-4xl font-bold">HTML</div>
          <p className="text-xl font-medium">
            HTML은 HyperText Markup Language의 약자로, 웹 페이지를 만들기 위한
            마크업 언어입니다.
          </p>
        </div>
        <p className="mt-auto text-2xl font-semibold">Mark up</p>
      </div>
    </div>
  );
}

export default App;
