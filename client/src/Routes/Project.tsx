import { useParams } from "react-router-dom";
import { projectData } from ".././data/data";
import Design1 from "./Design1";
import Design2 from "./Design2";

function Project() {
  // projectId를 가져옵니다.
  let { id: projectId } = useParams<{ id: string }>();

  // projectId를 number로 변환합니다.
  const id = projectId ? parseInt(projectId) : undefined;

  // id에 해당하는 프로젝트 데이터를 가져옵니다.
  const project =
    id !== undefined ? projectData.find((data) => data.id === id) : undefined;

  return <>{project?.design === 1 ? <Design1 id={id} /> : <Design2 />}</>;
}

export default Project;
