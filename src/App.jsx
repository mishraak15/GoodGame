import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Card from "./components/Card/Card";

function App() {
  const [quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchFullData() {
    // let url = process.env.REACT_APP_URL;
    setLoading(true);
    axios
      .get("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
      .then((res) => {
        setQuote((pre) => [...pre, res?.data[0]]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchFullData();
    fetchFullData();
  }, []);

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  } else {
    return (
      <div className="App">
        <div className="top-box">
          <span className="head">Quote for you!!</span>
          <span
            className="new-btn"
            onClick={() => {
              setQuote([]);
              fetchFullData();
            }}
          >
            New Quote
          </span>
        </div>
        <div className="quote-box">
          {quote?.map((d, index) => (
            <Card key={index} data={d} />
          ))}
        </div>

        <span className="head">Saved Quote!!</span>

        <div className="quote-box">
          {localStorage?.getItem("saved") === null ||
          JSON.parse(localStorage?.getItem("saved")).length === 0 ? (
            <h3>NO Saved Quotes!</h3>
          ) : (
            JSON.parse(localStorage?.getItem("saved")).map((s, index) => (
              <Card key={index} data={s} saved={true} />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
