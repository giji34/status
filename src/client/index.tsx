import { render } from "react-dom";
import { Main } from "./main";
import * as React from "react";
import { ServerStatus } from "../share/types";
import { Language } from "../share/i18n";

document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main");
  const init = document.getElementById("init");
  const data = init!.getAttribute("data-json")!;
  const json: { statuses: ServerStatus[]; language: Language } = JSON.parse(
    decodeURIComponent(atob(data))
  );
  render(<Main statuses={json.statuses} language={json.language} />, main);
});
