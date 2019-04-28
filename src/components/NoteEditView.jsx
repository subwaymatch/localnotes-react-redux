import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "./Button";

import { updateNote, deleteNote, setCurrentNote } from "../actions";

const StyledNoteEditView = styled.div`
  flex-grow: 1
  max-width: 900px; 
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const NoteTitleInput = styled.input`
  border: none;
  background: transparent;
  font-family: "Roboto", sans-serif;
  display: block;
  width: 100%;
  font-size: 36px;
  line-height: 1.6;
  font-weight: 300;
  color: #097cff;
`;

const DateDisplay = styled.p`
  color: #aaa;
  font-size: 15px;
  line-height: 1.6;
  margin-top: 10px;

  .icon {
    display: inline-block;
    margin-right: 7px;
  }
`;

const DateSeparator = styled.span`
  display: inline-block;
  margin: 0 10px;
`;

const NoteTextInput = styled.textarea`
  display: block;
  width: 100%;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  line-height: 1.7;
  border: none;
  flex-grow: 1;
  overflow: auto;
  margin: 20px 0;
`;

class NoteEditView extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      title: "",
      text: "",
      modifiedAt: 0
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");

    return true;
  }

  static getDerivedStateFromProps(props, state) {
    let returnVal = null;

    if (props.note === null) {
      return null;
    } else if (props.note.id !== state.id) {
      returnVal = Object.assign({}, props.note);
    } else if (
      props.note.title !== state.title ||
      props.note.text !== state.text ||
      props.note.modifiedAt !== state.modifiedAt
    ) {
      returnVal = {
        title: state.title,
        text: state.text,
        modifiedAt: Math.max(props.note.modifiedAt, state.modifiedAt)
      };
    }
    return returnVal;
  }

  handleTitleChange(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value
    });
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSave(e) {
    const currentNote = this.props.note;

    if (
      this.state.title !== currentNote.title ||
      this.state.text !== currentNote.text
    ) {
      this.props.dispatchUpdateNote(
        this.state.id,
        this.state.title,
        this.state.text
      );

      this.forceUpdate();
    }
  }

  handleDeleteNote(e) {
    const { note, dispatchDeleteNote, dispatchSetCurrentNote } = this.props;

    dispatchSetCurrentNote(null);
    dispatchDeleteNote(note.id);
  }

  formatDate(d) {
    return new Date(d).toLocaleString();
  }

  render() {
    const { note } = this.props;

    if (!note) {
      return <div>No note selected</div>;
    }

    return (
      <StyledNoteEditView id="edit-note-wrapper">
        <NoteTitleInput
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}
          placeholder="(Empty Title)"
        />
        <DateDisplay>
          <i className="icon ion-ios-calendar" />
          Created {this.formatDate(note.createdAt)}
          <DateSeparator>&#183;</DateSeparator>
          <i className="icon ion-ios-calendar" /> Last Modified{" "}
          {this.formatDate(note.modifiedAt)}
          <DateSeparator>&#183;</DateSeparator>
          <span onClick={this.handleDeleteNote}>
            <i className="icon ion-md-close" /> Delete
          </span>
        </DateDisplay>

        <NoteTextInput
          value={this.state.text}
          onChange={this.handleTextChange}
          placeholder="(Empty Note)"
        />
        <Button
          iconClassName="ion-md-save"
          text="Save (Ctrl + S)"
          onButtonClick={this.handleSave}
        />
      </StyledNoteEditView>
    );
  }
}

const mapStateToProps = state => ({
  note: state.currentNote
});

const mapDispatchToProps = dispatch => ({
  dispatchUpdateNote: (id, title, text) =>
    dispatch(updateNote(id, title, text)),
  dispatchSetCurrentNote: note => dispatch(setCurrentNote(note)),
  dispatchDeleteNote: id => dispatch(deleteNote(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEditView);
