import styles from "./SideBar.module.css";
import {
  MdLabelOutline,
  MdOutlineArchive,
  MdOutlineCreate,
} from "react-icons/md";
import { AiOutlineBulb } from "react-icons/ai";
import { Tag } from "../../../types/Notestypes";
import { BsTrash } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PiNotePencil } from "react-icons/pi";
type SideBarProps = {
  tags: Tag[];
  toggleSidebar: () => void;
  open: true | false;
  isModalOpen: boolean;
  openTagsModal: () => void;
};
const SideBar = ({
  tags,
  open = false,
  toggleSidebar,
  isModalOpen,
  openTagsModal,
}: SideBarProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    toggleSidebar();
  }, [pathname]);

  return (
    <>
      <div
        onClick={toggleSidebar}
        className={`${!open ? styles.wall : ""}`}
      ></div>
      <aside className={`${styles.container}  ${!open ? styles.close : ""}`}>
        <ul className={styles.list}>
          <Link to={"/"}>
            <li
              className={`${styles.item} ${!open ? styles.close : ""} ${
                !isModalOpen && pathname === "/" ? styles.selected : ""
              }`}
            >
              <span>
                <AiOutlineBulb />
              </span>
              Notes
            </li>
          </Link>
          <Link to={"/new"}>
            <li
              className={`${styles.item} ${!open ? styles.close : ""} ${
                !isModalOpen && pathname === "/new" ? styles.selected : ""
              }`}
            >
              <span>
                <PiNotePencil />
              </span>
              Create new Note
            </li>
          </Link>
          <li
            onClick={openTagsModal}
            className={`${styles.item} ${!open ? styles.close : ""} ${
              isModalOpen ? styles.selected : ""
            } `}
          >
            <span>
              <MdOutlineCreate />
            </span>
            Edit tags
          </li>
          <Link to={"/archive"}>
            <li
              className={`${styles.item} ${!open ? styles.close : ""} ${
                !isModalOpen && pathname === "/archive" ? styles.selected : ""
              }`}
            >
              <span>
                <MdOutlineArchive />
              </span>
              Archive
            </li>
          </Link>
          <Link to="/bin">
            <li
              className={`${
                !isModalOpen && pathname === "/bin" ? styles.selected : ""
              } ${styles.item} ${!open ? styles.close : ""}`}
            >
              <span>
                <BsTrash />
              </span>
              Bin
            </li>
          </Link>
          <h4 style={{ margin: "5px 18px 5px 18px" }} className={`notesHeading ${styles.tagsHeading}`}>
            TAGS
          </h4>
          {tags.map((tag) => (
            <Link key={tag.id} to={`/tag/${tag.label}`}>
              <li
                className={`${styles.item} ${!open ? styles.close : ""} ${
                  !isModalOpen && pathname.replace("%20", " ") === `/tag/${tag.label.trim()}`
                    ? styles.selected
                    : ""
                }`}
              >
                <span>
                  <MdLabelOutline />
                </span>
                {tag.label}
              </li>
            </Link>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
