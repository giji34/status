import * as React from "react";
import type { Errback, Response } from "express";
import * as express from "express";
import { renderToNodeStream } from "react-dom/server";
import { IndexView } from "../client";
import { Settings } from "../share/types";

export function createHydrationRoute(settings: Settings): express.Route {
  const router = express.Router();
  router.get("/", (req, res, next) => {
    renderTo(
      <IndexView servers={settings.servers.map((s) => s.name)} />,
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
