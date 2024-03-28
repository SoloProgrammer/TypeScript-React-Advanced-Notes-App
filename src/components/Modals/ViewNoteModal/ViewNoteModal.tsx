import styles from "./ViewNoteModal.module.css";
import ReactMarkDown from "react-markdown";
import { RiFullscreenFill } from "react-icons/ri";
import { motion } from "framer-motion";
import CustomBadge from "../../CustomBadge";
import { Link } from "react-router-dom";
import { BsFillPinFill, BsPin } from "react-icons/bs";
import { useNotes } from "../../../context/NoteProvider";

const ViewNoteModal = () => {
  const {
    selectedNote,
    handleModalOffsetClick: handleOffsetClick,
    onPinNote,
  } = useNotes();

  if (!selectedNote) return;

  const { id, title, markdown, tags, isPinned } = selectedNote;
  return (
    <div className={styles.container} onClick={handleOffsetClick}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        layoutId={id}
        className={styles.box}
      >
        <div className={styles.top}>
          <h2 className={styles.title}>{title}</h2>
          <span
            onClick={() => {
              onPinNote(id);
              handleOffsetClick();
            }}
            className={`IconBtn ${styles.pinned}`}
          >
            {!isPinned ? <BsPin /> : <BsFillPinFill />}
          </span>
        </div>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <CustomBadge key={tag.id} label={tag.label} />
          ))}
        </div>
        <div className={styles.markdown}>
          <ReactMarkDown>{markdown}</ReactMarkDown>
        </div>
        <div className={styles.actions}>
          <span onClick={handleOffsetClick} className={styles.fsBtn}>
            <Link to={`/${id}`}>
              <RiFullscreenFill />
            </Link>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewNoteModal;
