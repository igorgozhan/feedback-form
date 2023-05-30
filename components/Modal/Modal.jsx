import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ header, children, setIsOpen }) => {
  return (
    <>
      <div className={styles.modalBg} onClick={() => setIsOpen(false)} />
      <div className={styles.positionCenter}>
        <div className={styles.modalWindow}>
          <h5 className={styles.modalTitle}>{header}</h5>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            X
          </button>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
