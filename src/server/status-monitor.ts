import { Server, ServerStatus, Status } from "../share/types";
import * as Query from "mcquery";
import mcpeping = require("mcpe-ping");

export class StatusMonitor {
  private readonly servers: Server[];
  private readonly interval: number;
  private _current: ServerStatus[];
  private timer?: NodeJS.Timeout;

  constructor(params: { servers: Server[]; interval: number }) {
    const { servers, interval } = params;
    this.servers = servers;
    this._current = servers.map((server) => ({
      server: server.name,
      status: Status.UNKNOWN,
      bedrock: server.bedrock === true,
    }));
    this.interval = interval;
  }

  start() {
    this.update();
    this.timer = setInterval(this.update, this.interval);
  }

  close() {
    this.timer && clearInterval(this.timer);
  }

  get current(): ServerStatus[] {
    return [...this._current];
  }

  private updateStatus(name: string, bedrock: boolean, status: Status) {
    const idx = this._current.findIndex(
      (v) => v.server === name && v.bedrock === bedrock
    );
    if (idx < 0) {
      return;
    }
    this._current[idx].status = status;
  }

  private readonly update = () => {
    for (const server of this.servers) {
      const { address, queryPort, name, bedrock } = server;
      if (bedrock) {
        try {
          mcpeping(address, queryPort, (err, res) => {
            if (err) {
              this.updateStatus(name, bedrock, Status.DOWN);
            } else {
              this.updateStatus(name, bedrock, Status.UP);
            }
          });
        } catch (e) {
          console.error(e);
          this.updateStatus(name, bedrock, Status.DOWN);
        }
      } else {
        const query = new Query(address, queryPort, { timeout: 3000 });
        const onSuccess = () => {
          this.updateStatus(name, !!bedrock, Status.UP);
          query.close();
        };
        const onError = () => {
          this.updateStatus(name, !!bedrock, Status.DOWN);
          query.close();
        };
        query
          .connect()
          .then(() => {
            query.basic_stat((err, stat: BasicStat) => {
              if (err) {
                onError();
              } else {
                onSuccess();
              }
            });
          })
          .catch(onError);
      }
    }
  };
}

type BasicStat = {
  type: number;
  sessionId: number;
  MOTD: string;
  gametype: string;
  map: string;
  numplayers: number;
  maxplayers: number;
  hostport: number;
  hostip: string;
  from: { address: string; port: number };
};
