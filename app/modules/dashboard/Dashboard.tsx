import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { InstanceItem } from "../../components/instance/InstanceItem";
import Modal from "../../components/modal/Modal";
import CreateInstance from "../createInstance/CreateInstance";
import GetStarted from "../getStarted/GetStarted";
import { ChildVariant, ContainerVariant } from "../home/Home";

type Props = {};

export default function Dashboard({}: Props) {
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false);
  const [createInstanceModalOpen, setCreateInstanceModalOpen] = useState(false);

  const testInstances = [
    {
      name: "my-db-instance",
      url: "http://137.184.32.138:4000",
    },
    {
      name: "surf-test-instance",
      url: "http://117.284.39.118:4000",
    },
    {
      name: "third-instance",
      url: "http://124.84.132.14:4000",
    },
  ];

  return (
    <Container
      variants={ContainerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ButtonContainer variants={ChildVariant}>
        <GetStarted
          handleClose={() => setGetStartedModalOpen(false)}
          isOpen={getStartedModalOpen}
        />
        <CreateInstance
          handleClose={() => setCreateInstanceModalOpen(false)}
          isOpen={createInstanceModalOpen}
        />
        {/* <Button onClick={() => setGetStartedModalOpen(true)}>
          Get Started
        </Button> */}
        <Button onClick={() => setCreateInstanceModalOpen(true)}>
          Create Instance
        </Button>
      </ButtonContainer>
      <motion.div className="label" variants={ChildVariant}>
        <p>My Instances (0)</p>
      </motion.div>
      {testInstances.map((instance) => (
        <motion.div variants={ChildVariant} key={instance.url}>
          <InstanceItem name={instance.name} url={instance.url} />
        </motion.div>
      ))}
    </Container>
  );
}

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;

  .label {
    font-weight: 700;
    margin: 1rem 0;
    text-transform: uppercase;

    p {
      font-size: 1rem;
    }
  }
`;

const ButtonContainer = styled(motion.div)`
  margin-top: 1rem;
`;
