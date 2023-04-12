import React, { useEffect, useState } from "react";
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
        <>
          <div className="flex flex-col items-center justify-center h-screen text-center">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 break-keep">
              {project.title}
            </span>
            <p className="mt-2 mb-5 text-xl font-bold text-gray-400">
              {project.company}
            </p>
            <p className="max-w-lg mx-auto mb-10 text-lg font-medium leading-8 text-gray-100 break-keep">
              {project.description}
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default Design2;
