import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Suspense, lazy, useState } from "react";
import "./App.css";
import NoteLayout from "./components/NoteLayout";
import ViewNoteModal from "./components/Modals/ViewNoteModal/ViewNoteModal";
import Navbar from "./components/Shared/Navbar/Navbar";
import SideBar from "./components/Shared/SideBar/SideBar";
import TagPage from "./pages/Tag/TagPage";
import Archive from "./pages/Archive/Archive";
import Bin from "./pages/Bin/Bin";
import EditTagsModal from "./components/Modals/EditTagsModal";
import { Toaster } from "react-hot-toast";
import { useNotes } from "./context/NoteProvider";
import { Tag } from "./types/Notestypes";
const NoteDetail = lazy(() => import("./components/NoteDetail"));
const NoteEdit = lazy(() => import("./components/NoteEdit"));
const NoteList = lazy(() => import("./components/NoteList/NoteList"));
const NewNote = lazy(() => import("./components/NewNote"));

const App = () => {
  const {
    notesWithTags: notes,
    setTags,
    tags,
  } = useNotes();

  const deleteTag = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  const updateTag = (updatedTags: Tag[]) => {
    setTags(updatedTags);
  };

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
                  <NoteList openTagsModal={openTagsModal} />
                </Suspense>
              }
            />
            <Route
              path="/new"
              element={
                <Suspense fallback="Loading...">
                  <NewNote />
                </Suspense>
              }
            />
            <Route path="/:id" element={<NoteLayout notes={notes} />}>
              <Route
                index
                element={
                  <Suspense fallback="loading..">
                    <NoteDetail />
                  </Suspense>
                }
              />
              <Route
                index
                path="edit"
                element={
                  <Suspense fallback="Loading..">
                    <NoteEdit />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/tag/:tag"
              element={<TagPage />}
            />
            <Route path="/archive" element={<Archive />} />
            <Route path="/bin" element={<Bin />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </main>
        <ViewNoteModal />
        <EditTagsModal
          availableTags={tags}
          show={showModal}
          handleCloseModal={handleCloseModal}
          deleteTag={deleteTag}
          updateTag={updateTag}
        />
        <Toaster />
      </Container>
    </>
  );
};

export default App;
