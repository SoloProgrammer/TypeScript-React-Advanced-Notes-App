import { Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import CustomBadge from "./CustomBadge";
import { Link } from "react-router-dom";
import ReactMarkDown from "react-markdown";

type NoteDetailProps = {
  handleDelete: (id: string) => void;
};

const NoteDetail = ({ handleDelete }: NoteDetailProps) => {
  const note = useNote();

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
            <Button
              onClick={() => handleDelete(note.id)}
              variant="outline-danger"
            >
              Delete
            </Button>
          </Stack>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h1>{note.title}</h1>
          <Stack direction="horizontal" gap={2}>
            {note.tags.length &&
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
