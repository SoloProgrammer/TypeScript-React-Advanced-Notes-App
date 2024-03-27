import NoteForm from "./NoteForm";
import { EditNoteProps } from "../types/Notestypes";
import { useNote } from "./NoteLayout";
import { Link, Navigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";

const NoteEdit = ({ onUpdateNote, onAddTag, availableTags }: EditNoteProps) => {
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
        onSubmit={(data) => onUpdateNote(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default NoteEdit;
