import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import useLocalStorage from "./Hooks/useLocalStorage";
import { Suspense, lazy, useMemo, useState } from "react";
import { Note, NoteData, RawNote, Tag } from "./types/Notestypes";
import "./App.css";
import NoteLayout from "./components/NoteLayout";
import ViewNoteModal from "./components/Modals/ViewNoteModal/ViewNoteModal";
import Navbar from "./components/Shared/Navbar/Navbar";
import SideBar from "./components/Shared/SideBar/SideBar";
import TagPage from "./pages/Tag/TagPage";
import Archive from "./pages/Archive/Archive";
import Bin from "./pages/Bin/Bin";
import EditTagsModal from "./components/Modals/EditTagsModal";
const NoteDetail = lazy(() => import("./components/NoteDetail"));
const NoteEdit = lazy(() => import("./components/NoteEdit"));
const NoteList = lazy(() => import("./components/NoteList/NoteList"));
const NewNote = lazy(() => import("./components/NewNote"));

const App = () => {
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

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { id: crypto.randomUUID(), ...data, tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const onAddTag = (tag: Tag) => {
    setTags((prevTags) => [...prevTags, tag]);
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

  const [open, setOpen] = useState(true);

  const toggleSidebar = () => setOpen((prev) => !prev);
  const closeSidebar = () => setOpen(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const openTagsModal = () => setShowModal(true);

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Container className="my-4 container">
        <SideBar
          isModalOpen={showModal}
          openTagsModal={openTagsModal}
          open={open}
          tags={tags}
          toggleSidebar={closeSidebar}
        />
        <main className={`main ${!open ? "close" : ""}`}>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback="Loading..">
                  <NoteList
                    openTagsModal={openTagsModal}
                    deleteTag={deleteTag}
                    updateTag={updateTag}
                    onPinNote={onPinNote}
                    availableTags={tags}
                    handleNoteClick={handleNoteClick}
                    notes={notesWithTags}
                  />
                </Suspense>
              }
            />
            <Route
              path="/new"
              element={
                <Suspense fallback="Loading...">
                  <NewNote
                    onCreateNote={onCreateNote}
                    onAddTag={onAddTag}
                    availableTags={tags}
                  />
                </Suspense>
              }
            />
            <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
              <Route
                index
                element={
                  <Suspense fallback="loading..">
                    <NoteDetail handleDelete={onDeleteNote} />
                  </Suspense>
                }
              />
              <Route
                index
                path="edit"
                element={
                  <Suspense fallback="Loading..">
                    <NoteEdit
                      onUpdateNote={onUpdateNote}
                      onAddTag={onAddTag}
                      availableTags={tags}
                    />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/tag/:tag"
              element={
                <TagPage
                  handleNoteClick={handleNoteClick}
                  onPinNote={onPinNote}
                  notes={notesWithTags}
                />
              }
            />
            <Route path="/archive" element={<Archive />} />
            <Route path="/bin" element={<Bin />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </main>
        <ViewNoteModal
          onPinNote={onPinNote}
          handleOffsetClick={handleModalOffsetClick}
          selectedNote={selectedNote}
        />
        <EditTagsModal
          availableTags={tags}
          show={showModal}
          handleCloseModal={handleCloseModal}
          deleteTag={deleteTag}
          updateTag={updateTag}
        />
      </Container>
    </>
  );
};

export default App;
