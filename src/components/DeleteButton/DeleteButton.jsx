import { useState } from "react";
import classes from "./DeleteButton.module.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


export default function DeleteButton({ id }) {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
      setIsOpen(true);
    }
    
    function closeModal() {
      setIsOpen(false);
    }
    
    function deleteItem() {
      console.log("delete");
      closeModal()
    }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Are you sure?</h2>
        <div className={classes.modalContainer}>
          <button onClick={closeModal} className={classes.modalClose}>
            Cancel
          </button>
          <button onClick={deleteItem} className={classes.modalDelete}>
            Delete
          </button>
        </div>
      </Modal>
      <button className={classes.button} onClick={openModal}>
        Delete
      </button>
    </>
  );
}
