import * as React from "react";
import { FC, useContext, useEffect } from "react";
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
import { Language, Translatable } from "../share/i18n";

export const LanguageContext = React.createContext<{
  language: Language;
}>({ language: "en" });

type State = {
  statuses: ServerStatus[];
  edition?: ServerEdition;
  language: Language;
};

export function text(t: Translatable): string {
  const ctx = useContext(LanguageContext);
  return t[ctx.language];
}

export const Main: FC<{ statuses: ServerStatus[]; language: Language }> = ({
  statuses,
  language,
}) => {
  const edition = getEditionFromQuery();
  const [state, setState] = usePatchReducer<State>({
    statuses,
    edition,
    language,
  });
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
    updateLocation(state.edition, language);
  }, [state.edition]);
  const jeServers = state.statuses.filter((s) => !s.bedrock);
  const beServers = state.statuses.filter((s) => s.bedrock);
  const onChangeLanguage = (element) => {
    const value = element.target.value;
    switch (value) {
      case "JP":
        setState({ language: "jp" });
        break;
      case "EN":
        setState({ language: "en" });
        break;
    }
  };
  return (
    <LanguageContext.Provider value={{ language: state.language }}>
      <div className="navbar">
        <div className="navbar-header center">
          <div className="title">{kTitle[state.language]}</div>
          <div className="flex-spacer" />
          <div className="language">
            lang:
            <select onChange={onChangeLanguage}>
              <option>JP</option>
              <option>EN</option>
            </select>
          </div>
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
            title={{
              jp: "Java 版サーバー稼働状況",
              en: "Server Availability (Java Edition)",
            }}
            statuses={jeServers}
          />
        )}
        {state.edition === "bedrock" && beServers.length > 0 && (
          <StatusContainer
            title={{
              jp: "統合版サーバー稼働状況",
              en: "Server Availability (Bedrock Edition)",
            }}
            statuses={beServers}
          />
        )}
      </div>
      <hr style={{ opacity: 0 }} />
    </LanguageContext.Provider>
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

function updateLocation(
  edition: ServerEdition | undefined,
  language: Language
) {
  if (edition) {
    window.history.replaceState(
      undefined,
      kTitle[language],
      `/?edition=${edition}`
    );
  } else {
    window.history.replaceState(undefined, kTitle[language], "/");
  }
}
