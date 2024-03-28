import { Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import CustomBadge from "./CustomBadge";
import { Link } from "react-router-dom";
import ReactMarkDown from "react-markdown";
import ConfirmModal from "./Modals/ConfirmModal";
import { useState } from "react";
import { useNotes } from "../context/NoteProvider";

const NoteDetail = () => {
  const { onDeleteNote: handleDelete } = useNotes();

  const note = useNote();

  const [show, setShow] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleConfirm = () => handleDelete(note.id);

  return (
    <>
      <Row className="mb-4">
        <Col>
          <Link to={".."}>
            <Button variant="outline-secondary">Back</Button>
          </Link>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <ConfirmModal
              btnText="delete"
              title="Delete Note!"
              desc="Are you sure you want to delete the note?"
              show={show}
              handleConfirm={handleConfirm}
              handleCloseModal={handleCloseModal}
            >
              <Button onClick={() => setShow(true)} variant="outline-danger">
                Delete
              </Button>
            </ConfirmModal>
          </Stack>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h1>{note.title}</h1>
          <Stack direction="horizontal" gap={2}>
            {note.tags.length > 0 &&
              note.tags.map((tag) => (
                <CustomBadge key={tag.id} label={tag.label} />
              ))}
          </Stack>
        </Col>
      </Row>
      <ReactMarkDown>{note.markdown}</ReactMarkDown>
    </>
  );
};

export default NoteDetail;
