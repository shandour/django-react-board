import React, { useEffect, useState, useContext } from "react";
import axios from "../axios";

import CardWrapper from "./CardWrapper";
import { BoardContext } from "./BoardContext";

export default () => {
  const { dispatch } = useContext(BoardContext);
  const [error, setError] = useState("");

  const loadCards = async () => {
    try {
      const resp = await axios.get("cards/");
      dispatch({
        type: "SET_CARDS",
        payload: {
          cards: resp.data
        }
      });
    } catch (e) {
      setError("Network error");
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  return !error ? <CardWrapper /> : <div>{error}</div>;
};
