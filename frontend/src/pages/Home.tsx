import Layout from "../componets/Layout";
import TaskCard from "../componets/dashboard/TaskCard";
import CompletedTaskCard from "../componets/dashboard/CompletedTaskCard";
import StatusCard from "../componets/dashboard/StatusCard";
import QuoteCard from "../componets/dashboard/QuoteCard";
import { useSelector } from "react-redux";
import { useGetTodoByUserQuery } from "../redux/todo/todoApi";

const Home = () => {
  const { user } = useSelector((state: any) => state.auth);

  const { data: todos = [], isLoading } =
    useGetTodoByUserQuery(user?.id, {
      skip: !user?.id,
    });

  /* SORT BY NEAREST DUE DATE */
  const activeTodos = todos
    .filter((t: any) => !t.completed)
    .sort(
      (a: any, b: any) =>
        new Date(a.due_date).getTime() -
        new Date(b.due_date).getTime()
    );

  const completedTodos = todos.filter((t: any) => t.completed);

  return (
    <Layout>
      {/* HEADER */}
      <div className="mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome back <span className="text-primary">{user?.name}</span>
          </h2>
          <p className="text-gray-500 text-sm">
            Here’s your task summary
          </p>
        </div>

        <QuoteCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ACTIVE TODOS */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-4">To-Do Tasks</h3>

          <div className="flex-1 overflow-y-auto space-y-4">
            {isLoading && <p>Loading...</p>}

            {activeTodos.map((todo: any) => (
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

        {/* RIGHT SIDE */}
        <div className="lg:col-span-4 space-y-6">
          <StatusCard userId={user?.id} />

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold mb-3">Completed Tasks</h3>

            <div className="space-y-3 overflow-y-auto max-h-[300px]">
              {completedTodos.map((todo: any) => (
                <CompletedTaskCard
                  key={todo._id}
                  id={todo._id}
                  title={todo.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
