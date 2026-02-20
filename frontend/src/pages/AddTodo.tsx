import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../componets/Layout";
import { useCreateTodoMutation } from "../redux/todo/todoApi";
import { useGetCategoriesByUserQuery } from "../redux/category/categoryApi";
import { useSelector } from "react-redux";


const AddTodo = () => {
   const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const [createTodo, { isLoading }] = useCreateTodoMutation();
  const { data: categories = [] } = useGetCategoriesByUserQuery(user?.id || "");
  console.log("Fetched categories:", categories);
  console.log("User ID for fetching categories:", user.id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "medium",
    status: "Not Started",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTodo({
        ...formData,
        completed: false,
      }).unwrap();

      navigate("/");
    } catch (error) {
      console.error("Create todo failed:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">

        {/* 🔥 HEADER SECTION */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition"
          >
            <i className="ri-arrow-left-line text-lg"></i>
            Back
          </button>

          <h2 className="text-2xl font-bold text-gray-800">
            Create New Todo
          </h2>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div className="relative">
              <i className="ri-edit-line absolute left-4 top-3 text-gray-400"></i>
              <input
                name="title"
                type="text"
                required
                placeholder="Todo Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
            </div>

            {/* Description */}
            <div className="relative">
              <i className="ri-file-text-line absolute left-4 top-3 text-gray-400"></i>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition resize-none"
              />
            </div>

            {/* Due Date */}
            <div className="relative">
              <i className="ri-calendar-event-line absolute left-4 top-3 text-gray-400"></i>
              <input
                name="due_date"
                type="datetime-local"
                required
                value={formData.due_date}
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
            </div>

            {/* Grid Section */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Priority */}
              <div className="relative">
                <i className="ri-flag-line absolute left-4 top-3 text-gray-400"></i>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition appearance-none"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              {/* Status */}
              <div className="relative">
                <i className="ri-loader-4-line absolute left-4 top-3 text-gray-400"></i>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition appearance-none"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

            </div>

            {/* Category */}
            <div className="relative">
              <i className="ri-folder-line absolute left-4 top-3 text-gray-400"></i>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition appearance-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-xl hover:opacity-90 transition shadow-md disabled:opacity-70"
            >
              {isLoading ? "Creating..." : "Create Todo"}
            </button>

          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddTodo;
