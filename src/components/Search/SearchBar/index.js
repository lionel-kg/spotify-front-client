import styles from "./index.module.scss";
import { IoIosSearch, IoIosClose } from "react-icons/io";

const Index = ({ onSearch, inputRef, onDelete, value }) => {
  return (
    <div className={styles.search_container}>
      <IoIosSearch size={25} />
      <input
        type="text"
        placeholder="Que souhaitez-vous écouter ?"
        onChange={onSearch}
        ref={inputRef}
        value={value}
      />
      {value && <IoIosClose size={25} onClick={onDelete} />}
    </div>
  );
};

export default Index;