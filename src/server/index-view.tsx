import * as React from "react";
import { FC } from "react";
import { ServerStatus } from "../share/types";

export const kTitle = "にじ鯖・ホロ鯖再現ワールド観光案内";

export const IndexView: FC<{ statuses: ServerStatus[] }> = ({ statuses }) => {
  const data = Buffer.from(
    encodeURIComponent(JSON.stringify(statuses))
  ).toString("base64");
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{kTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={"/style/index.css"} />
        <script id="init" data-json={data}></script>
      </head>
      <body>
        <div id="main" />
        <script src="/js/index.js"></script>
      </body>
    </html>
  );
};
