import { motion } from "framer-motion";
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";
import { authAtom } from "../../../pages/_app";
import { Connect } from "../../components/connect/Connect";

type Props = {};

export default function Home({}: Props) {
  const [authenticationStatus, setAuthenticationStatus] = useAtom(authAtom);

  return (
    <HeroContainer
      variants={ContainerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1 variants={ChildVariant}>
        Deploy a decentralized database instance within seconds
      </motion.h1>
      <motion.p variants={ChildVariant}>Connect wallet to get started</motion.p>
      <motion.div variants={ChildVariant} className="buttonContainer">
        <Connect />
        <Button type="secondary">Docs</Button>
      </motion.div>
    </HeroContainer>
  );
}

const HeroContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 2rem;

  h1 {
    width: 60%;
    margin-bottom: 2rem;
  }

  .buttonContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 45%;
    margin-top: 2rem;
  }

  Button {
    margin: 0 2rem;
    width: 50%;
  }
`;

export const ContainerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const ChildVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
