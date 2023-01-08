import classes from "./AddButton.module.css";
import Modal from "react-modal";
import { useState } from "react";

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

export default function AddButton({ data, setData, setDisplayedData, setLoading }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [height, setHeight] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const AddHeroHandler = () => {
    setLoading(true)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation{
            addSuperhero (input: {
              name: "${name}",
              description: "${description}",
              height: "${height}",
              pictureUrl: "${pictureUrl}"
            }) {
              id
              name
              description
              height
              pictureUrl
            }
          }
          `,
      }),
    };
    fetch("https://localhost:7085/graphql/", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData([...data, res.data.addSuperhero]);
        setDisplayedData([...data, res.data.addSuperhero]);
        closeModal();
      })
      .catch((err) => console.log(err));
      setLoading(false)
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Add Superhero</h2>
        <div className={classes.modalMain}>
          <div className={classes.modalInput}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={classes.modalInput}>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={classes.modalInput}>
            <label htmlFor="pictureUrl">Picture Url</label>
            <input
              type="text"
              id="pictureUrl"
              onChange={(e) => setPictureUrl(e.target.value)}
            />
          </div>
          <div className={classes.modalInput}>
            <label htmlFor="height">Height</label>
            <input
              type="text"
              id="height"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className={classes.modalContainer}>
            <button onClick={closeModal} className={classes.modalClose}>
              Cancel
            </button>
            <button onClick={AddHeroHandler} className={classes.modalDelete}>
              Add Hero
            </button>
          </div>
        </div>
      </Modal>
      <button onClick={openModal} className={classes.addSuperheroButton}>
        ADD SUPERHERO
      </button>
    </>
  );
}
