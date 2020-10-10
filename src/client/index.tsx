import { render } from "react-dom";
import { Main } from "./main";
import * as React from "react";

document.addEventListener("DOMContentLoaded", () => {
  //TODO: ここで statuses をデコードする.
  const main = document.getElementById("main");
  render(<Main statuses={[]} />, main);
});
