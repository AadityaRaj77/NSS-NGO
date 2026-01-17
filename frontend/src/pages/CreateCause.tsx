import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createCause, listAdminCauses, updateCause } from "../api/adminCauses";

export default function CreateCause() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    target_amount: "",
    deadline: "",
  });

  const [causes, setCauses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    target_amount: "",
    deadline: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchCauses = async () => {
    const res = await listAdminCauses();
    setCauses(res.data);
  };

  useEffect(() => {
    fetchCauses();
  }, []);

  const submit = async () => {
    try {
      setLoading(true);

      await createCause({
        title: form.title,
        description: form.description,
        target_amount: Number(form.target_amount),
        deadline: form.deadline || null,
      });

      setForm({
        title: "",
        description: "",
        target_amount: "",
        deadline: "",
      });

      await fetchCauses();
    } catch {
      alert("Failed to create cause");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (cause: any) => {
    setEditingId(cause.id);
    setEditForm({
      title: cause.title,
      description: cause.description,
      target_amount: String(cause.target_amount),
      deadline: cause.deadline ? cause.deadline.slice(0, 10) : "",
    });
  };

  const saveEdit = async () => {
    if (!editingId) return;

    await updateCause(editingId, {
      title: editForm.title,
      description: editForm.description,
      target_amount: Number(editForm.target_amount),
      deadline: editForm.deadline || null,
    });

    setEditingId(null);
    setEditForm({
      title: "",
      description: "",
      target_amount: "",
      deadline: "",
    });

    fetchCauses();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      title: "",
      description: "",
      target_amount: "",
      deadline: "",
    });
  };

  return (
    <>
      <Navbar role="ADMIN" />

      <div className="mx-auto max-w-4xl p-6 space-y-12">
        {/* create cause */}
        <div>
          <h1 className="mb-6 text-2xl font-bold text-blue-900">
            Create Donation Cause
          </h1>

          <div className="rounded-2xl bg-white p-6 shadow space-y-4">
            <input
              name="title"
              placeholder="Cause title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              name="target_amount"
              type="number"
              placeholder="Target amount"
              value={form.target_amount}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />

            <button
              disabled={loading}
              onClick={submit}
              className="w-full rounded-xl bg-orange-600 py-3 font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Cause"}
            </button>
          </div>
        </div>

        {/* List + Edit */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-blue-900">
            Your Created Causes
          </h2>

          {causes.length === 0 && (
            <p className="text-sm text-gray-500">No causes created yet</p>
          )}

          <div className="space-y-4">
            {causes.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border p-4 bg-white shadow-sm"
              >
                {editingId === c.id ? (
                  <div className="space-y-3">
                    <input
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          title: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border px-3 py-2"
                    />

                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full rounded-lg border px-3 py-2"
                    />

                    <input
                      type="number"
                      value={editForm.target_amount}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          target_amount: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border px-3 py-2"
                    />

                    <input
                      type="date"
                      value={editForm.deadline}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          deadline: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border px-3 py-2"
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={saveEdit}
                        className="rounded-lg bg-green-600 px-4 py-2 text-white"
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="rounded-lg bg-gray-300 px-4 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{c.title}</h3>
                      <p className="text-sm text-gray-600">{c.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Target: ₹{c.target_amount}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`text-xs font-semibold ${
                          c.is_active ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {c.is_active ? "ACTIVE" : "INACTIVE"}
                      </span>

                      {c.is_active && (
                        <button
                          onClick={() => startEdit(c)}
                          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
