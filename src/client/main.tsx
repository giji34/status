import * as React from "react";
import { FC } from "react";
import { ServerStatus, Status } from "../share/types";
import { CaveatMessage } from "./caveat-message";
import { StatusContainer } from "./status-container";
import { useDidMount, usePatchReducer } from "../share/hooks";

type State = {
  statuses: ServerStatus[];
};

export const Main: FC<{ servers: string[] }> = ({ servers }) => {
  const [state, setState] = usePatchReducer<State>({
    statuses: servers.map((s) => ({ server: s, status: Status.UNKNOWN })),
  });
  const fetchStatus = () => {
    //TODO:
  };
  useDidMount(() => {
    const id = window.setInterval(fetchStatus, 10000);
    return () => {
      window.clearInterval(id);
    };
  });
  return (
    <>
      <div className="navbar" />
      <div className="main center">
        <CaveatMessage />
        <StatusContainer statuses={state.statuses} />
      </div>
    </>
  );
};
