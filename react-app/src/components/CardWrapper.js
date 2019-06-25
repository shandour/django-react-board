import React, { useState, useContext } from "react";
import axios from "../axios";
import remove from "lodash/remove";
import findIndex from "lodash/findIndex";
import Modal from "react-modal";

import { CardStates } from "../constants";
import CardList from "./CardList";
import ModalForm from "./ModalForm";
import { UserContext } from "../App";
import { BoardContext } from "./BoardContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

export default () => {
  const {
    state: { cards },
    dispatch
  } = useContext(BoardContext);
  const {
    user: { id: userId }
  } = useContext(UserContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(undefined);
  const [preselectedStatus, setPreselectedStatus] = useState(undefined);

  const assignCurrentUser = data => {
    data.assignee = userId;
  };

  const addCard = async (data, setErrors) => {
    try {
      setErrors({});
      assignCurrentUser(data);

      const resp = await axios.post("cards/", data);

      dispatch({
        type: "ADD_CARD",
        payload: {
          status: CardStates[data["status"]],
          card: resp.data
        }
      });
        setPreselectedStatus(undefined);
        return true;
    } catch ({ response }) {
      if (response) {
        setErrors(response.data);
      }
        return false;
    }
  };

  const editCard = async (data, setErrors, prevStatusValue) => {
    try {
      setErrors({});
      assignCurrentUser(data);

      const resp = await axios.patch(`cards/${data.id}/`, data);

      if (prevStatusValue !== data.status) {
        dispatch({
          type: "REMOVE_CARD",
          payload: {
            status: CardStates[prevStatusValue],
            id: data.id
          }
        });

        dispatch({
          type: "ADD_CARD",
          payload: {
            status: CardStates[data["status"]],
            card: resp.data
          }
        });
      } else {
        dispatch({
          type: "EDIT_CARD",
          payload: {
            status: CardStates[data["status"]],
            id: data.id,
            card: resp.data
          }
        });
      }
        return true;
    } catch ({ response }) {
      if (response) {
        setErrors(response.data);
      }
        return false;
    }
  };

  const deleteCard = async (data, setErrors) => {
    try {
      setErrors({});
      const resp = await axios.delete(`cards/${data["id"]}/`);

      dispatch({
        type: "REMOVE_CARD",
        payload: {
          status: CardStates[data.status],
          id: data.id
        }
      });
    } catch ({ response }) {
      if (response) {
        setErrors(response.data);
      }
    }
  };

  const toggleModal = (
    cardData = undefined,
    preselectedStatusValue = undefined
  ) => {
    console.log({ cardData });
    setModalData(undefined);
    setModalOpen(true);
    setPreselectedStatus(undefined);

    if (cardData !== undefined) {
      setModalData({ ...cardData });
    }

    if (preselectedStatusValue !== undefined) {
      setPreselectedStatus(preselectedStatusValue);
    }
  };

  return (
    <>
      <CardList
        toggleModal={toggleModal}
        deleteCard={deleteCard}
        editCard={editCard}
      />
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => {
          setModalOpen(false);
        }}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <ModalForm
          formData={modalData}
          close={() => setModalOpen(false)}
          submit={modalData ? editCard : addCard}
          preselectedStatus={preselectedStatus}
        />
      </Modal>
    </>
  );
};
