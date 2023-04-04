import { useParams } from "react-router-dom";
import { projectData } from ".././data/data";

function Project() {
  // projectId를 가져옵니다.
  let { id: projectId } = useParams<{ id: string }>();

  // projectId를 number로 변환합니다.
  const id = projectId ? parseInt(projectId) : undefined;

  // id에 해당하는 프로젝트 데이터를 가져옵니다.
  const project =
    id !== undefined ? projectData.find((data) => data.id === id) : undefined;

  return (
    <>
      {project && (
        <div className="h-screen pt-20 text-center">
          <h2>{project.title}</h2>
          <p>회사: {project.company}</p>
          <p>기술 스택: {project.skill.join(", ")}</p>
          <div>프로젝트페이지</div>
        </div>
      )}
    </>
  );
}

export default Project;
