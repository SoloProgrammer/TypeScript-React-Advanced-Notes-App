import { Card, CardBody, Stack } from "react-bootstrap";
import { SimplifiedNote } from "../types/Notestypes";
import Styles from "./css/noteCard.module.css";
import CustomBadge from "./CustomBadge";

type NoteCardProps = {
  note: SimplifiedNote;
};

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <Card className={`p-4 pb-2 text-center ${Styles.noteCard}`}>
      <CardBody>{note.title}</CardBody>
      <Stack direction="horizontal" gap={2}>
        {note.tags.map((tag) => (
          <CustomBadge key={tag.id} label={tag.label} />
        ))}
      </Stack>
    </Card>
  );
};

export default NoteCard;
