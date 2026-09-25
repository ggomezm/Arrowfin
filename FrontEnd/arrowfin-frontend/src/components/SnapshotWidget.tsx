"use client";
import { useEffect, useState } from "react";
import { login } from "@/utils/auth";
import { SnapshotWebSocket } from "@/utils/websocket";
import { Snapshot } from "@/types/snapshotTypes";
import SnapshotCard from "./SnapshotCard";
import RiskIndicator from "./RiskIndicator";

export default function SnapshotWidget() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const traderId = "T-123";   // ejemplo
  const brokerId = "B-456";   // ejemplo

  // Login automático
  useEffect(() => {
    async function doLogin() {
      try {
        const jwt = await login(traderId, brokerId);
        setToken(jwt);
      } catch (err: any) {
        setError("Error en login: " + err.message);
      }
    }
    doLogin();
  }, []);

  // Fetch inicial
  useEffect(() => {
    if (!token) return;
    async function fetchSnapshot() {
      try {
        const res = await fetch("http://localhost:3000/snapshot", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al cargar snapshot");
        const data: Snapshot = await res.json();
        setSnapshot(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSnapshot();
  }, [token]);

  // WebSocket
  useEffect(() => {
    if (!token) return;
    const ws = new SnapshotWebSocket("ws://localhost:3000/snapshot", token, brokerId);

    ws.connect((msg) => {
      if (msg.type === "snapshot" || msg.type === "update") {
        setSnapshot(msg.payload);
      }
    });

    return () => ws.disconnect();
  }, [token]);

  if (loading) return <p className="text-gray-400">Cargando snapshot...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!snapshot) return <p className="text-gray-400">Sin datos disponibles</p>;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Daily Snapshot</h2>
      <RiskIndicator risk={snapshot.risk} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {snapshot.positions?.map((pos, idx) => (
          <SnapshotCard key={idx} position={pos} />
        ))}
      </div>
      <div className="mt-4">
        <p>P&L Realizado: {snapshot?.pnl?.realized ?? 0}</p>
        <p>P&L No Realizado: {snapshot?.pnl?.unrealized ?? 0}</p>
      </div>
    </div>
  );
}
