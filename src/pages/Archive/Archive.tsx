import { MdOutlineArchive } from "react-icons/md";
import { DisplayNotes, NotFound } from "../../components/NoteList/NoteList";
import { useNotes } from "../../context/NoteProvider";

const Archive = () => {
  const { notesWithTags: notes } = useNotes();
  const archivedNotes = notes.filter(
    (note) => note.isArchived && !note.isTrashed
  );

  return (
    <div>
      <DisplayNotes notes={archivedNotes} />
      {archivedNotes.length < 1 && (
        <NotFound
          icon={<MdOutlineArchive />}
          title="Your archived notes appear here"
        />
      )}
    </div>
  );
};

export default Archive;
