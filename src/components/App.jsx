import React, { Component } from "react";
import styled from "styled-components";

import Sidebar from "./SideBar";
import NoteEditView from "./NoteEditView";

const StyledApp = styled.div`
  display: flex;
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <StyledApp>
        <Sidebar />
        <NoteEditView />
      </StyledApp>
    );
  }
}

export default App;
