import { useParams } from "react-router-dom";

const TagPage = () => {
  const { tag } = useParams();
  return <div>This {tag} tag page</div>;
};

export default TagPage;
