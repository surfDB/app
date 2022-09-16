import React from "react";
import styled from "styled-components";

type Props = {};

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;

  .links {
    display: flex;
    flex-direction: row;
  }

  p {
    margin: 0 1rem;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.75rem;
  }
`;

export default function Footer({}: Props) {
  return (
    <FooterContainer>
      <div />
      <div className="links">
        <p>Docs</p>
        <p>Discord</p>
        <p>Twitter</p>
      </div>
    </FooterContainer>
  );
}
