import * as React from "react";
import { FC } from "react";
import { LanguageContext } from "../client/main";
import { ServerStatus } from "../share/types";
import { Language } from "../share/i18n";

export const kTitle = "にじ鯖・ホロ鯖再現ワールド観光案内";

export const IndexView: FC<{
  statuses: ServerStatus[];
  language: Language;
}> = ({ statuses, language }) => {
  const data = Buffer.from(
    encodeURIComponent(JSON.stringify({ statuses, language }))
  ).toString("base64");
  return (
    <LanguageContext.Provider value={{ language }}>
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
    </LanguageContext.Provider>
  );
};
