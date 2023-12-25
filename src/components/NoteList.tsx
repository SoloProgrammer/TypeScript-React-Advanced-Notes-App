import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { SimplifiedNote, Tag } from "../types/Notestypes";
import { Link, useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";
import { useMemo } from "react";
import NoteCard from "./NoteCard";

type NoteListProps = {
  notes: SimplifiedNote[];
  availableTags: Tag[];
};
const NoteList = ({ notes, availableTags }: NoteListProps) => {
  // Filteration of notes using search params
  const [searchParsms, setSearchParams] = useSearchParams({
    title: "",
    selectedTagsIds: "",
  });

  const title = searchParsms.get("title") || "";
  const selectedTagsIds = searchParsms.get("selectedTagsIds")?.split("+");
  const selectedTags = availableTags.filter((tag) =>
    selectedTagsIds?.includes(tag.id)
  );

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        ((title && note.title.toLowerCase().includes(title.toLowerCase())) ||
          title === "") &&
        (!selectedTagsIds![0] ||
          selectedTagsIds?.every((id) =>
            note.tags.some((tag) => tag.id === id)
          ))
      );
    });
  }, [title, selectedTagsIds]);

  return (
    <>
      <Row className="mb-3">
        <Col>
          <h1>Your Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={"/new"}>
              <Button>Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <h4>Filter Notes by:</h4>
      <Form className="mb-4">
        <Row  xs={1} sm={2}>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) =>
                  setSearchParams(
                    (prev) => {
                      prev.set("title", e.target.value);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="select">
              <Form.Label>Select</Form.Label>
              <ReactSelect
                // value prop - needs to show the tag
                value={selectedTags.map((tag) => {
                  return { label: `# ${tag.label}`, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                // Onchange prop - needs to remove the tag when click on to cross mark
                onChange={(tags) => {
                  setSearchParams(
                    (prev) => {
                      prev.set(
                        "selectedTagsIds",
                        tags.map((tag) => tag.value).join("+")
                      );
                      return prev;
                    },
                    { replace: true }
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => {
          return (
            <Link
              style={{ textDecoration: "none" }}
              key={note.id}
              to={`/${note.id}`}
            >
              <Col>
                <NoteCard note={note} />
              </Col>
            </Link>
          );
        })}
      </Row>
    </>
  );
};

export default NoteList;
