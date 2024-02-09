import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import useLocalStorage from "./Hooks/useLocalStorage";
import { Suspense, lazy, useMemo } from "react";
import { NoteData, RawNote, Tag } from "./types/Notestypes";
import "./App.css";
import NoteLayout from "./components/NoteLayout";
const NoteDetail = lazy(() => import("./components/NoteDetail"));
const NoteEdit = lazy(() => import("./components/NoteEdit"));
const NoteList = lazy(() => import("./components/NoteList"));
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

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback="Loading..">
              <NoteList
                deleteTag={deleteTag}
                updateTag={updateTag}
                availableTags={tags}
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
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  );
};

export default App;
