import { Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import CustomBadge from "./CustomBadge";
import { Link } from "react-router-dom";
import ReactMarkDown from "react-markdown";
import ConfirmModal from "./Modals/ConfirmModal";
import { useState } from "react";
import { useNotes } from "../context/NoteProvider";
import { showToast } from "../utils/toast";
import { NotFound } from "./NoteList/NoteList";
import { ImEyeBlocked } from "react-icons/im";

const NoteDetail = () => {
  const note = useNote();

  const { onDeleteNote: handleDeleteNote } = useNotes();

  const [show, setShow] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleConfirm = () => handleDeleteNote(note.id);

  const { isArchived, isTrashed } = note;

  if (isArchived || isTrashed) {
    showToast(
      `${isArchived ? "UnArchive" : ""} ${
        isTrashed ? "Restore" : ""
      } Note to view in full screen mode`,
      { icon: "❌", position: "bottom-right", duration: 3000 }
    );
    return <NotFound icon={<ImEyeBlocked />} title="No Preview available" />;
  }

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
