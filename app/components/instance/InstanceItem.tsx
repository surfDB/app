import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
// import MoreIcon from "../../icons/more.svg";

type Props = {
  name: string;
  url: string;
};

export const InstanceItem = ({ name, url }: Props) => {
  return (
    <Container>
      <div className="dbName">{name}</div>
      <div className="dbUrl">{url}</div>
      {/* <MoreIcon /> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 0.75rem;
  padding: 1rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.05rem;
  color: #eefcfb;
  width: 100%;
  margin-bottom: 1rem;
  cursor: pointer;
  border: 1px solid #00cfc8;

  .dbName {
    width: 50%;
  }
  .dbUrl {
    width: 50%;
  }

  &:hover {
    background: #00cfc822;
    color: #eefcfb;
  }

  transition: all 0.2s ease-in-out;
`;
