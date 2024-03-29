import { BsTrash } from "react-icons/bs";
import { DisplayNotes, NotFound } from "../../components/NoteList/NoteList";
import { useNotes } from "../../context/NoteProvider";

const Bin = () => {
  const { notesWithTags: notes } = useNotes();
  const trashedNotes = notes.filter((note) => note.isTrashed);

  return (
    <div>
      <DisplayNotes notes={trashedNotes} />
      {trashedNotes.length < 1 && (
        <NotFound icon={<BsTrash />} title="No notes in Recycle Bin" />
      )}
    </div>
  );
};

export default Bin;
