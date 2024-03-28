import { useParams } from "react-router-dom";
import { Note } from "../../types/Notestypes";
import { DisplayNotes, NotFound } from "../../components/NoteList/NoteList";

type TagPageProps = {
  notes: Note[];
  handleNoteClick: (id: string) => void;
  onPinNote: (id: string) => void;
};

const TagPage = ({ notes, handleNoteClick, onPinNote }: TagPageProps) => {
  const { tag: label } = useParams();
  const filteredNotes = notes.filter((note) =>
    note.tags.some((tag) => tag.label === label)
  );

  if (filteredNotes.length < 1) return <NotFound />;

  return (
    <div>
      <DisplayNotes
        notes={filteredNotes}
        onPinNote={onPinNote}
        handleNoteClick={handleNoteClick}
      />
    </div>
  );
};

export default TagPage;
