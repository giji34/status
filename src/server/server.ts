import * as express from "express";
import { createHydrationRoute } from "./hydration";
import * as fs from "fs";
import * as path from "path";
import { Settings } from "../share/types";

const port = 8090;

const settings: Settings = JSON.parse(
  fs
    .readFileSync(path.join(__dirname, "..", "..", "settings.json"))
    .toString("utf-8")
);

const app = express();
app.use(express.static("public"));
app.get("/health_check", (req: Request, res: Response) => {
  res.status(200);
  res.json({ status: "ok" });
});
app.use(createHydrationRoute(settings));

app.listen(port, () => {
  console.log(`started at port ${port}`);
});
