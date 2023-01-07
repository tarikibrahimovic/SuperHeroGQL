import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./UpdatePage.module.css";
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

export default function UpdatePage() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const link = process.env.REACT_APP_BACKEND_URL;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [superPowerName, setSuperPowerName] = useState("");
  const [superPowerDesc, setSuperPowerDesc] = useState("");
  const [temp, setTemp] = useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setLoading(true);
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query{
                superheroes(where: {id : {eq: ${location.state.id}}}){
                  id
                  name
                  description
                  pictureUrl
                  superpowers{
                    id
                    superPower
                    description
                  }
                }
              }`,
      }),
    };
    fetch("https://localhost:7085/graphql/", requestOption)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setData(e.data.superheroes[0]);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [temp]);

  const deletePower = (id) => {
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation{
            deleteSuperpower(input: {
              id: ${id}
            }) {
              id
            }
          }`,
      }),
    };
    fetch("https://localhost:7085/graphql/", requestOption)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setData(prev => {
            return {
                ...prev,
                superpowers: prev.superpowers.filter(e => e.id !== id)
            }
        })
      })
      .catch((e) => console.log(e));
  };

  const AddPower = () => {
    setLoading(true);
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation{
            addSuperpower (input: {
              superPower: "${superPowerName}",
              description: "${superPowerDesc}",
              superheroId: ${data.id}
            })
            {
              id
              description
              superPower
              superheroId
            }
          }`
      }),
    };
    fetch("https://localhost:7085/graphql/", requestOption)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        let newPower = e.data.addSuperpower;
        setData(prev => {
            return {
                ...prev,
                superpowers: [...prev.superpowers, newPower]
            }
        })
      })
      .catch((e) => console.log(e));
    closeModal();
    setLoading(false);
  };

  //   console.log(data);
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={classes.modalInput}>
          <label htmlFor="powerName">Superpower name:</label>
          <input
            type="text"
            id="powerName"
            placeholder="Enter Superpower name"
            onChange={(e) => {
              setSuperPowerName(e.target.value);
            }}
          />
        </div>
        <div className={classes.modalInput}>
          <label htmlFor="powerDescription">Superpower description:</label>
          <input
            type="text"
            id="powerDescription"
            placeholder="Enter Superpower description"
            onChange={(e) => {
              setSuperPowerDesc(e.target.value);
            }}
          />
        </div>
        <div className={classes.modalContainer}>
          <button onClick={closeModal} className={classes.modalClose}>
            Cancel
          </button>
          <button onClick={AddPower} className={classes.modalDelete}>
            Add Power
          </button>
        </div>
      </Modal>
      {!loading && (
        <div className={classes.main}>
          <label htmlFor="naslov">ENTER NEW NAME</label>
          <input
            type="text"
            id="naslov"
            placeholder={data.name}
            className={classes.title}
          />
          <div className={classes.container}>
            <div className={classes.imgHolder}>
              <img
                src={data.pictureUrl}
                className={classes.poster}
                alt={data.title}
              />
              <div className={classes.link}>
                <label htmlFor="link">ENTER NEW LINK</label>
                <input type="text" id="link" />
              </div>
            </div>
            <div className={classes.description}>
              <textarea className={classes.area}>{data.description}</textarea>
              <div className={classes.powerHolder}>
                <h3>Powers:</h3>
                {data.superpowers.map((power) => {
                  return (
                    <div className={classes.power}>
                      <h4>{power.superPower}:</h4>
                      <p>
                        {power.description} {power.id}
                      </p>
                      <button
                        className={classes.deletePower}
                        onClick={(e) => deletePower(power.id)}
                      >
                        DELETE POWER
                      </button>
                    </div>
                  );
                })}
                <div className={classes.buttonHolder}>
                  <button onClick={openModal}>Add Power</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
