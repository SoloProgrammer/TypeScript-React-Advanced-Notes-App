import { BsTrash } from "react-icons/bs";
import { NotFound } from "../../components/NoteList/NoteList";

const Bin = () => {
  return (
    <div>
      <i style={{ textAlign: "center", display: "block" }}>
        Notes in the Recycle Bin are deleted after 7 days.
      </i>
      <NotFound icon={<BsTrash />} title="No notes in Recycle Bin" />
    </div>
  );
};

export default Bin;
