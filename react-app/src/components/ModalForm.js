import React, { useState } from "react";
import styled from "styled-components";

import { CardStates, HumanReadableCardStates } from "../constants";
import { CancelButton, SubmitButton } from "./Buttons";
import {
  FlexForm,
  InputDiv,
  Input,
  TextArea,
  Label,
    ButtonDiv,
    ErrorDiv
} from "./FormComponents";

export default ({
  formData = undefined,
  preselectedStatus = undefined,
  close,
  submit
}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(formData || {});
  const [initialStatus, _] = useState(
    !preselectedStatus ? data.status : undefined
  );

  const setField = (fieldName, value) => {
    const copiedData = { ...data };
    copiedData[fieldName] = value;
    setData(copiedData);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (preselectedStatus) {
        data.status = preselectedStatus;
      }

        const success = await submit(data, setErrors, initialStatus);
        if (success) close();
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapperDiv>
      {!loading && <CancelButton onClick={close}>Close</CancelButton>}
      <FlexForm onSubmit={onSubmit}>
        <Label htmlFor="title">Title</Label>
        <InputDiv>
          <Input
            placeholder="Fill in task title"
            name="title"
            type="text"
            onChange={e => setField("title", e.target.value)}
            value={data.title}
      disabled={loading}
      maxLength="200"
            required
          ></Input>
          {errors.title && <ErrorDiv>{errors.title.join('. ')}</ErrorDiv>}
        </InputDiv>

        <Label htmlFor="text">Text</Label>
        <InputDiv>
          <TextArea
            placeholder="Fill in task content"
            name="text"
            type="text"
            onChange={e => setField("text", e.target.value)}
            value={data.text}
            disabled={loading}
            required
          />
          {errors.text && <ErrorDiv>{errors.text.join('. ')}</ErrorDiv>}
        </InputDiv>

        {!preselectedStatus && (
          <>
            <Label htmlFor="status">Status</Label>
            <InputDiv>
              <select
                name="status"
                value={data.status || ""}
                onChange={e => {
                  setField("status", parseInt(e.target.value));
                }}
                disabled={loading}
                required
              >
                <option key={`default-val`} value="">
                  No Value Selected
                </option>
                {Object.entries(HumanReadableCardStates).map(status => (
                  <option key={`st-${status[0]}`} value={status[0]}>
                    {status[1]}
                  </option>
                ))}
            </select>
                {errors.status && <ErrorDiv>{errors.status.join('. ')}</ErrorDiv>}

            </InputDiv>
          </>
        )}

        <ButtonDiv>
          <SubmitButton type="submit" disabled={loading}>
            Submit
          </SubmitButton>
          </ButtonDiv>
          {errors.nonFieldErrors && <ErrorDiv>{errors.nonFieldErrors.join('. ')}</ErrorDiv>}

      </FlexForm>
    </WrapperDiv>
  );
};

const WrapperDiv = styled.div`
  width: 500px;
`;
