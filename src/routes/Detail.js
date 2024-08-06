import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getDetail = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    setDetails(json.data.movie);
    setLoading(false);
  };

  useEffect(() => getDetail, []);

  return loading ? (
    <div className={styles.loading}>
      <div className={styles.loadingCircle}></div>
      <div className={styles.loadingCircle}></div>
      <div className={styles.loadingCircle}></div>
    </div>
  ) : (
    <div className={styles.main}>
      <h1 className={styles.h1}>Detail</h1>
      <div className={styles.detail}>
        <img src={detail.medium_cover_image}></img>
        <div>
          <h3> rating : {detail.rating}</h3>
        </div>
      </div>
    </div>
  );
};
export default Detail;
