import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";

import axios from "../axios";
import { UserContext } from "../App";
import { FlexForm, InputDiv, Input, Label, ButtonDiv, ErrorDiv } from "./FormComponents";

import { SubmitButton } from "./Buttons";

export default () => {
  const { login } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginForm, setLoginForm] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const submit = async e => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const data = {
      username,
      password
    };

    try {
      if (loginForm) {
        const resp = await axios.post("login/", data);
        localStorage.setItem("token", resp.data.token);
        const currentUserResp = await axios.get("current-user/", {
          token: resp.data.token
        });
        login(currentUserResp.data);
      } else {
        const resp = await axios.post("register/", data);
        localStorage.setItem("token", resp.data.token);
        const {
          data: { user }
        } = resp;
        login(user);
      }
    } catch ({ response }) {
      if (response) {
        setErrors(response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleLoginOrRegister = () => setLoginForm(!loginForm);

  return (
    <Wrapper>
      <div>
        {loginForm ? (
          <>
            <CenteredTitle>Login</CenteredTitle>
            <ToggleDiv onClick={toggleLoginOrRegister}>
              Not a user yet? Click here to <TiggleSpan>register</TiggleSpan>!
            </ToggleDiv>
          </>
        ) : (
          <>
            <CenteredTitle>Register</CenteredTitle>
            <ToggleDiv onClick={toggleLoginOrRegister}>
              Have an account? Click here to <TiggleSpan>login</TiggleSpan>!
            </ToggleDiv>
          </>
        )}
        <FlexForm onSubmit={submit}>
          <Label htmlFor="username">Username</Label>
          <InputDiv>
            <Input
              name="username"
              type="text"
              onChange={e => setUsername(e.target.value)}
              disabled={loading}
              required
            />
          </InputDiv>
          {errors.username && (
            <ErrorDiv> {errors.username.join(". ")} </ErrorDiv>
          )}
          <Label htmlFor="password">Password</Label>
          <InputDiv>
            <Input
              name="password"
              type="password"
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </InputDiv>
          {errors.password && (
            <ErrorDiv> {errors.password.join(". ")} </ErrorDiv>
          )}
          <ButtonDiv>
            <SubmitButton type="submit" disabled={loading}>
              Submit
            </SubmitButton>
          </ButtonDiv>
        </FlexForm>
        {errors.non_field_errors && (
          <ErrorDiv> {errors.non_field_errors.join(". ")} </ErrorDiv>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const CenteredTitle = styled.h2`
  text-align: center;
`;

const ToggleDiv = styled.div`
  margin: 40px;
`;

const TiggleSpan = styled.span`
  text-decoration: underline;
  color: red;
`;
