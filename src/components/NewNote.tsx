import { NoteData, Tag } from "../types/Notestypes";
import NoteForm from "./NoteForm";

type newNoteProps = {
  onCreateNote: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[];
};

const NewNote = ({ onCreateNote, onAddTag, availableTags }: newNoteProps) => {
  return (
    <div>
      <h1>New Note</h1>
      <NoteForm
        onSubmit={onCreateNote}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default NewNote;
