import { useState } from "react";
import { Plus } from "lucide-react";

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  game: "NLH",
  stakes: "100NL",
  durationHours: "2.0",
  hands: "200",
  result: "0",
  location: "Online",
  notes: "",
};

export default function SessionForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      id: crypto.randomUUID(),
      durationHours: parseFloat(form.durationHours || 0),
      hands: parseInt(form.hands || 0, 10),
      result: parseFloat(form.result || 0),
      createdAt: new Date().toISOString(),
    };
    onAdd(payload);
    setForm({ ...initialForm, date: form.date });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-4 md:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-gray-700">Log a new session</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-500 mb-1">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Game</label>
          <select
            value={form.game}
            onChange={(e) => update("game", e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option>NLH</option>
            <option>PLO</option>
            <option>Mixed</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Stakes</label>
          <input
            type="text"
            placeholder="e.g. 100NL"
            value={form.stakes}
            onChange={(e) => update("stakes", e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Duration (hrs)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={form.durationHours}
            onChange={(e) => update("durationHours", e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Hands</label>
          <input
            type="number"
            min="0"
            value={form.hands}
            onChange={(e) => update("hands", e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Result</label>
          <div className="flex rounded-md border overflow-hidden">
            <span className="px-2 bg-gray-50 text-gray-500 text-sm grid place-items-center">$</span>
            <input
              type="number"
              step="0.01"
              value={form.result}
              onChange={(e) => update("result", e.target.value)}
              className="w-full px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-500 mb-1">Location</label>
          <input
            type="text"
            placeholder="Online / Live / Site / Casino"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
        <div className="md:col-span-4">
          <label className="block text-xs text-gray-500 mb-1">Notes</label>
          <input
            type="text"
            placeholder="Key hands, mindset, table notes..."
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <Plus size={16} /> Add session
        </button>
      </div>
    </form>
  );
}
