import React, { Component } from "react";
import styled from "styled-components";

const NoNoteView = styled.div`
  color: #097cff;
  font-size: 30px;
  line-height: 1.6;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 900px;
  box-sizing: border-box;
  flex-grow: 1;
`;

class NoSelectedNoteView extends Component {
  render() {
    return (
      <NoNoteView>
        <p>Please select a note</p>
      </NoNoteView>
    );
  }
}

export default NoSelectedNoteView;
