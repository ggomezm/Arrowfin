export interface SnapshotMessage {
  type: "snapshot" | "update" | "error";
  payload: any;
}

export class SnapshotWebSocket {
  private socket: WebSocket | null = null;
  private url: string;
  private token: string;
  private brokerId: string;

  constructor(url: string, token: string, brokerId: string) {
    this.url = url;
    this.token = token;
    this.brokerId = brokerId;
  }

  connect(onMessage: (msg: SnapshotMessage) => void, onError?: (err: any) => void) {
    this.socket = new WebSocket(`${this.url}?broker_id=${this.brokerId}&token=${this.token}`);

    this.socket.onopen = () => console.log("✅ WebSocket conectado");
    this.socket.onmessage = (event) => {
      try {
        const data: SnapshotMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (err) {
        console.error("❌ Error parsing WebSocket message", err);
      }
    };
    this.socket.onerror = (event) => {
      console.error("❌ WebSocket error", event);
      if (onError) onError(event);
    };
    this.socket.onclose = () => {
      console.warn("⚠️ WebSocket cerrado, intentando reconectar...");
      setTimeout(() => this.connect(onMessage, onError), 3000);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

