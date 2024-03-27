import styles from "./SideBar.module.css";
import { MdLabelOutline, MdOutlineArchive } from "react-icons/md";
import { AiOutlineBulb } from "react-icons/ai";
import { Tag } from "../../../types/Notestypes";
import { BsTrash } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
type SideBarProps = {
  tags: Tag[];
  toggleSidebar: () => void;
  open: true | false;
};
const SideBar = ({ tags, open = false, toggleSidebar }: SideBarProps) => {
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
                pathname === "/" ? styles.selected : ""
              }`}
            >
              <span>
                <AiOutlineBulb />
              </span>
              Notes
            </li>
          </Link>
          {tags.map((tag) => (
            <Link key={tag.id} to={`/tag/${tag.label}`}>
              <li
                className={`${styles.item} ${!open ? styles.close : ""} ${
                  pathname === `/tag/${tag.label}` ? styles.selected : ""
                }`}
              >
                <span>
                  <MdLabelOutline />
                </span>
                {tag.label}
              </li>
            </Link>
          ))}
          <li className={`${styles.item} ${!open ? styles.close : ""}`}>
            <span>
              <MdOutlineArchive />
            </span>
            Archive
          </li>
          <li className={`${styles.item} ${!open ? styles.close : ""}`}>
            <span>
              <BsTrash />
            </span>
            Bin
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
