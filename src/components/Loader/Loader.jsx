import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import styles from './style.module.css'
const Loader = ({loading}) => {
    return (
        <div className={styles.main}>
            <ClipLoader color='0CA37F' loading={loading} size={100} />
        </div>
)
};

export default Loader;