export type Server = {
  name: string;
  address: string;
  queryPort: number;
  bedrock?: boolean;
};

export type Settings = {
  servers: Server[];
};

export enum Status {
  UNKNOWN,
  UP,
  DOWN,
}

export type ServerStatus = {
  server: string;
  status: Status;
  bedrock: boolean;
};

export type ServerEdition = "java" | "bedrock";
