import * as React from "react";
import type { Errback, Response } from "express";
import * as express from "express";
import { renderToNodeStream } from "react-dom/server";
import { IndexView } from "./index-view";
import { StatusMonitor } from "./status-monitor";
import { Language } from "../share/i18n";

export function createHydrationRoute(monitor: StatusMonitor): express.Router {
  const router = express.Router();
  router.get("/", (req, res, next) => {
    console.log(
      `[${new Date().toISOString()}] ${
        req.connection.remoteAddress
      } ${req.header("referer")}`
    );
    const best = req.acceptsLanguages(["en", "ja"]);
    let language: Language = "en";
    if (best === "ja") {
      language = "jp";
    }
    renderTo(
      <IndexView language={language} statuses={monitor.current} />,
      res,
      next
    );
  });
  return router;
}

function renderTo(component: React.ReactElement, res: Response, next: Errback) {
  res.header("content-type", "text/html;charset=UTF-8");
  res.write("<!doctype html>");
  renderToNodeStream(component).pipe(res).on("error", next);
}
