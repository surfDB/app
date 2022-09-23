import { S3, CreateBucketCommand } from "@aws-sdk/client-s3";

export const createSSHKey = async (name: string, digitaloceanToken: string) => {
  return await (
    await fetch("https://api.digitalocean.com/v2/account/keys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${digitaloceanToken}`,
      },
      body: JSON.stringify({
        name,
        public_key:
          "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDGT9aYCDIUDbeoll5XUu6udPFjosuGMiFMU+KcyjbM/SCZHCuTy/sECifZ85uSckCQ79Sp2FxUDO8Ql0rwsgzULGWBox9k6p33fpH2GMuU2sUtj8V4/hGCdiGq/AhsDVAgwcwiStW0+5Lol8JPgPVQfoK520Qd21KENLgXz2fogkKCRWa5U0QKdQAegLvCXqHmSaHkQY/sPWuNN4Cu/cM3Uq5GlPm/1CM3+a3RkCqVcW2dNMEXs+GnZ++5Z35RIAguylQtRnHAJBoa9pnfmmLxxP6Q3M1zu/Fe/fRWUHTeqes8WTWnhyifYRv8na4oOPpUXBHdGOHDdqEI8G6ParyvA4eIYdjsYYPmxNR2FMSHkgPyl9+LXDJDFqFdT5oh8ChFEVAIFqGeLatdEyZ6dOv4uiWmaoQhBHFWRIwbume/wAtd4d59mr4Nn5AVPE4w1qkDutrogwG2xHyvXF8UiPG++3HqLMOn8c/5/9dlo665AErY+z0U1guq/7lkA+2cwhU= root@AnsibleHost",
      }),
    })
  ).json();
};

export const createDroplet = async (
  name: string,
  region: string,
  size: string,
  digitaloceanToken: string
) => {
  console.log({ name, region, size, digitaloceanToken });
  return await (
    await fetch("https://api.digitalocean.com/v2/droplets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${digitaloceanToken}`,
      },
      body: JSON.stringify({
        name,
        region,
        size,
        image: "docker-20-04",
        ssh_keys: ["cb:d3:12:ea:f9:6f:2a:c6:27:f4:69:7e:91:11:2f:4c"],
        backups: false,
        ipv6: true,
        user_data: null,
        private_networking: null,
        volumes: null,
        tags: ["surf"],
      }),
    })
  ).json();
};

export const getDroplet = async (id: number, digitaloceanToken: string) => {
  return await (
    await fetch(`https://api.digitalocean.com/v2/droplets/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${digitaloceanToken}`,
      },
    })
  ).json();
};

export const createSpace = async (
  name: string,
  accessKeyId: string,
  secretAccessKey: string
) => {
  console.log({ name, accessKeyId, secretAccessKey });
  const s3Client = new S3({
    endpoint: "https://sgp1.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const data = await s3Client.send(new CreateBucketCommand({ Bucket: name }));
  console.log("Success", data.Location);
  return data;
};
