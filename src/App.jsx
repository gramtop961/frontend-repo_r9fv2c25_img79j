import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import SessionForm from "./components/SessionForm";
import StatsSummary, { computeStats } from "./components/StatsSummary";
import SessionsTable from "./components/SessionsTable";

function App() {
  const [sessions, setSessions] = useState(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("gt:sessions") : null;
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [sort, setSort] = useState({ field: "date", dir: "desc" });

  useEffect(() => {
    localStorage.setItem("gt:sessions", JSON.stringify(sessions));
  }, [sessions]);

  function handleAdd(session) {
    setSessions((prev) => [session, ...prev]);
  }

  function handleDelete(id) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }

  function handleClear() {
    if (confirm("Clear all sessions? This cannot be undone.")) {
      setSessions([]);
    }
  }

  function handleSort(field) {
    setSort((s) => ({ field, dir: s.field === field && s.dir === "asc" ? "desc" : "asc" }));
  }

  const ordered = useMemo(() => {
    const copy = [...sessions];
    copy.sort((a, b) => {
      const va = a[sort.field];
      const vb = b[sort.field];
      let res = 0;
      if (sort.field === "date") {
        res = new Date(va) - new Date(vb);
      } else if (typeof va === "number" && typeof vb === "number") {
        res = va - vb;
      } else {
        res = String(va).localeCompare(String(vb));
      }
      return sort.dir === "asc" ? res : -res;
    });
    return copy;
  }, [sessions, sort]);

  const totals = computeStats(sessions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header onClear={handleClear} />
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SessionForm onAdd={handleAdd} />
            <SessionsTable sessions={ordered} onDelete={handleDelete} onSort={handleSort} sort={sort} />
          </div>
          <aside className="space-y-4">
            <div className="rounded-xl border bg-white p-4 shadow-sm">
              <h2 className="text-sm font-medium text-gray-700 mb-3">Overview</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Sessions: <span className="font-medium text-gray-900">{totals.count}</span></p>
                <p>Hours: <span className="font-medium text-gray-900">{totals.hours.toFixed(1)}</span></p>
                <p>Wins: <span className="font-medium text-gray-900">{totals.wins}</span></p>
              </div>
            </div>
            <StatsSummary sessions={sessions} />
            <div className="rounded-xl border bg-white p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tip</h3>
              <p className="text-xs text-gray-600">Click any column header to sort. Positive results show in green, losses in red.</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
