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
};

export function serverNameDisplayString(name: ServerName): string {
  switch (name) {
    case "2434 main":
      return "にじ鯖再現 (メインワールド)";
    case "2434 world06":
      return "にじ鯖再現 (新規開拓ワールド)";
    case "hololive_00":
      return "旧ホロ鯖 再現";
    case "hololive_01":
      return "ホロ鯖 再現";
    case "lobby":
      return "ロビー";
    default:
      return "(不明)";
  }
}

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
