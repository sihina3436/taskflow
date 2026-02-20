import { useGetTodoStatusPercentageQuery } from "../../redux/todo/todoApi";

const ProgressBar = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-500">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${value}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

const StatusCard = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useGetTodoStatusPercentageQuery(userId);

  if (isLoading) return null;
  if (!data) return null;

  return (
    <div
      className="
        bg-white/90 backdrop-blur
        border border-gray-100
        rounded-3xl
        shadow-sm
        p-6
        hover:shadow-lg
        transition
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-5">
        <i className="ri-pie-chart-line text-primary text-lg" />
        <h3 className="font-semibold text-gray-800 text-sm">
          Task Progress
        </h3>
      </div>

      {/* PROGRESS */}
      <div className="space-y-4">

        <ProgressBar
          label="Completed"
          value={data.percentage}
          color="#22c55e"
        />

        <ProgressBar
          label="In Progress"
          value={data.inProgressPercentage}
          color="#3b82f6"
        />

        <ProgressBar
          label="Not Started"
          value={data.notStartedPercentage}
          color="#9ca3af"
        />

        <ProgressBar
          label="Overdue"
          value={data.overduePercentage}
          color="#ef4444"
        />

      </div>
    </div>
  );
};

export default StatusCard;
