import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { createNewNoteAndSelect } from "../actions";

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
        <Button
          iconClassName="ion-md-add"
          text="New Note"
          onButtonClick={this.props.dispatchCreateNote}
        />
        <NoteList />
      </StyledSidebar>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  dispatchCreateNote: () => dispatch(createNewNoteAndSelect())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
