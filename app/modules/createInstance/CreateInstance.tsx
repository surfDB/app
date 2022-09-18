import { SurfEncrypt } from "@surfdb/encrypted-sdk";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";
import { Token } from "../../..";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Modal from "../../components/modal/Modal";
import Select, { Option } from "../../components/select/Select";
import { RegionOptions, SizeOptions } from "../../utils/constants";
import { createDroplet } from "../../utils/digitalOcean";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  token: Token;
};

export default function CreateInstance({ isOpen, handleClose, token }: Props) {
  const [name, setName] = useState("");
  const [size, setSize] = useState<Option | undefined>();
  const [region, setRegion] = useState<Option | undefined>();
  const [loading, setLoading] = useState(false);

  const { address } = useAccount();
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal handleClose={handleClose} title="Create Instance">
          <Container>
            <div className="helperText">
              <p>
                Create a new surfDB instance. Click{" "}
                <a
                  href="https://www.digitalocean.com/docs/api/create-personal-access-token/"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>{" "}
                to know more about what an instance is and how it works
              </p>
            </div>
            <Input
              value={name}
              onChange={(val) => setName(val)}
              label="Name"
              placeholder="my-surf-instance"
            />
            <Select
              value={region}
              onChange={(val) => setRegion(val)}
              label="Region"
              placeholder="Region"
              options={RegionOptions}
            />
            <Select
              value={size}
              onChange={(val) => setSize(val)}
              label="Size"
              placeholder="Small"
              options={SizeOptions}
            />

            <Button
              loading={loading}
              onClick={async () => {
                setLoading(true);
                console.log({ name, size, region });
                const surfEncrypt = new SurfEncrypt();
                const { decryptedData } = await surfEncrypt.decrypt(
                  {
                    accessToken: token.accessToken,
                  },
                  token.clientPrivateEncryptionKey,
                  "ethereum",
                  address || ""
                );
                console.log({ decryptedData });
                const res = await createDroplet(
                  name,
                  region?.value || "",
                  size?.value || "",
                  decryptedData[0].accessToken
                );
                console.log({ res });
                setLoading(false);
              }}
            >
              Create Instance
            </Button>
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
