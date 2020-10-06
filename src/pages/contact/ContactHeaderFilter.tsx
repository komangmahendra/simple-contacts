import React from "react";
import styled from "styled-components/macro";

// assets
import SearchIcon from "../../assets/icons/search.svg";

// types
import { ContactHeaderFilterProps } from "./type";

const ContactHeaderFilter = (props: ContactHeaderFilterProps) => {
  const { filter, setFilter } = props;

  return (
    <Container>
      <img src={SearchIcon} alt="Search" />
      <input
        onChange={(v) => setFilter(v.target.value)}
        value={filter}
        className="filter-search"
        placeholder={"search contact"}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: calc(100% - 20px);
  height: 20px;
  border-radius: 5px;
  padding: 10px;
  background-color: #2c2f33;
  align-items: center;

  > .filter-search {
    background: transparent;
    border: none;
    margin-left: 10px;
    width: 100%;
  }

  .filter-search:focus {
    outline: none;
    caret-color: #fff;
    color: #fff;
  }
`;

export default ContactHeaderFilter;
