import { useParams } from "react-router-dom";
import { DisplayNotes, NotFound } from "../../components/NoteList/NoteList";
import { useNotes } from "../../context/NoteProvider";

const TagPage = () => {
  const { notesWithTags: notes } = useNotes();
  const { tag: label } = useParams();
  const filteredNotes = notes.filter(
    (note) =>
      note.tags.some((tag) => tag.label === label) &&
      !note.isArchived &&
      !note.isTrashed
  );

  if (filteredNotes.length < 1) return <NotFound />;

  return <DisplayNotes notes={filteredNotes} />;
};

export default TagPage;
