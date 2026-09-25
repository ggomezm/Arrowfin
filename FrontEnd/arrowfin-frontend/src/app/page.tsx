import SnapshotWidget from "@/components/SnapshotWidget";

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold mb-6">ArrowFin Daily Snapshot</h1>
        <SnapshotWidget />
      </div>
    </main>
  );
}
