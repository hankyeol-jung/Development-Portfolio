import { useParams } from "react-router-dom";
import { projectData } from ".././data/data";
import React, { useState, useEffect } from "react";
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

function Project() {
  // projectId를 가져옵니다.
  let { id: projectId } = useParams<{ id: string }>();

  // projectId를 number로 변환합니다.
  const id = projectId ? parseInt(projectId) : undefined;

  // id에 해당하는 프로젝트 데이터를 가져옵니다.
  const project =
    id !== undefined ? projectData.find((data) => data.id === id) : undefined;

  let [imageLength, setImageLength] = useState<{ id: number; chk: boolean }[]>(
    []
  );

  useEffect(() => {
    if (project?.imageLength) {
      let copy: { id: number; chk: boolean }[] = [];
      for (let i = 0; i < project.imageLength; i++) {
        copy.push({ id: i, chk: i === 0 });
      }
      setImageLength(copy);
    }
  }, []);

  function handleChkChange(id: number, value: boolean) {
    const newButtons = imageLength.map((a) => {
      if (a.id === id) {
        return { ...a, chk: value };
      } else {
        return { ...a, chk: false };
      }
    });
    setImageLength(newButtons);
  }

  const [scrollPosition, setScrollPosition] = useState(-2200);

  useEffect(() => {
    // 스크롤 위치를 변경할 때마다 호출되는 이벤트 핸들러 등록
    const handleScroll = () => {
      setScrollPosition(window.scrollY - 2200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [moveFixed, setMoveFixed] = useState("absolute");

  useEffect(() => {
    if (scrollPosition >= 0) {
      setMoveFixed("fixed");
    } else {
      setMoveFixed("absolute");
    }
  }, [scrollPosition]);

  return (
    <>
      {project && (
        <ScrollContainer>
          <ScrollPage style={{ backgroundColor: "#fff" }}>
            <Animator
              animation={batch(Fade(), Sticky(), MoveOut(0, -500))}
              className="flex flex-col items-center justify-center h-screen text-center"
            >
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 break-keep">
                {project.title}
              </span>
              <p className="mt-2 mb-5 text-xl font-bold text-gray-400">
                {project.company}
              </p>
              <p className="max-w-lg mx-auto mb-10 text-lg font-medium leading-8 text-gray-700 break-keep">
                {project.description}
              </p>
            </Animator>
          </ScrollPage>
          <ScrollPage style={{ backgroundColor: "#fff" }}>
            <Animator
              animation={batch(FadeIn(), StickyIn(), ZoomIn())}
              className=" flex items-center h-screen text-center w-full max-w-[1440px] px-10 mx-auto relative pt-20"
            >
              <div className="grid w-full grid-cols-2 grid-rows-2 gap-5 h-[750px]">
                <div className="row-span-2 bg-[#FAFAFA] flex justify-center items-center relative">
                  {imageLength.map((a, i) => (
                    <img
                      src={".././images/nineb/pad" + (i + 1) + ".png"}
                      className={
                        `${a.chk === true ? "opacity-100" : "opacity-0"}` +
                        " w-[420px] opa absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transition-all duration-500"
                      }
                    ></img>
                  ))}
                  <img
                    src=".././images/project/ipad.png"
                    className="rotate-90 "
                  ></img>
                </div>
                <div className=" bg-[#FAFAFA] flex justify-center items-center relative">
                  {imageLength.map((a, i) => (
                    <img
                      src={".././images/nineb/m" + (i + 1) + ".png"}
                      className={
                        `${a.chk === true ? "opacity-100" : "opacity-0"}` +
                        " w-[360px] opa absolute -translate-x-1/2 top-[33px] left-1/2 transition-all duration-500"
                      }
                    ></img>
                  ))}
                  <img
                    src=".././images/project/imac.png"
                    className="relative rotate-0"
                  ></img>
                </div>
                <div className=" bg-[#FAFAFA] flex justify-center items-center relative z-10">
                  {imageLength.map((a, i) => (
                    <img
                      src={".././images/nineb/phone" + (i + 1) + ".png"}
                      className={
                        `${a.chk === true ? "opacity-100" : "opacity-0"}` +
                        " w-[140px] opa absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transition-all duration-500"
                      }
                    ></img>
                  ))}
                  <img
                    src=".././images/project/iphone.png"
                    className="rotate-0 max-h-80"
                  ></img>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 flex items-center justify-center w-full h-10">
                {imageLength.map((a, i) => (
                  <ViewButton
                    chk={a.chk}
                    key={a.id}
                    handleChkChange={(id: number, value: boolean) =>
                      handleChkChange(a.id, value)
                    }
                  />
                ))}
              </div>
            </Animator>
          </ScrollPage>
          <ScrollPage style={{ height: "200px", backgroundColor: "#fff" }}>
            <div></div>
          </ScrollPage>
          <div className="relative h-[400vh] -z-10">
            <div className={moveFixed + " top-0 left-0 w-screen h-screen "}>
              <div className="flex justify-center w-screen max-w-5xl mx-auto">
                <div className="relative w-1/3">
                  {project.content?.map((a, i) => (
                    <Content content={a} index={i} />
                  ))}
                </div>
                <div className="relative w-2/3 h-full pt-10">
                  <div className="absolute left-28 w-screen max-w-[1166px] mt-20 overflow-hidden">
                    {project.content?.map((a, i) => (
                      <BigMacImg index={i} />
                    ))}
                    <img
                      src=".././images/project/bigmac.png"
                      className="rotate-0"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollContainer>
      )}
    </>
  );
}

interface BigMacImgProps {
  index: number;
}

function BigMacImg(props: BigMacImgProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // 스크롤 위치를 변경할 때마다 호출되는 이벤트 핸들러 등록
    const handleScroll = () => {
      setScrollPosition(window.scrollY - 2200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let opacityOut = (a: number, b: number) => {
    return 1 - Math.max((scrollPosition - a) / b, 0);
  };
  let opacityIn = (a: number, b: number) => {
    return 0 + Math.max((scrollPosition - a) / b, 0);
  };

  let height = props.index;

  return (
    <div
      className="absolute w-[1110px] h-[625px] top-[30px] left-1/2 -translate-x-1/2 overflow-hidden"
      style={{
        opacity: `${
          scrollPosition < 1000 * (height + 1) + height * 500
            ? height === 0
              ? opacityOut(1000 + height * 1000 + height * 500, 500)
              : opacityIn(100 + height * 1000 + height * 500, 500)
            : height === 0
            ? opacityOut(1000 + height * 1000 + height * 500, 500)
            : opacityIn(100 + height * 1000 + height * 500, 500)
        }`,
      }}
    >
      <img
        src={".././images/nineb/big" + (props.index + 1) + ".png"}
        className="absolute top-0 w-full -translate-x-1/2 left-1/2"
      ></img>
    </div>
  );
}

interface ContentProps {
  content: string;
  index: number;
}

function Content(props: ContentProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // 스크롤 위치를 변경할 때마다 호출되는 이벤트 핸들러 등록
    const handleScroll = () => {
      setScrollPosition(window.scrollY - 2200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let opacityOut = (a: number, b: number) => {
    return 1 - Math.max((scrollPosition - a) / b, 0);
  };
  let opacityIn = (a: number, b: number) => {
    return 0 + Math.max((scrollPosition - a) / b, 0);
  };

  let height = props.index;

  return (
    <div
      className="absolute top-0 flex items-center h-screen"
      style={{
        opacity: `${
          scrollPosition < 1000 * (height + 1) + height * 500
            ? height === 0
              ? opacityOut(1000 + height * 1000 + height * 500, 500)
              : opacityIn(100 + height * 1000 + height * 500, 500)
            : height === 0
            ? opacityOut(1000 + height * 1000 + height * 500, 500)
            : opacityIn(100 + height * 1000 + height * 500, 500)
        }`,
        transform: `translateY(${
          scrollPosition < 1000 * (height + 1)
            ? height === 0
              ? -Math.max(
                  Math.min(
                    scrollPosition - (height * 1000 + 1000 + height * 500),
                    300
                  ),
                  0
                )
              : 100 -
                Math.max(
                  Math.min(
                    scrollPosition - (100 + height * 1000 + height * 500),
                    100
                  ),
                  0
                )
            : height === 0
            ? -Math.max(
                Math.min(
                  scrollPosition - (height * 1000 + 1000 + height * 500),
                  300
                ),
                0
              )
            : 100 -
              Math.max(
                Math.min(
                  scrollPosition - (100 + height * 1000 + height * 500),
                  100
                ),
                0
              )
        }px)`,
      }}
    >
      <p className="text-3xl font-bold leading-relaxed text-left break-keep">
        {props.content}
      </p>
    </div>
  );
}

interface ViewButtonProps {
  key: number;
  chk: boolean;
  handleChkChange: (id: number, value: boolean) => void;
}

function ViewButton(props: ViewButtonProps) {
  let [chk, setChk] = useState(props.chk);

  useEffect(() => {
    setChk(props.chk);
  }, [props.chk]);

  return (
    <span
      className={
        `${props.chk === true ? "bg-yellow-500" : "bg-gray-300"}` +
        " block w-8 h-8 mx-2 transition-all  rounded-full cursor-pointer hover:bg-yellow-300"
      }
      onClick={() => {
        if (props.chk === false) {
          setChk(true);
          props.handleChkChange(props.key, !chk);
        }
      }}
    ></span>
  );
}

export default Project;
