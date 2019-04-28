import React, { Component } from "react";
import styled from "styled-components";

const Title = styled.h3`
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;

  color: ${props => (props.isActive ? "#097cff" : "#444")};
`;

const Snippet = styled.p`
  font-size: 14px;
  line-height: 1.6;

  color: ${props => (props.isActive ? "#aaa" : "#ddd")};
`;

const StyledNoteListItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover ${Snippet} {
    color: ${props => (props.isActive ? "#777" : "#aaa")};
  }
`;

class NoteListItem extends Component {
  getTitle() {
    const { title } = this.props;

    return title === ""
      ? "(Empty Title)"
      : title.length <= 30
      ? title
      : title.substring(0, 28) + "..";
  }

  getSnippet() {
    const { text } = this.props;

    return text === ""
      ? "(Empty Note)"
      : text.length <= 60
      ? text
      : text.substring(0, 58) + "..";
  }

  render() {
    const { isActive, handleItemClick } = this.props;
    return (
      <StyledNoteListItem isActive={isActive} onClick={handleItemClick}>
        <Title isActive={isActive}>{this.getTitle()}</Title>
        <Snippet isActive={isActive}>{this.getSnippet()}</Snippet>
      </StyledNoteListItem>
    );
  }
}

export default NoteListItem;
