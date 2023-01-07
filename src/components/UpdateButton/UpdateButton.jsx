import classes from "./UpdateButton.module.css";
import { useNavigate } from "react-router-dom";

export default function UpdateButton({ item }) {
  const navigate = useNavigate();

  return (
    <>
      <button
        className={classes.button}
        onClick={(e) => {
          navigate(`/update`, {
            state: item
          });
        }}
      >
        Update
      </button>
    </>
  );
}
