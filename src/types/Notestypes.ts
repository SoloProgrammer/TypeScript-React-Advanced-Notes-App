export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  isPinned: false | true;
  isArchived: false | true;
  isTrashed: false | true;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  isPinned: false | true;
  isArchived: false | true;
  isTrashed: false | true;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

export type SimplifiedNote = Omit<Note, "markdown">;

export type NoteCardProps = {
  note: SimplifiedNote;
  onPinNote: (id: string) => void;
  handleArchiveNote?: (id: string) => void;
};

export type EditTagsModalProps = {
  show: boolean;
  handleCloseModal: () => void;
  availableTags: Tag[];
  deleteTag: (id: string) => void;
  updateTag: (data: Tag[]) => void;
};
