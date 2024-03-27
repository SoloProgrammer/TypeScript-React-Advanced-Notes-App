import styles from "./SideBar.module.css";
import { MdLabelOutline, MdOutlineArchive } from "react-icons/md";
import { AiOutlineBulb } from "react-icons/ai";
import { Tag } from "../../../types/Notestypes";
import { BsTrash } from "react-icons/bs";
type SideBarProps = {
  tags: Tag[];
  open: true | false
};
const SideBar = ({ tags, open = false }: SideBarProps) => {
  return (
    <aside className={`${styles.container} ${open ? styles.open : ''}`}>
      <ul className={styles.list}>
        <li className={`${styles.item} ${styles.selected}`}>
          <span>
            <AiOutlineBulb />
          </span>
          Notes
        </li>
        {tags.map((tag) => (
          <li key={tag.id} className={`${styles.item}`}>
            <span>
              <MdLabelOutline />
            </span>
            {tag.label}
          </li>
        ))}
        <li className={styles.item}>
          <span>
            <MdOutlineArchive />
          </span>
          Archive
        </li>
        <li className={styles.item}>
          <span>
            <BsTrash />
          </span>
          Bin
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
