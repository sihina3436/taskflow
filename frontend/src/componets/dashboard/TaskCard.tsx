import TodoIMG from "../../assets/Todo.jpg";
import {
  useSetTodoIsCompletedMutation,
  useDeleteTodoMutation,
} from "../../redux/todo/todoApi";

interface Props {
  id: string;
  title: string;
  desc: string;
  status: "Completed" | "In Progress" | "Overdue" | "Not Started";
  createdAt: string;
  due_date: string;
  priority: "low" | "medium" | "high";
}

const TaskCard: React.FC<Props> = ({
  id,
  title,
  desc,
  status,
  createdAt,
  due_date,
  priority,
}) => {
  const [complete] = useSetTodoIsCompletedMutation();
  const [remove] = useDeleteTodoMutation();

  const today = new Date();
  const dueDate = new Date(due_date);

  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isUrgent = diffDays <= 2 && diffDays >= 0 && status !== "Completed";
  const isOverdue = diffDays < 0 && status !== "Completed";

  /* BORDER COLOR */
  const alertBorder = isOverdue
    ? "border-red-400"
    : isUrgent
    ? "border-orange-400"
    : "border-gray-100";

  const statusColor = {
    Completed: "bg-green-100 text-green-600",
    "In Progress": "bg-blue-100 text-blue-600",
    Overdue: "bg-red-100 text-red-600",
    "Not Started": "bg-gray-100 text-gray-600",
  };

  const priorityColor = {
    low: "bg-green-100 text-green-600",
    medium: "bg-yellow-100 text-yellow-600",
    high: "bg-red-100 text-red-600",
  };

  let countdownText = "";

  if (status === "Completed") {
    countdownText = "Completed";
  } else if (isOverdue) {
    countdownText = `${Math.abs(diffDays)} day(s) overdue`;
  } else if (diffDays === 0) {
    countdownText = "Due Today";
  } else {
    countdownText = `Due in ${diffDays} day(s)`;
  }

  return (
    <div
      className={`
        group
        bg-white/80 backdrop-blur-lg
        border ${alertBorder}
        rounded-3xl
        p-5
        flex items-start gap-5
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
        mt-1
      `}
    >
      {/* CHECK BUTTON */}
      <button
        onClick={() => complete({ todoId: id, completed: true })}
        className="
          w-9 h-9 rounded-xl
          bg-primary/10 text-primary
          grid place-items-center
          hover:bg-primary hover:text-white
          transition
        "
      >
        <i className="ri-check-line text-lg" />
      </button>

      {/* CONTENT */}
      <div className="flex-1 min-w-0">

        {/* AWESOME POPUP STRIP */}
        {(isUrgent || isOverdue) && (
          <div
            className={`
              mb-4 px-4 py-2 rounded-2xl text-xs font-medium
              flex items-center justify-between
              backdrop-blur-sm border
              ${
                isOverdue
                  ? "bg-red-50/60 border-red-200 text-red-600"
                  : "bg-orange-50/60 border-orange-200 text-orange-600"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <i className="ri-notification-3-line" />
              {isOverdue ? "Task Overdue" : "Deadline Approaching"}
            </div>

            <span className="text-[11px] font-semibold">
              {countdownText}
            </span>
          </div>
        )}

        {/* TITLE */}
        <h4 className="font-semibold text-gray-800 text-[15px] truncate">
          {title}
        </h4>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {desc}
        </p>

        {/* META */}
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[status]}`}
          >
            {status}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColor[priority]}`}
          >
            {priority.toUpperCase()}
          </span>
        </div>

        {/* DUE + CREATED DATE */}
        <div className="mt-4 flex flex-col gap-1 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <i className="ri-calendar-event-line" />
              <span>
                Due:{" "}
                <span className="font-medium text-gray-700">
                  {dueDate.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </span>
            </div>

            <div
              className={`text-xs font-semibold ${
                isOverdue
                  ? "text-red-600"
                  : isUrgent
                  ? "text-orange-500"
                  : "text-gray-500"
              }`}
            >
              {countdownText}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <i className="ri-time-line" />
            Created:{" "}
            {new Date(createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <img
        src={TodoIMG}
        alt=""
        className="w-20 h-20 rounded-2xl object-cover hidden sm:block"
      />

      {/* DELETE */}
      <button
        onClick={() => remove(id)}
        className="
          opacity-0 group-hover:opacity-100
          w-9 h-9 rounded-xl
          bg-red-50 text-red-500
          hover:bg-red-100
          grid place-items-center
          transition
        "
      >
        <i className="ri-delete-bin-line" />
      </button>
    </div>
  );
};

export default TaskCard;
