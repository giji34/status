import { Server, ServerStatus, Status } from "../share/types";

export class StatusMonitor {
  private readonly servers: Server[];
  private readonly interval: number;
  private _current: ServerStatus[];
  private timer?: NodeJS.Timeout;

  constructor(params: { servers: Server[]; interval: number }) {
    const { servers } = params;
    this.servers = servers;
    this._current = servers.map((server) => ({
      server: server.name,
      status: Status.UNKNOWN,
    }));
  }

  start() {
    this.timer = setInterval(this.update, this.interval);
  }

  close() {
    this.timer && clearInterval(this.timer);
  }

  get current(): ServerStatus[] {
    return [...this._current];
  }

  private readonly update = () => {
    //TODO:
  };
}
