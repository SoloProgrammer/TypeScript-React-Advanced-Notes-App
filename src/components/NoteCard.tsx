import { Card, CardBody, Stack } from "react-bootstrap";
import { NoteCardProps } from "../types/Notestypes";
import styles from "./css/noteCard.module.css";
import CustomBadge from "./CustomBadge";
import { BsFillPinFill, BsPin } from "react-icons/bs";
import { motion } from "framer-motion";
import { LuTrash } from "react-icons/lu";
import { MdOutlineArchive } from "react-icons/md";

const NoteCard = ({ note, onPinNote }: NoteCardProps) => {
  const handlePinNote = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onPinNote(note.id);
  };
  return (
    <motion.div layoutId={note.id}>
      <Card className={`p-4 pb-2 text-center ${styles.noteCard}`}>
        <span
          onClick={handlePinNote}
          className={`${styles.pin} ${note.isPinned ? styles.pinned : ""}`}
        >
          {!note.isPinned ? <BsPin /> : <BsFillPinFill />}
        </span>
        <CardBody>{note.title}</CardBody>
        <Stack direction="horizontal" gap={2}>
          {note.tags.map((tag) => (
            <CustomBadge key={tag.id} label={tag.label} />
          ))}
        </Stack>
        <div className={styles.actions}>
          <span>
            <LuTrash />
          </span>
          <span>
            <MdOutlineArchive />
          </span>
        </div>
      </Card>
    </motion.div>
  );
};

export default NoteCard;
