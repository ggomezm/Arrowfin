import { Position } from "@/types/snapshotTypes";

interface Props {
  position: Position;
}

export default function SnapshotCard({ position }: Props) {
  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold">{position.instrument}</h3>
      <p>Cantidad neta: {position.netQty}</p>
      <p>Precio promedio: {position.avgPrice}</p>
      <p>Precio mercado: {position.marketPrice}</p>
    </div>
  );
}
