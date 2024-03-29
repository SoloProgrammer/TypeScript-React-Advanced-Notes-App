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
    window.innerWidth <= 770 && toggleSidebar();
  }, [pathname]);

  const links = [
    {
      path: "/",
      isSelected: pathname === "/" && !isModalOpen,
      name: "Notes",
      icon: <AiOutlineBulb />,
    },
    {
      path: "/new",
      isSelected: pathname === "/new" && !isModalOpen,
      name: "Create new note",
      icon: <MdOutlineCreate />,
    },
    {
      path: "",
      isSelected: isModalOpen,
      name: "Edit tags",
      onclick: openTagsModal,
      icon: <PiNotePencil />,
      isHide: tags.length < 1,
    },
    {
      path: "/archive",
      isSelected: pathname === "/archive" && !isModalOpen,
      name: "Archive",
      icon: <MdOutlineArchive />,
    },
    {
      path: "/bin",
      isSelected: pathname === "/bin" && !isModalOpen,
      name: "Bin",
      icon: <BsTrash />,
    },
  ];

  return (
    <>
      <div
        onClick={toggleSidebar}
        className={`${!open ? styles.wall : ""}`}
      ></div>
      <aside className={`${styles.container}  ${!open ? styles.close : ""}`}>
        <ul className={styles.list}>
          {links.map((link) => (
            <Link
              className={`${link.isHide ? styles.hide : ""}`}
              key={link.path}
              to={link.path}
            >
              <li
                onClick={(e) => {
                  if (link.onclick) {
                    e.preventDefault();
                    link.onclick();
                  }
                }}
                className={`${styles.item} ${!open ? styles.close : ""} ${
                  link.isSelected ? styles.selected : ""
                }`}
              >
                <span>{link.icon}</span>
                {link.name}
              </li>
            </Link>
          ))}
          {tags.length > 0 && (
            <h4
              style={{ margin: "5px 18px 5px 18px" }}
              className={`notesHeading ${styles.tagsHeading}`}
            >
              TAGS
            </h4>
          )}
          {tags.map((tag) => (
            <Link key={tag.id} to={`/tag/${tag.label}`}>
              <li
                className={`${styles.item} ${!open ? styles.close : ""} ${
                  !isModalOpen &&
                  pathname.replace("%20", " ") === `/tag/${tag.label.trim()}`
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
