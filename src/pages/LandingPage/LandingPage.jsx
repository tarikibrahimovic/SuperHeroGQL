import classes from "./LandingPage.module.css";
import InfoCard from "../../components/InfoCard/InfoCard";
import SerachBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import AddButton from "../../components/AddButton/AddButton";

export default function LandingPage() {
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setDisplayedData(res.data.superheroes);
      });
      setLoading(false);
  }, []);

  return (
    <div className={classes.main}>
      <SerachBar setDisplayedData={setDisplayedData} data={data}/>
        <AddButton data={data} setData={setData} setDisplayedData={setDisplayedData} setLoading={setLoading}/>
      <div className={classes.container}>
        {displayedData.map((item) => {
          return <InfoCard key={item.id} item={item} setData={setData} setDisplayedData={setDisplayedData}/>;
        })}
      </div>
    </div>
  );
}
