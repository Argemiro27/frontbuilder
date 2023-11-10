import styled from "styled-components";

const StyledBtn = styled.a`
  display: inline-block;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: 6px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-decoration: none;
  outline: none;
  background-color: #1976d2;
  color: #fff;
  box-shadow: 0 2px 4px 0 rgba(25, 118, 210, 0.5);
  white-space: nowrap;
  width: 200px;
  &:hover {
    background-color: #1565c0;
  }

  &:active {
    background-color: #0d47a1;
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #a1a1a1;
    cursor: not-allowed;
  }
`;

export default StyledBtn;
