import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Button from "./Button";
import NoSelectedNoteView from "./NoSelectedNoteView";

import { updateNote, deleteNote, setCurrentNote } from "../actions";

const Mousetrap = require("mousetrap");

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
  margin-bottom: 10px;
`;

const InlineMenuItem = styled.span`
  display: inline-block;
  color: #bbb;
  font-size: 15px;
  line-height: 1.6;

  .icon {
    display: inline-block;
    margin-right: 7px;
  }

  &.delete-button {
    color: #ff0955;
    cursor: pointer;
  }
`;

const Separator = styled.span`
  color: #bbb;
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
      modifiedAt: 0,
      hasChangedSinceSave: false
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    let returnVal = null;

    if (props.note === null) {
      return null;
    } else if (props.note.id !== state.id) {
      returnVal = Object.assign({}, props.note, { hasChangedSinceSave: false });
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

  componentDidMount() {
    const _this = this;

    Mousetrap.bind(["ctrl+s", "command+s"], function(e) {
      e.preventDefault();

      _this.handleSave();
    });
  }

  componentWillUnmount() {
    Mousetrap.unbind(["ctrl+s", "command+s"]);
  }

  handleTitleChange(e) {
    const newTitle = e.target.value;
    const { note } = this.props;

    this.setState({
      title: newTitle,
      hasChangedSinceSave: this.hasChangedSinceSave
        ? this.hasChangedSinceSave
        : newTitle !== note.title || this.state.text !== note.text
    });
  }

  handleTextChange(e) {
    const newText = e.target.value;
    const { note } = this.props;

    this.setState({
      text: newText,
      hasChangedSinceSave: this.hasChangedSinceSave
        ? this.hasChangedSinceSave
        : this.state.title !== note.title || newText !== note.text
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

      this.setState({
        hasChangedSinceSave: false
      });

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
      return <NoSelectedNoteView />;
    }

    return (
      <StyledNoteEditView id="edit-note-wrapper">
        <NoteTitleInput
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}
          placeholder="(Empty Title)"
          className="mousetrap"
        />

        <div>
          <InlineMenuItem className="delete-button">
            <span onClick={this.handleDeleteNote}>
              <i className="icon ion-md-close" /> Delete
            </span>
          </InlineMenuItem>

          <Separator>&#183;</Separator>

          <InlineMenuItem>
            <i className="icon ion-ios-calendar" />
            Created {this.formatDate(note.createdAt)}
          </InlineMenuItem>

          <Separator>&#183;</Separator>

          <InlineMenuItem>
            <i className="icon ion-ios-calendar" /> Last Modified{" "}
            {this.formatDate(note.modifiedAt)}
          </InlineMenuItem>
        </div>

        <NoteTextInput
          className="mousetrap"
          value={this.state.text}
          onChange={this.handleTextChange}
          placeholder="(Empty Note)"
        />
        {this.state.hasChangedSinceSave && (
          <Button
            iconClassName="ion-md-save"
            text="Save Changes (Ctrl + S)"
            onButtonClick={this.handleSave}
          />
        )}
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
