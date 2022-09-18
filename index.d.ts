declare module "@lit-protocol/sdk-browser";
declare module "lit-ceramic-sdk";

export interface Token {
  accessAddress: string;
  accessToken: string;
  clientPrivateEncryptionKey: string;
  createdAt: string;
  id: string;
  schemaName: string;
  streamId: string;
  updatedAt: string;
}
