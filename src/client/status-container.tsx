import * as React from "react";
import { FC } from "react";
import { ServerName, ServerStatus, Status } from "../share/types";
import classNames from "classnames";
import { text } from "./main";
import { Translatable } from "../share/i18n";

export const StatusContainer: FC<{
  title: Translatable;
  statuses: ServerStatus[];
}> = ({ title, statuses }) => {
  return (
    <>
      <h2>{text(title)}</h2>
      <div className="status-container">
        {statuses.map(({ name, status }, i) => (
          <StatusItem server={name} status={status} key={i} />
        ))}
      </div>
    </>
  );
};

const StatusItem: FC<{ server: ServerName; status: Status }> = ({
  server,
  status,
}) => {
  return (
    <div className="item">
      <div className="server">{text(serverNameDisplayString(server))}</div>
      <div className={classNames("status", statusClassName(status))}>
        {text(statusDisplayString(status))}
      </div>
    </div>
  );
};

function statusClassName(status: Status): string {
  switch (status) {
    case Status.DOWN:
      return "down";
    case Status.UNKNOWN:
      return "unknown";
    case Status.UP:
      return "up";
  }
}

function statusDisplayString(status: Status): Translatable {
  switch (status) {
    case Status.DOWN:
      return { jp: "利用不可", en: "DOWN" };
    case Status.UNKNOWN:
      return { jp: "不明", en: "UNKNOWN" };
    case Status.UP:
      return { jp: "稼働中", en: "UP" };
  }
}

export function serverNameDisplayString(name: ServerName): Translatable {
  switch (name) {
    case "2434 main":
      return {
        jp: "にじ鯖 再現 (メインワールド)",
        en: "replica of Niji-server (main world)",
      };
    case "2434 world06":
      return {
        jp: "にじ鯖 再現 (新規開拓ワールド)",
        en: "replica of Niji-server (second world)",
      };
    case "hololive_00":
      return { jp: "旧ホロ鯖 再現", en: "replica of old Holo-server" };
    case "hololive_01":
      return { jp: "ホロ鯖 再現", en: "replica of Holo-server" };
    case "lobby":
      return { jp: "ロビー", en: "lobby" };
    default:
      return { jp: "(不明)", en: "(Unknown)" };
  }
}
