import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";
import { Link, Navigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useNotes } from "../context/NoteProvider";

const NoteEdit = () => {
  const { onUpdateNote, tags: availableTags } = useNotes();
  const note = useNote();
  if (!note) return <Navigate to={"/"} />;
  return (
    <div>
      <Row>
        <Col>
          <h1>Edit your note!</h1>
        </Col>
        <Col xs="auto">
          <Link to={".."}>
            <Button variant="outline-secondary">Back</Button>
          </Link>
        </Col>
      </Row>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        isArchived={note.isArchived}
        isPinned={note.isPinned}
        onSubmit={(data) => onUpdateNote(note.id, data)}
        availableTags={availableTags}
      />
    </div>
  );
};

export default NoteEdit;
