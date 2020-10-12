import * as React from "react";
import { FC } from "react";
import { ServerStatus, Status } from "../share/types";
import classNames from "classnames";

export const StatusContainer: FC<{
  title: string;
  statuses: ServerStatus[];
}> = ({ title, statuses }) => {
  return (
    <>
      <h2>{title}</h2>
      <div className="status-container">
        {statuses.map(({ server, status }, i) => (
          <StatusItem server={server} status={status} key={i} />
        ))}
      </div>
    </>
  );
};

const StatusItem: FC<{ server: string; status: Status }> = ({
  server,
  status,
}) => {
  return (
    <div className="item">
      <div className="server">{server}</div>
      <div className={classNames("status", statusClassName(status))}>
        {statusDisplayString(status)}
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

function statusDisplayString(status: Status): string {
  switch (status) {
    case Status.DOWN:
      return "利用不可";
    case Status.UNKNOWN:
      return "不明";
    case Status.UP:
      return "稼働中";
  }
}
