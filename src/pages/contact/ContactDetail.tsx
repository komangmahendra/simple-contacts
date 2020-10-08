import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components/macro";

// assets
import CloseIcon from "../../assets/icons/close.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import CheckIcon from "../../assets/icons/check.svg";

// utils
import createInitial from "./utils/createInitial";

// types
import { ContactDetailProps } from "./type";

// components
import InputText from "./components/InputText";

const ContactDetail = (props: ContactDetailProps) => {
  const {
    contact,
    mode,
    isLoadingDetail,
    setMode,
    handleSave,
    handleSelectContact,
    handleDeleteContact,
  } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number | string | null>(null);
  const [photo, setPhoto] = useState("");
  const [validation, setValidaton] = useState({
    firstName: true,
    lastName: true,
    age: true,
    photo: true,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const closeDetails = () => {
    resetValidation();
    handleSelectContact(null);
  };

  const checkValidation = () => {
    let isPass = true;

    const tempValidation = {
      firstName: true,
      lastName: true,
      age: true,
      photo: true,
    };

    if (!firstName) {
      tempValidation.firstName = false;
      isPass = false;
    }

    if (!lastName) {
      tempValidation.lastName = false;
      isPass = false;
    }

    if (!age) {
      tempValidation.age = false;
      isPass = false;
    }

    if (!photo) {
      tempValidation.photo = false;
      isPass = false;
    }

    setValidaton(tempValidation);

    if (!isPass) {
      setErrorMessage("Please input valid data");
    }

    return isPass;
  };

  const resetValidation = () => {
    setErrorMessage("");
    setValidaton({
      firstName: true,
      lastName: true,
      age: true,
      photo: true,
    });
  };

  const onClickSave = () => {
    resetValidation();
    const isPass = checkValidation();

    if (!isPass) {
      return;
    }

    handleSave({ firstName, lastName, age, photo }, mode, contact?.id);
  };

  const onClickDelete = () => {
    if (contact?.id) {
      handleDeleteContact(contact?.id!);
    }
  };

  const handleImageError = (ev: any) => {
    const fallbackImage =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQlomRxuD2hXxPAPem4LggnMmje2M5z_ZNvRg&usqp=CAU";

    ev.target.src = fallbackImage;
  };

  const renderImage = useMemo(() => {
    if (!contact?.photo || contact?.photo === "N/A") {
      const initial = createInitial(contact?.firstName, contact?.lastName);
      return <div className="image-dummy">{initial}</div>;
    } else {
      return (
        <img
          src={photo}
          className="image-profile"
          alt="Profile"
          onError={handleImageError}
        ></img>
      );
    }
  }, [contact, photo]);

  useEffect(() => {
    if (contact) {
      setFirstName(contact?.firstName);
      setLastName(contact?.lastName);
      setAge(contact?.age);
      setPhoto(contact?.photo);
    }

    if (mode === "add") {
      setFirstName("");
      setLastName("");
      setAge("");
      setPhoto("");
    }
  }, [mode, contact]);

  if (isLoadingDetail) {
    return (
      <InfoBox>
        <span className="title">Loading...</span>
        <span className="subtitle">
          Please wait, we processing your request
        </span>
      </InfoBox>
    );
  }

  return (
    <Container>
      {!contact && !mode ? (
        <InfoBox>
          <span className="title">Select Contact</span>
          <span className="subtitle">Select a contact to see the details</span>
        </InfoBox>
      ) : (
        <>
          <Header>
            <div className="left-menu">
              <img src={CloseIcon} alt="Close" onClick={() => closeDetails()} />
            </div>
            <div className="right-menu">
              {!mode ? (
                <>
                  <img
                    src={EditIcon}
                    alt="Edit"
                    onClick={() => setMode("edit")}
                  />
                  <img
                    src={DeleteIcon}
                    alt="Delete"
                    onClick={() => onClickDelete()}
                  />
                </>
              ) : (
                <img
                  src={CheckIcon}
                  alt="Check"
                  onClick={() => onClickSave()}
                />
              )}
            </div>
          </Header>
          <Body>
            {!mode ? (
              <div className="image-container">
                {renderImage}

                {photo && mode === "edit" ? (
                  <div className="image-action-button">
                    <img
                      src={DeleteIcon}
                      alt="Delete Icon"
                      height="18"
                      onClick={() => setPhoto("")}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className="detail">
              {mode ? (
                <div className="action-title">{`${
                  mode === "add" ? "Add" : "Edit"
                } Contact`}</div>
              ) : null}
              <div className="row">
                <div className="label">First Name : </div>
                {!mode ? (
                  <span className="content">{firstName}</span>
                ) : (
                  <InputText
                    onChange={(text) => setFirstName(text)}
                    value={firstName}
                    isError={!validation.firstName}
                  />
                )}
              </div>

              <div className="row">
                <span className="label">Last Name : </span>
                {!mode ? (
                  <span className="content">{lastName}</span>
                ) : (
                  <InputText
                    onChange={(text) => setLastName(text)}
                    value={lastName}
                    isError={!validation.lastName}
                  />
                )}
              </div>

              <div className="row">
                <span className="label">Age : </span>
                {!mode ? (
                  <span className="content">{age}</span>
                ) : (
                  <InputText
                    onChange={(text) => setAge(text)}
                    value={age}
                    isError={!validation.age}
                  />
                )}
              </div>

              <div className="row">
                <span className="label">Photo : </span>
                {!mode ? (
                  <div className="content">{photo}</div>
                ) : (
                  <InputText
                    onChange={(text) => setPhoto(text)}
                    value={photo}
                    isError={!validation.photo}
                  />
                )}
              </div>

              {errorMessage ? (
                <div className="error-message"> {errorMessage}</div>
              ) : null}
            </div>
          </Body>
        </>
      )}
    </Container>
  );
};

const InfoBox = styled.div`
  background: #1f2124;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  color: #fff;

  > .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  }

  > .subtitle {
    margin-top: 10px;
    font-size: 12px;
  }
`;

const Container = styled.div`
  background: #1f2124;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  background: #292c31;
  padding: 20px;

  img {
    cursor: pointer;
  }

  > .right-menu {
    display: flex;
    align-items: center;

    > img :last-child {
      margin-left: 10px;
    }
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  height: 100%;
  width: 100%;

  .error-message {
    margin-top: 20px;
    font-size: 12px;
    color: #ff2f29;
    text-align: center;
  }

  .action-title {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 30px;
  }

  > .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    margin-bottom: 50px;

    > .image-profile {
      width: 130px;
      height: 130px;
      border-radius: 65px;
      background: #292c31;
      object-fit: cover;
    }
  }

  .image-action-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    right: 35%;
    background: #111113;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
  }

  .image-dummy {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    border-radius: 65px;
    background: #292c31;
    object-fit: cover;
    color: #fff;
    font-size: 32px;
  }

  > .detail {
    color: #fff;
    padding: 0px 30px 20px 30px;
    font-size: 12px;

    > .row {
      display: flex;
      align-items: center;
      letter-spacing: 1px;

      > .label {
        min-width: 110px;
        font-weight: bold;
      }

      > .content {
        max-width: 220px;
        word-wrap: break-word;
      }
    }

    > .row:not(:first-child) {
      margin-top: 10px;
    }
  }
`;

export default ContactDetail;
