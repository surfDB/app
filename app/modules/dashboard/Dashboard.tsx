import { SurfRealtime } from "@surfdb/client-sdk";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";
import { Instance, Token } from "../../..";
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

  const [encrypedToken, setEncrypedToken] = useState<Token>({} as Token);
  const { address } = useAccount();

  const [instances, setInstances] = useState<Instance[] | undefined>([]);

  useEffect(() => {
    const realtime = new SurfRealtime({
      client: "http://localhost:3000",
    });

    realtime.onCreate(async (row: Instance) => {
      console.log({ row });
      const res = await (
        await fetch(`/api/data?schema=instance&accessAddress=${address}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
      ).json();
      console.log({ res });
      setInstances(res);
    });
  }, [address]);

  useEffect(() => {
    (async () => {
      const res = await (
        await fetch(`/api/data?schema=token&accessAddress=${address}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
      ).json();
      console.log({ res });
      res.length > 0 && setEncrypedToken(res[0]);
      //
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const res = await (
        await fetch(`/api/data?schema=instance&accessAddress=${address}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
      ).json();
      console.log({ res });
      setInstances(res);
      //
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          token={encrypedToken}
        />
        {encrypedToken.accessToken ? (
          <Button onClick={() => setCreateInstanceModalOpen(true)}>
            Create Instance
          </Button>
        ) : (
          <Button onClick={() => setGetStartedModalOpen(true)}>
            Get Started
          </Button>
        )}
      </ButtonContainer>
      <motion.div className="label" variants={ChildVariant}>
        <p>My Instances (0)</p>
      </motion.div>
      {instances?.map((instance) => (
        <motion.div variants={ChildVariant} key={instance.ip}>
          <InstanceItem instance={instance} token={encrypedToken} />
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
  width: 30%;
`;
