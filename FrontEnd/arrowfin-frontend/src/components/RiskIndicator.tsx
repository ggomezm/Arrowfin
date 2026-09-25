interface Props {
  risk: number;
}

export default function RiskIndicator({ risk }: Props) {
  const riskColor =
    risk > 75 ? "bg-red-600" : risk > 50 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="flex items-center space-x-2">
      <span className={`w-4 h-4 rounded-full ${riskColor}`}></span>
      <p className="font-bold">Risk: {risk}%</p>
    </div>
  );
}

