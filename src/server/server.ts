import type { Request, Response } from "express";
import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import { Settings } from "../share/types";
import { StatusMonitor } from "./status-monitor";

const port = 8090;

const settings: Settings = JSON.parse(
  fs
    .readFileSync(path.join(__dirname, "..", "..", "settings.json"))
    .toString("utf-8")
);
const monitor = new StatusMonitor({
  servers: settings.servers,
  interval: 10000,
});
monitor.start();

const app = express();
app.use(express.static("public"));
app.get("/health_check", (req: Request, res: Response) => {
  res.status(200);
  res.json({ status: "ok" });
});
app.get("/status", (req: Request, res: Response) => {
  res.status(200);
  res.json({ servers: monitor.current });
});

app.listen(port, () => {
  console.log(`started at port ${port}`);
});
