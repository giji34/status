import * as React from "react";
import { FC } from "react";
import { Main } from "./main";
import { ServerStatus } from "../share/types";

export const IndexView: FC<{ statuses: ServerStatus[] }> = ({ statuses }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>a</title>
        <link rel="stylesheet" href={"/style/index.css"} />
      </head>
      <body>
        <Main statuses={statuses} />
        <script src={"/js/index.js"} defer />
      </body>
    </html>
  );
};
