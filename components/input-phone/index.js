import React from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

const InputPhone = styled(InputMask)`
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

  const maskState = '';

  const cleanMask = (value) => {
    const output = value.replace(/[_()-\s]/g, '');

    return output;
  }

  const maskPhone = cleanMask(props.value).length > 10 ? '(99) 99999-9999' : '(99) 9999-99999';

  return <InputPhone className={props.className} maskPlaceholder="" name={props.name} mask={maskPhone} placeholder="Telefone"  onChange={props.onChange} value={props.value} required/>;

} 

export default Component;