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

export default function DeleteButton({ id, setData, setDisplayedData }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function deleteItem() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation{
            deleteSuperhero (input: {
              id: ${id}
            }){
              id
              name
              description
            }
          }`,
      }),
    };
    fetch("https://localhost:7085/graphql/", requestOptions)
      .then((e) => {
        return e.json();
      })
      .catch((e) => console.log(e));

    setData((prev) => {
      return prev.filter((e) => e.id !== id);
    });

    setDisplayedData((prev) => {
      return prev.filter((e) => e.id !== id);
    });

    closeModal();
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
