import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { SimplifiedNote } from "../../types/Notestypes";
import { Link, useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";
import { ReactNode, useMemo } from "react";
import NoteCard from "../NoteCard";
import styles from "./NoteList.module.css";
import { useNotes } from "../../context/NoteProvider";

type NoteListProps = {
  openTagsModal: () => void;
};

const NoteList = ({ openTagsModal }: NoteListProps) => {
  // Filteration of notes using search params

  const { notesWithTags: notes, tags: availableTags } = useNotes();
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
          )) &&
        !note.isArchived
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
            <Button onClick={openTagsModal} variant="outline-secondary">
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <h4>Filter Notes by:</h4>
      <Form className="mb-4">
        <Row xs={1} sm={2}>
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
      <div>{notes.length > 0 && filteredNotes.length < 1 && <NotFound />}</div>
      <DisplayNotes notes={filteredNotes} />
    </>
  );
};

type DisplayNotesProps = {
  notes: SimplifiedNote[];
};

export const DisplayNotes = ({ notes }: DisplayNotesProps) => {
  const { handleArchiveNote, onPinNote } = useNotes();
  const pinnedNotes = notes.filter((note) => note.isPinned);
  const otherNotes = notes.filter((note) => !note.isPinned);
  return (
    <>
      {pinnedNotes.length > 0 && (
        <div>
          <h3 className="notesHeading">PINNED</h3>
          <div className={`${styles.list}`}>
            {pinnedNotes.map((note) => {
              return (
                <NoteCard
                  handleArchiveNote={handleArchiveNote}
                  key={note.id}
                  note={note}
                  onPinNote={onPinNote}
                />
              );
            })}
          </div>
        </div>
      )}
      {otherNotes.length > 0 && (
        <div>
          {pinnedNotes.length > 0 && <h3 className="notesHeading">OTHERS</h3>}
          <div className={`${styles.list}`}>
            {otherNotes.map((note) => {
              return (
                <NoteCard
                  handleArchiveNote={handleArchiveNote}
                  key={note.id}
                  note={note}
                  onPinNote={onPinNote}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export function NotFound({
  icon,
  title,
}: {
  icon?: ReactNode;
  title?: string;
}) {
  return (
    <div className="not-found">
      {icon ? (
        <div className={styles.notFoundIcon}>{icon}</div>
      ) : (
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/020/487/380/small/empty-folder-no-result-document-file-data-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
          alt="not found"
          width={200}
        />
      )}
      <span className={styles.notFoundTitle}>
        {title || "No matching results"}
      </span>
    </div>
  );
}

export default NoteList;
