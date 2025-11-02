import { Trash2, ArrowUpDown } from "lucide-react";

export default function SessionsTable({ sessions, onDelete, onSort, sort }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <Th label="Date" field="date" onSort={onSort} sort={sort} />
            <Th label="Game" field="game" onSort={onSort} sort={sort} />
            <Th label="Stakes" field="stakes" onSort={onSort} sort={sort} />
            <Th label="Hours" field="durationHours" onSort={onSort} sort={sort} />
            <Th label="Hands" field="hands" onSort={onSort} sort={sort} />
            <Th label="Result" field="result" onSort={onSort} sort={sort} />
            <th className="px-3 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.length === 0 ? (
            <tr>
              <td className="px-3 py-8 text-center text-gray-500" colSpan={7}>
                No sessions yet. Log your first one above.
              </td>
            </tr>
          ) : (
            sessions.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{s.date}</td>
                <td className="px-3 py-2">{s.game}</td>
                <td className="px-3 py-2">{s.stakes}</td>
                <td className="px-3 py-2">{Number(s.durationHours).toFixed(1)}</td>
                <td className="px-3 py-2">{s.hands}</td>
                <td className={`px-3 py-2 font-medium ${Number(s.result) >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  ${Number(s.result).toFixed(2)}
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    onClick={() => onDelete(s.id)}
                    className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-gray-50 text-gray-700"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function Th({ label, field, onSort, sort }) {
  const isActive = sort.field === field;
  return (
    <th className="px-3 py-2 text-left font-medium">
      <button
        className={`inline-flex items-center gap-1 ${isActive ? "text-gray-900" : "text-gray-600"}`}
        onClick={() => onSort(field)}
      >
        {label}
        <ArrowUpDown size={14} />
      </button>
    </th>
  );
}
