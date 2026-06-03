import React from "react";
import styles from "./Spinner.module.css";

//! call it into file where api call and loading state is manage
// {loading && <Spinner/>}  just like this
const Spinner = () => {
  return (
    <div className={styles.spinner_wrapper}>
      <div className={styles.spinner}>
        {/* <h1 className={styles.spinner_header}>Spinner</h1> */}
      </div>
    </div>
  );
};

export default Spinner;
