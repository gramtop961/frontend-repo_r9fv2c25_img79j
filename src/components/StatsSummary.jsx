import { TrendingUp, TrendingDown, Timer, Calculator } from "lucide-react";

function Stat({ label, value, icon, accent = "emerald" }) {
  const Icon = icon;
  const colors = {
    emerald:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100",
    red: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-100",
    gray: "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-100",
  };
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="mt-1 text-xl font-semibold">{value}</p>
        </div>
        <div className={`h-10 w-10 grid place-items-center rounded-lg ${colors[accent]}`}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

export default function StatsSummary({ sessions }) {
  const totals = computeStats(sessions);

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <Stat label="Net Profit" value={`$${totals.net.toFixed(2)}`} icon={Calculator} accent={totals.net >= 0 ? "emerald" : "red"} />
      <Stat label="Avg Hourly" value={`$${totals.hourly.toFixed(2)}/hr`} icon={Timer} accent="gray" />
      <Stat label="Win Rate" value={`${totals.winRate.toFixed(0)}%`} icon={TrendingUp} accent="emerald" />
      <Stat label="Best / Worst" value={`$${totals.best.toFixed(0)} / $${totals.worst.toFixed(0)}`} icon={totals.net >= 0 ? TrendingUp : TrendingDown} accent={totals.net >= 0 ? "emerald" : "red"} />
    </section>
  );
}

export function computeStats(sessions) {
  const count = sessions.length;
  const net = sessions.reduce((a, s) => a + (Number(s.result) || 0), 0);
  const hours = sessions.reduce((a, s) => a + (Number(s.durationHours) || 0), 0);
  const hourly = hours > 0 ? net / hours : 0;
  const wins = sessions.filter((s) => Number(s.result) > 0).length;
  const winRate = count > 0 ? (wins / count) * 100 : 0;
  const best = sessions.reduce((m, s) => Math.max(m, Number(s.result) || -Infinity), count ? -Infinity : 0);
  const worst = sessions.reduce((m, s) => Math.min(m, Number(s.result) || Infinity), count ? Infinity : 0);

  return { count, net, hours, hourly, wins, winRate, best: isFinite(best) ? best : 0, worst: isFinite(worst) ? worst : 0 };
}
