import React, { useState } from "react";
import styled from "styled-components";

import { EditButton, DangerBtn } from "./Buttons";
import { CardStates, HumanReadableCardStates } from "../constants";

export default ({ data, edit, deleteCard, changeCardStatus }) => {
  const [errors, setErrors] = useState({});
  const createdAt = new Date(data.createdAt).toLocaleString();
  const lastEdited = new Date(data.lastEdited).toLocaleString();

  return (
    <CardWrapperDiv>
      <select
        name="status"
        value={data.status || ""}
        onChange={e => {
          changeCardStatus(
            { ...data, ...{ status: e.target.value } },
            setErrors,
            data.status
          );
        }}
      >
        {Object.entries(HumanReadableCardStates).map(status => (
          <option key={`st-${status[0]}`} value={status[0]}>
            {status[1]}
          </option>
        ))}
      </select>
      <DeleteButtonDiv>
        <DangerBtn onClick={() => deleteCard(data, setErrors)}>
          Delete
        </DangerBtn>
      </DeleteButtonDiv>
      <DateFlexDiv>
        <DateDiv>Created: {createdAt}</DateDiv>
        {createdAt !== lastEdited && <DateDiv>Edited: {lastEdited}</DateDiv>}
      </DateFlexDiv>
      <TitleDiv>{data.title}</TitleDiv>
      <ContentDiv>{data.text}</ContentDiv>

      <EditButton type="button" onClick={() => edit(data)}>
        Edit
      </EditButton>
    </CardWrapperDiv>
  );
};

const CardWrapperDiv = styled.div`
  width: 90%;
  border: 1px solid gray;
  border-radius: 15px;
  box-shadow: 3px 7px;
  padding: 10px;
  margin: 15px;
  background: floralwhite;
`;

const DeleteButtonDiv = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 15px;
`;

const TitleDiv = styled.div`
  text-align: center;
  text-decoration: underline;
  text-transform: uppercase;
  font-weight: bold;
  padding: 5px;
  margin-bottom: 15px;
`;

const DateFlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateDiv = styled.div`
  font-size: 15px;
  padding: 4px;
  margin-bottom: 8px;
`;

const ContentDiv = styled.div`
  padding: 20px;
  word-break: break-all;
  background: #e5f5dc;
  margin-bottom: 20px;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 20px;
`;
