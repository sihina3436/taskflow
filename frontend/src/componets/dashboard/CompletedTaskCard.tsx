import { useDeleteTodoMutation } from "../../redux/todo/todoApi";

interface Props {
  id: string;
  title: string;
}

const CompletedTaskCard: React.FC<Props> = ({ id, title }) => {
  const [remove] = useDeleteTodoMutation();

  return (
    <div
      className="
        group relative
        bg-white
        rounded-2xl
        px-4 py-3
        flex items-center gap-4
        border border-gray-100
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-0.5
        transition-all duration-300
      "
    >
      {/* LEFT SUCCESS BAR */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-green-500 rounded-l-2xl" />

      {/* CHECK ICON */}
      <div
        className="
          w-8 h-8 rounded-lg
          bg-green-50 text-green-600
          grid place-items-center
          shrink-0
        "
      >
        <i className="ri-check-line text-sm" />
      </div>

      {/* TITLE */}
      <p className="flex-1 text-sm font-medium text-gray-500 line-through truncate">
        {title}
      </p>

      {/* DELETE */}
      <button
        onClick={() => remove(id)}
        className="
          opacity-0 group-hover:opacity-100
          text-gray-400 hover:text-red-500
          text-lg transition
        "
      >
        <i className="ri-close-line" />
      </button>
    </div>
  );
};

export default CompletedTaskCard;
