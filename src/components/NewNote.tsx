import { useNotes } from "../context/NoteProvider";
import NoteForm from "./NoteForm";

const NewNote = () => {
  const { tags: availableTags, onCreateNote } = useNotes();
  return (
    <div>
      <h1>New Note</h1>
      <NoteForm
        onSubmit={onCreateNote}
        availableTags={availableTags}
      />
    </div>
  );
};

export default NewNote;
