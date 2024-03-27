export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  isPinned: false | true;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  isPinned: false | true;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

export type SimplifiedNote = Omit<Note, "markdown">;

export type ViewNoteModalProps = {
  selectedNote: Note | null;
  handleOffsetClick: () => void;
  onPinNote: (id: string) => void;
};
export type NoteCardProps = {
  note: SimplifiedNote;
  onPinNote: (id: string) => void;
};

export type EditTagsModalProps = {
  show: boolean;
  handleCloseModal: () => void;
  availableTags: Tag[];
  deleteTag: (id: string) => void;
  updateTag: (data: Tag[]) => void;
};

export type EditNoteProps = {
  onUpdateNote: (id: string, data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[];
};

export type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;
