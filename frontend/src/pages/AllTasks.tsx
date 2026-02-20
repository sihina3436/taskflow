import Layout from "../componets/Layout";
import TaskCard from "../componets/dashboard/TaskCard";
import { useSelector } from "react-redux";
import { useGetTodoByUserQuery } from "../redux/todo/todoApi";
import { useNavigate, useLocation } from "react-router-dom";

const AllTasks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: any) => state.auth);

  const { data: todos = [], isLoading } =
    useGetTodoByUserQuery(user?.id, {
      skip: !user?.id,
    });

  /* ================= GET QUERY PARAMS ================= */
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search")?.toLowerCase() || "";
  const dateQuery = params.get("date");

  /* ================= FILTER TODOS ================= */
  const filteredTodos = todos.filter((todo: any) => {
    const matchesSearch = searchQuery
      ? todo.title.toLowerCase().includes(searchQuery)
      : true;

    const matchesDate = dateQuery
      ? new Date(todo.due_date).toISOString().split("T")[0] === dateQuery
      : true;

    return matchesSearch && matchesDate;
  });

  /* ================= SORT BY NEAREST DUE DATE ================= */
  const sortedTodos = [...filteredTodos].sort(
    (a: any, b: any) =>
      new Date(a.due_date).getTime() -
      new Date(b.due_date).getTime()
  );

  /* ================= STATS ================= */
  const total = sortedTodos.length;
  const completed = sortedTodos.filter((t: any) => t.completed).length;
  const pending = total - completed;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              All Tasks
            </h2>
            <p className="text-gray-500 text-sm">
              Manage all your tasks in one place
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition"
          >
            <i className="ri-arrow-left-line"></i>
            Back
          </button>
        </div>

        {/* ACTIVE FILTER INFO */}
        {(searchQuery || dateQuery) && (
          <div className="mb-6 flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm">
            <div className="flex gap-4">
              {searchQuery && (
                <span>
                  🔎 Search: <strong>{searchQuery}</strong>
                </span>
              )}
              {dateQuery && (
                <span>
                  📅 Date: <strong>{dateQuery}</strong>
                </span>
              )}
            </div>

            <button
              onClick={() => navigate("/my-task")}
              className="text-primary hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-gray-500 text-sm">Total Tasks</h4>
            <p className="text-2xl font-bold text-gray-800">{total}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-gray-500 text-sm">Pending</h4>
            <p className="text-2xl font-bold text-orange-500">
              {pending}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-gray-500 text-sm">Completed</h4>
            <p className="text-2xl font-bold text-green-500">
              {completed}
            </p>
          </div>

        </div>

        {/* TASK LIST */}
        <div className="space-y-6">
          {isLoading && <p>Loading tasks...</p>}

          {!isLoading && sortedTodos.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-500 shadow-sm">
              No tasks found.
            </div>
          )}

          {sortedTodos.map((todo: any) => (
            <TaskCard
              key={todo._id}
              id={todo._id}
              title={todo.title}
              desc={todo.description || ""}
              status={todo.status}
              createdAt={todo.createdAt}
              due_date={todo.due_date}
              priority={todo.priority}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllTasks;
