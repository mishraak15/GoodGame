import React, { useState } from "react";
import "./Card.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

export default function Card({ data, saved = false }) {
  const [liked, setLiked] = useState(saved);

  function addClickHandler() {
    setLiked(true);
    let saved = localStorage.getItem("saved");
    if (saved == null) {
      localStorage.setItem("saved", JSON.stringify([data]));
    } else {
      let s = JSON?.parse(saved);
      s.push(data);
      localStorage.setItem("saved", JSON.stringify(s));
    }
  }

  function removeClickHandler() {
    setLiked(false);
    let saved = localStorage.getItem("saved");
    let s = JSON?.parse(saved);
    s = s.filter((d) => d != data);
    localStorage.setItem("saved", JSON.stringify(s));
    console.log(s);
  }

  return (
    <div className="Card">
      <h2>{data}</h2>
      {liked ? (
        <AiFillLike className="icon" onClick={() => removeClickHandler()} />
      ) : (
        <AiOutlineLike className="icon" onClick={() => addClickHandler()} />
      )}
    </div>
  );
}
