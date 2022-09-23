import { SurfEncrypt } from "@surfdb/encrypted-sdk";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";
import { Instance, Token } from "../../..";
import { createCeramic, createSurf } from "../../utils/controller";
import { getDroplet } from "../../utils/digitalOcean";
// import MoreIcon from "../../icons/more.svg";

type Props = {
  instance: Instance;
  token: Token;
};

export const InstanceItem = ({
  instance: { doId, ip, name, ceramicNode },
  token,
}: Props) => {
  const { address } = useAccount();

  const [dropletStatus, setDropletStatus] = useState("creating droplet");

  const [decryptedToken, setDecryptedToken] = useState({
    accessToken: "",
    accessKey: "",
    accessSecret: "",
  });

  const [dropletIp, setDropletIp] = useState("");

  useEffect(() => {
    (async () => {
      if (token?.accessToken) {
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
        setDecryptedToken({
          accessToken: decryptedData[0].accessToken,
          accessKey: decryptedData[1].accessKey,
          accessSecret: decryptedData[2].accessSecret,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (decryptedToken.accessToken.length > 0) {
      (async () => {
        // fetch every 5 seconds for 5 minutes
        for (let i = 0; i < 60; i++) {
          const droplet = await getDroplet(doId, decryptedToken.accessToken);
          console.log({ droplet });
          if (droplet.droplet.networks.v4[0]?.ip_address) {
            setDropletStatus("initialzing surf server");
            setDropletIp(droplet.droplet.networks.v4[0].ip_address);
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      })();
    }
  }, [decryptedToken, doId]);

  useEffect(() => {
    if (dropletIp) {
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 15000));
        let res;
        console.log({ ceramicNode });
        if (ceramicNode) {
          res = await createCeramic(
            dropletIp,
            "sgp1",
            "surf4/ipfs/",
            decryptedToken.accessKey,
            decryptedToken.accessSecret,
            "sgp1.digitaloceanspaces.com"
          );
        } else {
          res = await createSurf(dropletIp);
        }
        if (res.ok) {
          setDropletStatus("active");
          // setDropletIp(`http://${dropletIp}:3000`);
        } else {
          setDropletStatus("error");
        }
      })();
    }
  }, [dropletIp]);

  return (
    <Container>
      <div className="dbName">{name}</div>
      <div className="dbUrl">{dropletIp}</div>
      <div className="dbUrl">{dropletStatus}</div>
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
