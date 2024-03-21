import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background: linear-gradient(90deg, #2089D8 .8%, #5AB1F2 97%);
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

.sidebar {
    display: flex;
    overflow-x: auto;
    justify-content: center;
    background-color: #000;
    color: white;
    padding: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
    display: flex;
    margin: 0;
  }

  .sidebar li {
    margin: 0 10px;
  }

  .sidebar a {
    color: white;
    text-decoration: none;
  }

`;



export default StyledHeader;