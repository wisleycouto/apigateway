import styled from 'styled-components';

export const LoaderDiv = styled.div`
  position: fixed;
  margin: 0;
  z-index: 10;

  min-width: 100%;
  min-height: 100vh;
  height: 100vh;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  display: ${props => props.loading ? "fixed" : "none"};
  align-items: center;
  justify-content: center;

  background-color:#EBEBEB;
  opacity: 0.5;
  transition: all 5s ease;
`;
