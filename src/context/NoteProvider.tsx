import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { Note, NoteData, RawNote, Tag } from "../types/Notestypes";
import useLocalStorage from "../Hooks/useLocalStorage";
import { showToast } from "../utils/toast";

type ContextData = {
  notesWithTags: Note[];
  setNotes: React.Dispatch<React.SetStateAction<RawNote[]>>;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  onAddTag: (tag: Tag) => void;
  updateTag: (tags: Tag[]) => void;
  deleteTag: (id: string) => void;
  onDeleteNote: (id: string) => void;
  deleteNoteForEver: (id: string) => void;
  onPinNote: (id: string) => void;
  handleNoteClick: (id: string) => void;
  handleArchiveNote: (id: string) => void;
  handleTrashNote: (id: string) => void;
  onUpdateNote: (id: string, Note: NoteData) => void;
  selectedNote: Note | null;
  handleModalOffsetClick: () => void;
  onCreateNote: (Note: NoteData) => void;
};

const NoteContext = createContext<null | ContextData>(null);

type NodeProviderProps = {
  children: ReactNode;
};
const NoteProvider = ({ children }: NodeProviderProps) => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(
    () =>
      notes.map((note) => {
        return {
          ...note,
          tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
        };
      }),
    [notes, tags]
  );

  const onAddTag = (tag: Tag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { id: crypto.randomUUID(), ...data, tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id)
          return { ...note, tagIds: tags.map((tag) => tag.id), ...data };
        else return note;
      })
    );
  };

  const deleteTag = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  const updateTag = (updatedTags: Tag[]) => {
    setTags(updatedTags);
  };

  const onPinNote = (id: string) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          note.isPinned = !note.isPinned;
        }
        return note;
      })
    );
  };

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const handleNoteClick = (id: string) => {
    setSelectedNote(notesWithTags.filter((n) => n.id === id)[0]);
  };

  const handleModalOffsetClick = () => setSelectedNote(null);

  const handleArchiveNote = (id: string) => {
    let toastMsg = "Note Archived";
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          if (note.isArchived) {
            toastMsg = "Note UnArchived";
          }
          note.isArchived = !note.isArchived;
        }
        return note;
      })
    );
    showToast(toastMsg, {
      icon: "💡",
      position: "bottom-right",
    });
  };

  const handleTrashNote = (id: string) => {
    let toastMsg = "Note Trashed";
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          if (note.isTrashed) {
            toastMsg = "Note Restored";
          }
          note.isTrashed = !note.isTrashed;
          note.isArchived = false;
        }
        return note;
      })
    );
    showToast(toastMsg, {
      icon: "💡",
      position: "bottom-right",
      style: { background: "#feefc3" },
    });
  };

  const deleteNoteForEver = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    showToast("Note deleted completly", { icon: "🗑️" });
  };

  return (
    <NoteContext.Provider
      value={{
        notesWithTags,
        setNotes,
        tags,
        setTags,
        handleNoteClick,
        onAddTag,
        onCreateNote,
        onDeleteNote,
        deleteNoteForEver,
        onPinNote,
        onUpdateNote,
        updateTag,
        deleteTag,
        selectedNote,
        handleModalOffsetClick,
        handleArchiveNote,
        handleTrashNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NoteContext) as ContextData;
};

export default NoteProvider;
