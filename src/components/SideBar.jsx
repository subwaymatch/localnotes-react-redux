import React, { Component } from "react";
import styled from "styled-components";

import Button from "./Button";
import NoteList from "./NoteList";

const StyledSidebar = styled.div`
  width: 250px;
  padding: 20px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
`;

class SideBar extends Component {
  render() {
    return (
      <StyledSidebar>
        <Button iconClassName="ion-md-add" text="New Note" />
        <NoteList />
      </StyledSidebar>
    );
  }
}

export default SideBar;
