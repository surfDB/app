export const createSurf = async (ip: string) => {
  return await fetch("http://137.184.32.138:3000/createSurf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ip,
    }),
  });
};

export const createCeramic = async (
  ip: string,
  region: string,
  bucket: string,
  accessKeyId: string,
  secretAccessKey: string,
  endpoint: string
) => {
  return await fetch("http://137.184.32.138:3000/createCeramic", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ip,
      region,
      bucket,
      accessKeyId,
      secretAccessKey,
      endpoint,
    }),
  });
};
