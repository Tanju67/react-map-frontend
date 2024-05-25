import { useContext } from "react";
import styles from "./ItemCountry.module.css";
import { BiSolidDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { SearchFormContext } from "../../shared/context/searchForm-context";

function ItemCountry({ flag, name, firstDay, lastDay, coord, id }) {
  const { dispatch } = useContext(SearchFormContext);

  return (
    <li className={styles.item}>
      <div className={styles.imgBox}>
        <img src={flag} alt={name} />
        <Link
          onClick={() => {
            dispatch({ type: "SET_ZOOM", payload: 6 });
          }}
          to={`?lat=${coord[0]}&lng=${coord[1]}`}
        >
          <span>{name}</span>
        </Link>
      </div>
      <div className={styles.dateBox}>
        <span>{firstDay}</span>
        <span>{lastDay}</span>
      </div>
      <Link
        to={`/app/detail?id=${id}&lat=${coord[0]}&lng=${coord[1]}`}
        onClick={() => {
          dispatch({ type: "SET_TAB_INDEX", payload: 3 });
        }}
        className={styles.btnBox}
      >
        <span>
          <BiSolidDetail />
        </span>
        <span className={styles.popup}>Detail</span>
      </Link>
    </li>
  );
}

export default ItemCountry;
