import React from 'react';
import styled from 'styled-components';

const InputText = styled.input`
  padding:10px 20px;
  border-radius:10px;
  border:solid 1px #ccc;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
  sans-serif;           
  font-size:1.1rem;
  width:100%;
  margin-bottom:10px;

  &:focus {
    outline: none;
  }

  &.valid {
    border-color:green;
  }

  &.invalid {
    border-color:red;
  }
`;

function Component(props) {
  return <InputText type="text" className={props.className} name={props.name}  placeholder={props.placeholder}  onChange={props.onChange} value={props.value} />;
} 

export default Component;