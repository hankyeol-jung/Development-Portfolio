import React, { useEffect, useState } from "react";
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

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  return (
    <nav className="fixed z-10 w-screen bg-opaqueGray-700">
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
  const ZoomInScroll = batch(Sticky(), ZoomIn(), FadeIn());
  const ZoomInScrollOut = batch(Sticky(), Fade(), ZoomIn());
  const FadeUp = batch(Move(0, 1000), Fade(), Sticky());
  const StickyFade = batch(FadeIn(), Sticky());

  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    if (position > 500) {
      console.log("hhh");
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <div>
      <ScrollContainer>
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
            className="bg-gray-100 rounded-3xl w-[90%] h-[80%] flex justify-center items-center"
          >
            <div></div>
          </Animator>
          <Animator animation={ZoomInScrollOut}>
            <span className="font-black text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              안녕하세요. 👋
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
        <ScrollPage className="">
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
          <Animator
            animation={batch(Fade(), Sticky())}
            className="text-center "
          >
            <span className="text-4xl font-bold text-gray-800">
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
          <Animator animation={ZoomInScrollOut} className="w-full text-center">
            <span className="font-black text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              생각을 즐기는 개발자, 정한결입니다.
            </span>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </div>
  );
}

export default App;
