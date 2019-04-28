import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import NoteListItem from "./NoteListItem";
import { setCurrentNote } from "../actions";

const StyledNoteList = styled.div`
  margin-top: 10px;
`;

class NoteList extends Component {
  sortNotes() {
    const { notes } = this.props;

    notes.sort((a, b) => b.modifiedAt - a.modifiedAt);
  }

  render() {
    const { currentNote, dispatchNewCurrentNote } = this.props;

    this.sortNotes();

    return (
      <StyledNoteList>
        {this.props.notes.map((note, idx) => {
          return (
            <NoteListItem
              key={idx}
              isActive={currentNote ? note.id === currentNote.id : false}
              title={note.title}
              text={note.text}
              handleItemClick={dispatchNewCurrentNote(note)}
            />
          );
        })}
      </StyledNoteList>
    );
  }
}

const mapStateToProps = state => ({
  currentNote: state.currentNote,
  notes: state.notes
});

const mapDispatchToProps = dispatch => ({
  dispatchNewCurrentNote: note => () => dispatch(setCurrentNote(note))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList);
