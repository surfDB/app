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
import { createDroplet, createSpace } from "../../utils/digitalOcean";

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

  const onSubmit = async (ceramicNode: boolean) => {
    setLoading(true);
    const surfEncrypt = new SurfEncrypt();
    const { decryptedData } = await surfEncrypt.decrypt(
      {
        accessToken: token.accessToken,
        accessKey: token.accessKey,
        accessSecret: token.accessSecret,
      },
      token.clientPrivateEncryptionKey,
      "ethereum",
      address || ""
    );
    console.log({ decryptedData });

    if (ceramicNode) {
      const res = await (
        await fetch("/api/space", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: "surf5",
            accessKey: decryptedData[1].accessKey,
            accessSecret: decryptedData[2].accessSecret,
          }),
        })
      ).json();
      console.log({ res });
    }
    let res = await createDroplet(
      name,
      region?.value || "",
      size?.value || "",
      decryptedData[0].accessToken
    );
    console.log({ res });
    res = await (
      await fetch("/api/data?schema=instance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          data: {
            name,
            doId: res.droplet.id,
            region: region?.value || "",
            size: size?.value || "",
            ip: "",
            ceramicNode,
          },
          tags: ["Surf", "Data"],
        }),
      })
    ).json();
    console.log({ res });
    setLoading(false);
    handleClose();
  };

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
            <div className="buttonContainer">
              <Button loading={loading} onClick={() => onSubmit(false)}>
                Surf Instance
              </Button>
              <Button loading={loading} onClick={() => onSubmit(true)}>
                With Ceramic Node
              </Button>
            </div>
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

  .buttonContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 1rem;
    button {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
`;
