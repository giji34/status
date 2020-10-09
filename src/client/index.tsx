import * as React from "react";
import { FC } from "react";
import { Main } from "./main";

export const IndexView: FC<{ servers: string[] }> = ({ servers }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>a</title>
        <link rel="stylesheet" href={"/style/index.css"} />
      </head>
      <body>
        <Main servers={servers} />
        <script src={"/js/index.js"} defer />
      </body>
    </html>
  );
};
