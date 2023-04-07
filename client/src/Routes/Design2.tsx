import React, { useEffect, useState, ReactNode } from "react";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";
import { projectData } from ".././data/data";

interface Design1Props {
  id?: number;
}

function Design2(props: Design1Props) {
  const project =
    props.id !== undefined
      ? projectData.find((data) => data.id === props.id)
      : undefined;

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

  return (
    <>
      {project && (
        <Controller>
          <Scene triggerHook="onLeave" duration={1000} pin>
            {(progress: number) => (
              <div className="flex flex-col items-center justify-center h-screen text-center">
                <Timeline totalProgress={progress} paused>
                  <Tween
                    from={{ y: "0%", opacity: "1" }}
                    to={{ y: "-150%", opacity: "0" }}
                  >
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 break-keep">
                      {project.title}
                    </span>
                    <p className="mt-2 mb-5 text-xl font-bold text-gray-400">
                      {project.company}
                    </p>
                  </Tween>
                  <Tween
                    from={{ y: "0%", opacity: "1" }}
                    to={{ y: "-100%", opacity: "0" }}
                  >
                    <p className="max-w-lg mx-auto mb-10 text-lg font-medium leading-8 text-gray-700 break-keep">
                      {project.description}
                    </p>
                  </Tween>
                </Timeline>
              </div>
            )}
          </Scene>
          <Scene triggerHook="onLeave" duration={1000} pin reverse={true}>
            {(progress: number) => (
              <div className="flex flex-col items-center justify-center h-screen text-center">
                <Timeline
                  totalProgress={progress}
                  paused
                  target={
                    <div className="opacity-0 translate-y-[150%]">
                      <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 break-keep">
                        {project.title}
                      </span>
                      <p className="mt-2 mb-5 text-xl font-bold text-gray-400 ">
                        {project.company}
                      </p>
                    </div>
                  }
                >
                  <Tween to={{ y: "0%", opacity: 1 }} position={0}></Tween>
                  <Tween to={{ y: "-150%", opacity: 0 }} position={2}></Tween>
                </Timeline>
                <Timeline
                  totalProgress={progress}
                  paused
                  target={
                    <div className="opacity-0 translate-y-[50%]">
                      <p className="max-w-lg mx-auto mb-10 text-lg font-medium leading-8 text-gray-700 break-keep">
                        {project.description}
                      </p>
                    </div>
                  }
                >
                  <Tween to={{ y: "0%", opacity: 1 }} position={1}></Tween>
                  <Tween to={{ y: "-50%", opacity: 0 }} position={3}></Tween>
                </Timeline>
              </div>
            )}
          </Scene>
          <Scene triggerHook="onLeave" duration={1000} pin>
            {(progress: number) => (
              <div className="flex flex-col items-center justify-center h-screen text-center">
                <Timeline totalProgress={progress} paused>
                  <Tween
                    from={{ y: "150%", opacity: "0" }}
                    to={{ y: "0%", opacity: "1" }}
                  >
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 break-keep">
                      {project.title}
                    </span>
                    <p className="mt-2 mb-5 text-xl font-bold text-gray-400">
                      {project.company}
                    </p>
                  </Tween>
                  <Tween
                    from={{ y: "50%", opacity: "0" }}
                    to={{ y: "0%", opacity: "1" }}
                  >
                    <p className="max-w-lg mx-auto mb-10 text-lg font-medium leading-8 text-gray-700 break-keep">
                      {project.description}
                    </p>
                  </Tween>
                </Timeline>
              </div>
            )}
          </Scene>
        </Controller>
      )}
    </>
  );
}

export default Design2;
