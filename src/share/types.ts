export type ServerName =
  | "lobby"
  | "2434 main"
  | "2434 world06"
  | "hololive_01"
  | "hololive_00";

export type Server = {
  name: ServerName;
  address: string;
  queryPort: number;
  bedrock?: boolean;
  disabled?: boolean;
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
  name: ServerName;
  status: Status;
  bedrock: boolean;
};

export type ServerEdition = "java" | "bedrock";
