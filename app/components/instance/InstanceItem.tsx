import { SurfEncrypt } from "@surfdb/encrypted-sdk";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";
import { Instance, Token } from "../../..";
import { createCeramic, createSurf } from "../../utils/controller";
import { getDroplet } from "../../utils/digitalOcean";

type Props = {
  instance: Instance;
  token: Token;
};

export const InstanceItem = ({
  instance: { doId, ip, name, ceramicNode, id },
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
      if (token?.accessToken && !ip) {
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
    if (decryptedToken.accessToken.length > 0 && !ip) {
      (async () => {
        // fetch every 5 seconds for 5 minutes
        for (let i = 0; i < 60; i++) {
          const droplet = await getDroplet(doId, decryptedToken.accessToken);
          console.log({ droplet });
          if (droplet.droplet.networks.v4[0]?.ip_address) {
            setDropletStatus("initialzing surf server");
            setDropletIp(droplet.droplet.networks.v4[0].ip_address);
            const res1 = await (
              await fetch(`/api/data?schema=instance&id=${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  data: {
                    ip: droplet.droplet.networks.v4[0].ip_address,
                  },
                  tags: ["Surf", "Data"],
                }),
              })
            ).json();
            console.log({ res1 });
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      })();
    }
  }, [decryptedToken, doId, id, ip]);

  useEffect(() => {
    if (dropletIp) {
      (async () => {
        console.log("creating instance!");
        await new Promise((resolve) => setTimeout(resolve, 15000));
        let res;
        console.log({ ceramicNode });
        if (ceramicNode) {
          res = await createCeramic(
            dropletIp,
            "sgp1",
            "surf5/ipfs/",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropletIp]);

  useEffect(() => {
    (async () => {
      if (ip) {
        const res = await fetch(`http://${ip}:3000/`);
        if (res.ok) {
          setDropletStatus("active");
        } else {
          setDropletIp(ip);
        }
      }
    })();
  }, [ip]);

  return (
    <Container>
      <div className="dbName">{name}</div>
      <div className="dbUrl">{dropletIp || ip}</div>
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
