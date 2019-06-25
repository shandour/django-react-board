import React, { useReducer, useContext, createContext } from "react";
import remove from "lodash/remove";
import findIndex from "lodash/findIndex";
import produce from "immer";

const boardReducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case "SET_CARDS":
        draft.cards = action.payload.cards;
        break;
      case "ADD_CARD":
        draft.cards[action.payload.status].push(action.payload.card);
        break;
      case "REMOVE_CARD":
        remove(
          draft.cards[action.payload.status],
          val => val.id === action.payload.id
        );
        break;
      case "EDIT_CARD":
        const index = findIndex(draft.cards[action.payload.status], [
          "id",
          action.payload.id
        ]);
        draft.cards[action.payload.status][index] = action.payload.card;
        break;
      default:
        return state;
    }
  });

const initialValue = {
  cards: {}
};

export const BoardContext = createContext(initialValue);

export const BoardContextProducer = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, initialValue);
  const initState = { state, dispatch };

  return (
    <BoardContext.Provider value={initState}>{children}</BoardContext.Provider>
  );
};

// export const getBoardContextState = () => useContext(BoardContext);
