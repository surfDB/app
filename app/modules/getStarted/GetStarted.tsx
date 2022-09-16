import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Modal from "../../components/modal/Modal";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function GetStarted({ isOpen, handleClose }: Props) {
  const [token, setToken] = useState("");
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal handleClose={handleClose} title="Get Started">
          <Container>
            <div className="helperText">
              <p>
                You need to provide your digital ocean token to create an
                instance. Click{" "}
                <a
                  href="https://www.digitalocean.com/docs/api/create-personal-access-token/"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>{" "}
                to know how to get your token.
              </p>
            </div>
            <Input
              value={token}
              onChange={(val) => setToken(val)}
              label="Token"
              placeholder="Enter your token"
            />
            <Button>Connect to Digital Ocean</Button>
          </Container>
        </Modal>
      )}
    </AnimatePresence>
  );
}

const Container = styled.div`
  .helperText {
    display: flex;
    flex-direction: row;
    p {
      font-size: 1rem;
      font-weight: 500;
    }
  }

  a {
    color: #00cfc8;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
