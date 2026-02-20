import { useState } from "react";
import Layout from "../componets/Layout";
import {
  useGetCategoriesByUserQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "../redux/category/categoryApi";
import { useSelector } from "react-redux";

const ManageCategories = () => {
  const { user } = useSelector((state: any) => state.auth);

  const { data: categories = [], isLoading } =
    useGetCategoriesByUserQuery(user?.id, {
      skip: !user?.id,
    });

  const [createCategory, { isLoading: creating }] =
    useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    await createCategory({
      ...formData,
      userId: user?.id,
    });

    setFormData({ name: "", description: "" });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Manage Categories
          </h2>
          <p className="text-gray-500 text-sm">
            Organize your tasks by categories
          </p>
        </div>

        {/* CREATE CATEGORY CARD */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
          <h3 className="text-lg font-semibold mb-4">
            Create New Category
          </h3>

          <form onSubmit={handleCreate} className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Category Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
              required
            />

            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
            />

            <button
              type="submit"
              disabled={creating}
              className="bg-primary text-white rounded-xl py-3 hover:opacity-90 transition"
            >
              {creating ? "Creating..." : "Add Category"}
            </button>
          </form>
        </div>

        {/* CATEGORY LIST */}
        <div>
          <h3 className="text-lg font-semibold mb-6">
            Your Categories
          </h3>

          {isLoading && <p>Loading categories...</p>}

          {!isLoading && categories.length === 0 && (
            <div className="bg-white rounded-2xl p-6 text-center text-gray-500 shadow-sm">
              No categories created yet.
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat: any) => (
              <div
                key={cat._id}
                className="
                  bg-white/90 backdrop-blur-md
                  border border-gray-100
                  rounded-3xl
                  p-6
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                  group
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {cat.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {cat.description || "No description"}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteCategory(cat._id)}
                    className="
                      opacity-0 group-hover:opacity-100
                      bg-red-50 text-red-500
                      w-9 h-9 rounded-xl
                      grid place-items-center
                      hover:bg-red-100
                      transition
                    "
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>

                <div className="mt-4 text-xs text-gray-400 flex items-center gap-2">
                  <i className="ri-time-line"></i>
                  Created:{" "}
                  {new Date(cat.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default ManageCategories;
