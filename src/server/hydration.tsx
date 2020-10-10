import * as React from "react";
import type { Errback, Response } from "express";
import * as express from "express";
import { renderToNodeStream } from "react-dom/server";
import { IndexView } from "./index-view";
import { StatusMonitor } from "./status-monitor";

export function createHydrationRoute(monitor: StatusMonitor): express.Route {
  const router = express.Router();
  router.get("/", (req, res, next) => {
    renderTo(<IndexView statuses={monitor.current} />, res, next);
  });
  return router;
}

function renderTo(component: React.ReactElement, res: Response, next: Errback) {
  res.header("content-type", "text/html;charset=UTF-8");
  res.write("<!doctype html>");
  renderToNodeStream(component).pipe(res).on("error", next);
}
