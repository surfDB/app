import React from "react";
import styled from "styled-components";
import Footer from "../footer/Footer";
import Header from "../header/Header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Container>
      <Header />
      <BodyContainer>{children}</BodyContainer>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  background: #222;
  height: 100vh;
  padding: 0 5rem;
  display: flex;
  flex-direction: column;
`;

const BodyContainer = styled.div`
  flex: 1;
  color: #eefcfb;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.15;
  h1 {
    line-height: 1.15;
    font-size: 3rem;
  }
  p {
    font-size: 1.25rem;
    font-weight: 500;
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 3rem;
    }
    p {
      font-size: 1.25rem;
    }
  }
`;
