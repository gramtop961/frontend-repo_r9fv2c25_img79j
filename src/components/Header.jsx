import { PokerChip, Settings } from "lucide-react";

export default function Header({ onClear }) {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white grid place-items-center shadow-sm">
            <PokerChip size={22} />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-none">GrindTrack</h1>
            <p className="text-xs text-muted-foreground">Online poker session logger</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClear}
            className="px-3 py-2 text-sm rounded-md border hover:bg-gray-50 transition"
            title="Clear all sessions"
          >
            Clear
          </button>
          <button
            type="button"
            className="px-3 py-2 text-sm rounded-md border hover:bg-gray-50 transition"
            title="Settings"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
