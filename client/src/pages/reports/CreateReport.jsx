import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";
import { sanitizeObject } from "../../utils/sanitizer";
import Navbar from "../../components/layout/Navbar";

export default function CreateReport() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "SCAM"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sanitized = sanitizeObject(form);
      await API.post("/reports", sanitized);
      toast.success("Report submitted!");
      setForm({ title: "", description: "", category: "SCAM" });
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        <form className="card" onSubmit={handleSubmit}>
          <h2 className="text-lg mb-4 font-semibold">Create Report</h2>

          <input
            name="title"
            placeholder="Title"
            className="input"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            className="input"
            value={form.description}
            onChange={handleChange}
          />

          <select
            name="category"
            className="input"
            value={form.category}
            onChange={handleChange}
          >
            <option value="SCAM">Scam</option>
            <option value="PHISHING">Phishing</option>
            <option value="HARASSMENT">Harassment</option>
            <option value="OTHER">Other</option>
          </select>

          <button className="btn btn-primary w-full">
            {loading ? "Processing..." : "Submit Report"}
          </button>
        </form>
      </div>
    </>
  );
}
