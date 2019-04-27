import React, { Component } from "react";
import styled from "styled-components";

const Title = styled.h3`
  color: black;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
`;

const Snippet = styled.p`
  color: #ddd;
  font-size: 14px;
  line-height: 1.6;
`;

const StyledNoteListItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover ${Snippet} {
    color: #aaa;
  }
`;

class NoteListItem extends Component {
  getTitle() {
    return this.props.title;
  }

  getSnippet() {
    return this.props.text;
  }

  render() {
    const { title, handleClick } = this.props;
    return (
      <StyledNoteListItem onClick={this.props.handleItemClick}>
        <Title>{this.getTitle()}</Title>
        <Snippet>{this.getSnippet()}</Snippet>
      </StyledNoteListItem>
    );
  }
}

export default NoteListItem;
