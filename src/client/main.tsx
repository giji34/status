import * as React from "react";
import { FC, useEffect } from "react";
import { ServerEdition, ServerStatus } from "../share/types";
import {
  CaveatMessage,
  HowToLoginMessage,
  InstructionMessage,
  SelectEditionMessage,
} from "./messages";
import { StatusContainer } from "./status-container";
import { useDidMount, usePatchReducer } from "../share/hooks";
import { kTitle } from "../server/index-view";

type State = {
  statuses: ServerStatus[];
  edition?: ServerEdition;
};

export const Main: FC<{ statuses: ServerStatus[] }> = ({ statuses }) => {
  const edition = getEditionFromQuery();
  const [state, setState] = usePatchReducer<State>({ statuses, edition });
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
  useEffect(() => {
    updateLocation(state.edition);
  }, [state.edition]);
  const jeServers = state.statuses.filter((s) => !s.bedrock);
  const beServers = state.statuses.filter((s) => s.bedrock);
  return (
    <>
      <div className="navbar">
        <div className="navbar-header center">
          <div className="title">{kTitle}</div>
        </div>
      </div>
      <div className="main center">
        <CaveatMessage />
        <SelectEditionMessage
          edition={state.edition}
          onSelect={(edition) => setState({ edition })}
        />
        {state.edition && <HowToLoginMessage edition={state.edition} />}
        {state.edition && <InstructionMessage edition={state.edition} />}
        {state.edition === "java" && jeServers.length > 0 && (
          <StatusContainer
            title={"Java 版サーバー稼働状況"}
            statuses={jeServers}
          />
        )}
        {state.edition === "bedrock" && beServers.length > 0 && (
          <StatusContainer
            title={"統合版サーバー稼働状況"}
            statuses={beServers}
          />
        )}
      </div>
      <hr style={{ opacity: 0 }} />
    </>
  );
};

function getEditionFromQuery(): ServerEdition | undefined {
  const params = new URLSearchParams(window.location.search);
  const edition = params.get("edition");

  if (edition === "java" || edition === "bedrock") {
    return edition;
  } else {
    return undefined;
  }
}

function updateLocation(edition: ServerEdition | undefined) {
  if (edition) {
    window.history.replaceState(undefined, kTitle, `/?edition=${edition}`);
  } else {
    window.history.replaceState(undefined, kTitle, "/");
  }
}
