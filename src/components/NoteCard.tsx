import { Card, CardBody, Stack } from "react-bootstrap";
import { NoteCardProps } from "../types/Notestypes";
import styles from "./css/noteCard.module.css";
import CustomBadge from "./CustomBadge";
import { BsFillPinFill, BsPin } from "react-icons/bs";
import { motion } from "framer-motion";
import { LuTrash } from "react-icons/lu";
import { MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
import { useNotes } from "../context/NoteProvider";
import { FaTrashAlt, FaTrashRestoreAlt } from "react-icons/fa";
import ConfirmModal from "./Modals/ConfirmModal";
import { useState } from "react";

const NoteCard = ({ note, onPinNote, handleArchiveNote }: NoteCardProps) => {
  const handlePinNote = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onPinNote(note.id);
  };
  const {
    handleNoteClick: handleClick,
    handleTrashNote,
    deleteNoteForEver,
  } = useNotes();

  const [show, setShow] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShow(false);
  };
  const handleConfirm = () => deleteNoteForEver(note.id);

  return (
    <motion.div
      className={styles.container}
      onClick={() => handleClick(note.id)}
      layoutId={note.id}
    >
      <Card className={`p-4 pb-2 text-center ${styles.noteCard}`}>
        <span
          onClick={handlePinNote}
          className={`IconBtn ${styles.pin} ${
            note.isPinned ? styles.pinned : ""
          }`}
        >
          {!note.isPinned ? <BsPin /> : <BsFillPinFill />}
        </span>
        <CardBody>{note.title}</CardBody>
        <Stack direction="horizontal" gap={2}>
          {note.tags.map((tag) => (
            <CustomBadge key={tag.id} label={tag.label} />
          ))}
        </Stack>
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
          {note.isTrashed && (
            <ConfirmModal
              btnText="Yes delete"
              desc="Delete Note forever?"
              handleCloseModal={handleCloseModal}
              show={show}
              title="Delete Note!"
              handleConfirm={handleConfirm}
            >
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setShow(true);
                }}
                className="IconBtn trashIcon"
              >
                <FaTrashAlt />
              </span>
            </ConfirmModal>
          )}
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleTrashNote(note.id);
            }}
            className="IconBtn trashIcon"
          >
            {note.isTrashed ? <FaTrashRestoreAlt /> : <LuTrash />}
          </span>
          {!note.isTrashed && (
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleArchiveNote && handleArchiveNote(note.id);
              }}
              className="IconBtn"
            >
              {note.isArchived ? <MdOutlineUnarchive /> : <MdOutlineArchive />}
            </span>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default NoteCard;
