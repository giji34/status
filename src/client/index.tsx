import { render } from "react-dom";
import { Main } from "./main";
import * as React from "react";
import { ServerStatus } from "../share/types";

document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main");
  const init = document.getElementById("init");
  const data = init!.getAttribute("data-json")!;
  const statuses: ServerStatus[] = JSON.parse(decodeURIComponent(atob(data)));
  render(<Main statuses={statuses} />, main);
});
