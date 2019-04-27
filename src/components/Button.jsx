import React, { Component } from "react";
import styled from "styled-components";

const FullWidthButton = styled.div`
  display: block;
  width: 100%;
  box-sizing: border-box;
  border-radius: 100px;
  padding: 20px 30px;
  color: #097cff;
  background-color: #eef6ff;
  border: 1px solid #dfeeff;
  cursor: pointer;
  text-align: center;

  i.icon {
    display: inline-block;
    margin-right: 10px;
  }

  &:hover {
    background-color: #dfeeff;
  }
`;

class Button extends Component {
  render() {
    const { text, iconClassName, onButtonClick } = this.props;

    const iconHtml = iconClassName ? (
      <i className={"icon " + iconClassName} />
    ) : null;
    return (
      <FullWidthButton onClick={onButtonClick}>
        {iconHtml}
        <span>{text}</span>
      </FullWidthButton>
    );
  }
}

export default Button;
