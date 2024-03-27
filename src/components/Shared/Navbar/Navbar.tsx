import { FiMenu } from "react-icons/fi";
import styles from "./Navbar.module.css";
type NavbarProps = {
  toggleSidebar: () => void;
};
const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <div onClick={toggleSidebar} className={`${styles.menuIcon}`}>
          <FiMenu />
        </div>
        <img
          width={30}
          src="https://cdn-icons-png.flaticon.com/512/2965/2965358.png"
          alt="keep_logo"
        />
        <span>Dev Keep</span>
      </div>
    </header>
  );
};

export default Navbar;
