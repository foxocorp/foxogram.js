import "websocket-polyfill";
import { DefaultGatewayOptions, GatewayEvents } from "./constants";
import {
  type GatewayClientboundMessage,
  type GatewayDispatchMessage,
  type GatewayHeartbeatMessage,
  type GatewayHelloPayload,
  type GatewayIdentifyMessage,
  GatewayOpcodes,
  type GatewayServerboundMessage,
} from "@foxogram/gateway-types";
import { type GatewayEventsMap, type GatewayOptions } from "./types";
import { MissingTokenError, NotConnectedError } from "./errors";
import EventEmitter from "eventemitter3";

export class Gateway extends EventEmitter<GatewayEventsMap> {
  private token: string | null = null;
  private options: GatewayOptions;
  private connection: WebSocket | null = null;
  private heartbeatInterval: number | null = null;
  private lastHeartbeatAt = -1;

  public constructor(options: Partial<GatewayOptions> = {}) {
    super();
    this.options = { ...DefaultGatewayOptions, ...options } as GatewayOptions;
  }

  public setToken(token: string | null): string | null {
    return (this.token = token);
  }

  public async connect(): Promise<void> {
    const connection = new WebSocket(this.options.baseURL);

    connection.onmessage = (event: MessageEvent<string>) => {
      void this.onMessage(event.data);
    };

    connection.onclose = (event: CloseEvent) => {
      void this.onClose(event.code);
    };

    connection.onopen = () => {
      void this.onOpen();
    };

    this.connection = connection;
  }

  public async destroy(): Promise<void> {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    if (this.connection) {
      this.connection.onmessage = null;
      this.connection.onclose = null;

      this.connection.close();

      this.emit(GatewayEvents.Closed, 1000);
    }
  }

  private async onMessage(data: string): Promise<void> {
    const message: GatewayClientboundMessage = JSON.parse(data);

    switch (message.op) {
      case GatewayOpcodes.Hello: {
        this.emit(GatewayEvents.Hello);

        const payload = message.d as GatewayHelloPayload;

        this.heartbeatInterval = setInterval(
          () => void this.heartbeat(),
          payload.heartbeat_interval,
        );

        break;
      }

      case GatewayOpcodes.Dispatch: {
        this.emit(GatewayEvents.Dispatch, message as GatewayDispatchMessage);

        break;
      }

      case GatewayOpcodes.HeartbeatAck: {
        const ackAt = Date.now();

        this.emit(GatewayEvents.HeartbeatComplete, {
          ackAt,
          heartbeatAt: this.lastHeartbeatAt,
          latency: ackAt - this.lastHeartbeatAt,
        });

        break;
      }
    }
  }

  private async onOpen(): Promise<void> {
    if (!this.token) {
      throw new MissingTokenError();
    }

    const message: GatewayIdentifyMessage = {
      d: {
        token: this.token,
      },
      op: GatewayOpcodes.Identify,
    };

    await this.send(message);
  }

  private async onClose(code: number): Promise<void> {
    this.emit(GatewayEvents.Closed, code);
  }

  public async send<T extends GatewayServerboundMessage>(
    message: T,
  ): Promise<void> {
    if (!this.connection) {
      throw new NotConnectedError();
    }

    const data = JSON.stringify(message);

    return this.connection.send(data);
  }

  private async heartbeat(): Promise<void> {
    await this.send<GatewayHeartbeatMessage>({
      d: null,
      op: GatewayOpcodes.Heartbeat,
    });

    this.lastHeartbeatAt = Date.now();
  }
}
