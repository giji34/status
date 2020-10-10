import * as React from "react";
import { FC } from "react";
import { ServerStatus } from "../share/types";
import {
  CaveatMessage,
  HowToLoginMessage,
  InstructionMessage,
} from "./messages";
import { StatusContainer } from "./status-container";
import { useDidMount, usePatchReducer } from "../share/hooks";
import { kTitle } from "../server/index-view";

type State = {
  statuses: ServerStatus[];
};

export const Main: FC<{ statuses: ServerStatus[] }> = ({ statuses }) => {
  const [state, setState] = usePatchReducer<State>({ statuses });
  const fetchStatus = async () => {
    const res = await fetch("/status", { method: "GET" });
    const json: { servers: ServerStatus[] } = await res.json();
    setState({ statuses: json.servers });
  };
  useDidMount(() => {
    const msecPerMinutes = 60 * 1000;
    const id = window.setInterval(fetchStatus, 5 * msecPerMinutes);
    return () => {
      window.clearInterval(id);
    };
  });
  return (
    <>
      <div className="navbar">
        <div className="navbar-header center">
          <div className="title">{kTitle}</div>
        </div>
      </div>
      <div className="main center">
        <CaveatMessage />
        <HowToLoginMessage />
        <InstructionMessage />
        <StatusContainer statuses={state.statuses} />
      </div>
    </>
  );
};
