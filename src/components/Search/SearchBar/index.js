import styles from "./index.module.scss";
import { IoIosSearch } from "react-icons/io";

const Index = ({ onSearch }) => {
  return (
    <div className={styles.search_container}>
      <IoIosSearch size={25} />
      <input type="text" placeholder="Que souhaitez-vous écouter ?" onChange={onSearch} />
    </div>
  );
};

export default Index;