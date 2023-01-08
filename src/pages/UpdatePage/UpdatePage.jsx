import { useLocation, useNavigate } from "react-router-dom";
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
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newHeight, setNewHeight] = useState("");
  const [newPictureUrl, setNewPictureUrl] = useState('');
  const navigate = useNavigate();

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
                  height
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
        setNewName(e.data.superheroes[0].name);
        setNewDesc(e.data.superheroes[0].description);
        setNewHeight(e.data.superheroes[0].height);
        setNewPictureUrl(e.data.superheroes[0].pictureUrl);
      })
      .catch((e) => console.log(e));
  }, []);

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
        setData((prev) => {
          return {
            ...prev,
            superpowers: prev.superpowers.filter((e) => e.id !== id),
          };
        });
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
          }`,
      }),
    };
    fetch("https://localhost:7085/graphql/", requestOption)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        let newPower = e.data.addSuperpower;
        setData((prev) => {
          return {
            ...prev,
            superpowers: [...prev.superpowers, newPower],
          };
        });
      })
      .catch((e) => console.log(e));
    closeModal();
    setLoading(false);
  };

  const updateHendler = () => {
    setLoading(true);
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation{
          updateSuperhero (input: {
            id: ${data.id},
            name: "${newName}",
            description: "${newDesc}",
            height: "${newHeight}",
            pictureUrl: "${newPictureUrl}"
          }) {
            id
            name
            description
            height
            pictureUrl
          }
        }`,
      }),
    };
    fetch("https://localhost:7085/graphql/", requestOption)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setLoading(false);
        navigate("/", { replace: true });
      })
      .catch((e) => console.log(e));
  };

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
            onChange={(e) => {
              setNewName(e.target.value);
            }}
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
                <input type="text" id="link" onChange={(e) => {
                  setNewPictureUrl(e.target.value);
                }} />
              </div>
            </div>
            <div className={classes.description}>
              <textarea className={classes.area} onChange={e => {
                setNewDesc(e.target.value);
              }}>{data.description}</textarea>
              <div className={classes.powerHolder}>
                <h3>Powers:</h3>
                {data.superpowers.map((power) => {
                  return (
                    <div className={classes.power}>
                      <h4>{power.superPower}:</h4>
                      <p>{power.description}</p>
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
          <button className={classes.updateButton} onClick={updateHendler}>
            UPDATE SUPEHERO
          </button>
        </div>
      )}
    </>
  );
}
