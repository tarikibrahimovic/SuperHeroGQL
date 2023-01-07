import classes from "./LandingPage.module.css";
import InfoCard from "../../components/InfoCard/InfoCard";
import SerachBar from "../../components/SearchBar/SearchBar";   
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [data, setData] = useState([]);
  let link = process.env.REACT_APP_BACKEND_LINK;

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query{
            superheroes{
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
          }
          `,
      }),
    };
    fetch(link, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res.data.superheroes);
      });
  }, []);

  return (
    <div className={classes.main}>
        <SerachBar/>
      <div className={classes.container}>
        {data.map((item) => {
          return (
            <InfoCard
              key={item.id}
              item={item}
            />
          );
        })}
      </div>
    </div>
  );
}
