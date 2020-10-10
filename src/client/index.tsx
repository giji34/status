import * as React from "react";
import { FC } from "react";
import { Main } from "./main";
import { ServerStatus } from "../share/types";

export const kTitle = "にじ鯖・ホロ鯖再現ワールド観光案内";

export const IndexView: FC<{ statuses: ServerStatus[] }> = ({ statuses }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{kTitle}</title>
        <link rel="stylesheet" href={"/style/index.css"} />
      </head>
      <body>
        <Main statuses={statuses} />
        <script src={"/js/index.js"} defer />
      </body>
    </html>
  );
};
