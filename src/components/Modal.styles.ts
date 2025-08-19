import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 10px 30px rgba(0,0,0,0.2);
`;
