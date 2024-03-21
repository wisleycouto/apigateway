import styled from 'styled-components';

export const InputStyle = styled.div`

  
  
`


export const InputLogin = styled.input`

border: 2px solid #f0f0f0;
display: block;
border-radius: 10px;
font-size: 19px;
width: 100%;
padding: 3px;
outline: none; 

    &.default {

        border-color: #f0f0f0;
    }

    &.danger {

        border-color: #e74c3c;
    }

    &.success {

        border-color: #2ecc71;
    }
`;

export const PasswordButton = styled.button`
    color: #4BABDA;
    position: absolute;
    background: transparent;
    border: none;
    top: 20px; 
    transform: translateY(-50%);
    right: 10px;
`;

export const InputLabel = styled.label`
font-weight: 600;
`;