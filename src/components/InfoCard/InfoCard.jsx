import DeleteButton from "../DeleteButton/DeleteButton";
import UpdateButton from "../UpdateButton/UpdateButton";
import classes from "./InfoCard.module.css";

export default function InfoCard({ item }) {
  return (
    <div className={classes.main}>
      <h1>{item.name}</h1>
      <div className={classes.container}>
        <div className={classes.imgHolder}>
          <img
            src={item.pictureUrl}
            className={classes.poster}
            alt={item.title}
          />
        </div>
        <div className={classes.description}>
          <p className={classes.descriptionText}>{item.description}</p>
          <h3 className={classes.descriptionText}>Powers:</h3>
          {item.superpowers.map((power) => {
            return (
              <>
                <h4 className={classes.descriptionText}>{power.superPower}:</h4>
                <p>{power.description}</p>
              </>
            );
          })}
          <div className={classes.buttonHolder}>
            <UpdateButton item={item} />
            <DeleteButton id={item.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
