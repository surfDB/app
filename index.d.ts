declare module "@lit-protocol/sdk-browser";
declare module "lit-ceramic-sdk";

export interface Token {
  accessAddress: string;
  accessToken: string;
  accessKey: string;
  accessSecret: string;
  clientPrivateEncryptionKey: string;
  createdAt: string;
  id: string;
  schemaName: string;
  streamId: string;
  updatedAt: string;
}

export interface Instance {
  id: string;
  accessAddress: string;
  createdAt: string;
  doId: number;
  ip: string;
  name: string;
  region: string;
  schemaName: string;
  updatedAt: string;
  size: string;
  streamId: string;
  ceramicNode: boolean;
}
