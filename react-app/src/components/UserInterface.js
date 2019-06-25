import React, { useContext } from "react";
import styled from "styled-components";

import AgileBoard from "./AgileBoard";
import { UserContext } from "../App";
import { BoardContextProducer } from "./BoardContext";
import { LogoutButton } from "./Buttons";

export default () => {
  const { logout, user } = useContext(UserContext);

  return (
    <div>
      <WrapperDiv>
        <StatusDiv>
          Logged in as <NameSpan>{user.username}</NameSpan>
        </StatusDiv>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </WrapperDiv>
      <BoardContextProducer>
        <AgileBoard />
      </BoardContextProducer>
    </div>
  );
};

const WrapperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
`;

const StatusDiv = styled.div`
  font-size: 40px;
`;

const NameSpan = styled.span`
  font-style: italic;
  color: pink;
`;
