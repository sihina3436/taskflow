interface Props {
  percent: number;
  color: string;
  label: string;
}

const StatusRing: React.FC<Props> = ({ percent, color, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-20 h-20 rounded-full grid place-items-center text-sm font-bold"
        style={{
          background: `conic-gradient(${color} ${percent}%, #e5e7eb 0%)`,
        }}
      >
        <div className="w-14 h-14 bg-white rounded-full grid place-items-center">
          {percent}%
        </div>
      </div>
      <span className="text-xs mt-2">{label}</span>
    </div>
  );
};

export default StatusRing;
