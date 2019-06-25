import React, { useContext } from "react";
import styled from "styled-components";

import { CardStates, HumanReadableCardStates } from "../constants";
import Card from "./Card";
import { BoardContext } from "./BoardContext";
import { AddButton } from "./Buttons";

export default ({ toggleModal, deleteCard, editCard }) => {
  const {
    state: { cards }
  } = useContext(BoardContext);

  return (
    <FlexDiv>
      {Object.entries(cards).map((val, indx) => {
        return (
          <FlexCol key={CardStates[indx + 1]}>
            <CenteringFlexDiv>
              <Title>{HumanReadableCardStates[indx + 1]}</Title>
              {val[1].map(cardData => (
                <Card
                  key={cardData.id}
                  data={cardData}
                  edit={toggleModal}
                  deleteCard={deleteCard}
                  changeCardStatus={editCard}
                />
              ))}

              <ButtonDiv>
                <AddButton onClick={() => toggleModal(undefined, indx + 1)}>
                  Add Card
                </AddButton>
              </ButtonDiv>
            </CenteringFlexDiv>
          </FlexCol>
        );
      })}
    </FlexDiv>
  );
};

const FlexDiv = styled.div`
  display: flex;
`;

const FlexCol = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  flex: 1;
`;

const CenteringFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background-color: beige;
  border-color: darkgoldenrod;
  border-width: 2px;
  border-style: solid;
  box-shadow: 5px 5px;
`;

const Title = styled.h2`
  text-shadow: 1px 1px black;
  text-align: center;
  text-transform: capitalize;
`;

const ButtonDiv = styled.div`
  margin: 5px;
`;
