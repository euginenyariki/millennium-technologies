"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Lock, LogOut, RefreshCw, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

type Row = {
  id: string;
  reference?: string;
  serviceType?: string;
  service?: string;
  propertyType?: string;
  location?: string;
  description?: string;
  urgent?: boolean;
  method?: string;
  total?: string;
  name?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  phone?: string;
  email?: string;
  message?: string;
  requirements?: string;
  dynamicAnswers?: string;
  status?: string;
  preferredDate?: string | Date;
  createdAt?: string | Date;
  [key: string]: unknown;
};

const TABS = [
  { key: "quotes", label: "Quote Requests" },
  { key: "bookings", label: "Service Bookings" },
  { key: "messages", label: "Messages" },
  { key: "orders", label: "Orders" },
] as const;

const STATUSES = ["new", "contacted", "quoted", "won", "lost", "done", "cancelled"];

function fmtDate(v: unknown) {
  if (!v) return "—";
  try {
    return new Date(v as string).toLocaleString("en-KE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(v);
  }
}

function dynamicPreview(json: string) {
  try {
    const obj = JSON.parse(json);
    const entries = Object.entries(obj).filter(([, v]) => Boolean(v));
    if (entries.length === 0) return null;
    return entries.map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join(" · ");
  } catch {
    return null;
  }
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authing, setAuthing] = useState(false);
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("quotes");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthing(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error("Invalid password");
      setAuthed(true);
    } catch {
      setAuthError("Invalid password. Please try again.");
    } finally {
      setAuthing(false);
    }
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/data?tab=${tab}&limit=200`);
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setRows(data.rows || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  const setStatus = async (row: Row, status: string) => {
    const res = await fetch("/api/admin/data", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tab, id: row.id, status }),
    });
    if (res.ok) load();
  };

  const logout = () => {
    setAuthed(false);
    setRows([]);
  };

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mt-950 px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-500">Admin</p>
            <h1 className="mt-2 text-2xl font-bold text-white">{SITE.name}</h1>
            <p className="mt-1 text-sm text-gray-400">Dashboard access</p>
          </div>
          <form onSubmit={login} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
              <Lock className="h-4 w-4 text-green-500" /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Admin password"
              autoFocus
            />
            {authError && (
              <p className="mt-3 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                {authError}
              </p>
            )}
            <button type="submit" disabled={authing} className="btn-primary mt-4 w-full disabled:opacity-60">
              {authing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldAlert className="h-4 w-4" />}
              Sign In
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mt-950 pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-400">Quotes, bookings, messages and orders — {SITE.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={load} className="btn-secondary px-4 py-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button onClick={logout} className="btn-secondary px-4 py-2">
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                tab === t.key
                  ? "border-green-500/40 bg-green-500/10 text-green-400"
                  : "border-white/[0.08] bg-white/[0.02] text-gray-400 hover:text-white"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {error && <p className="mb-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

        {loading ? (
          <p className="py-16 text-center text-gray-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="py-16 text-center text-gray-500">Nothing here yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.02] text-xs uppercase tracking-wide text-gray-500">
                  {tab !== "messages" && <th className="px-4 py-3">Reference</th>}
                  {tab === "quotes" && <th className="px-4 py-3">Service</th>}
                  {tab === "bookings" && <th className="px-4 py-3">Service</th>}
                  {tab === "quotes" && <th className="px-4 py-3">Property</th>}
                  {(tab === "bookings" || tab === "orders") && <th className="px-4 py-3">Details</th>}
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Date</th>
                  {tab !== "messages" && <th className="px-4 py-3">Status</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {rows.map((row) => (
                  <tr key={String(row.id)} className="align-top hover:bg-white/[0.02]">
                    {tab !== "messages" && (
                      <td className="px-4 py-3 font-mono text-xs text-green-400">{String(row.reference ?? "")}</td>
                    )}
                    {tab === "quotes" && <td className="px-4 py-3 capitalize text-gray-200">{String(row.serviceType ?? "").replace("_", " ")}</td>}
                    {tab === "bookings" && <td className="px-4 py-3 capitalize text-gray-200">{String(row.service ?? "")}</td>}
                    {tab === "quotes" && <td className="px-4 py-3 text-gray-400">{String(row.propertyType ?? "")}</td>}
                    {(tab === "bookings" || tab === "orders") && (
                      <td className="max-w-[280px] px-4 py-3 text-gray-400">
                        {tab === "bookings" ? (
                          <>
                            <p className="text-gray-200">{String(row.location ?? "")}</p>
                            {row.urgent && <span className="mt-1 inline-block rounded-full bg-red-500/15 px-2 py-0.5 text-xs font-medium text-red-400">URGENT</span>}
                            <p className="mt-1">{String(row.description ?? "")}</p>
                          </>
                        ) : (
                          <>
                            <p className="text-gray-200">{String(row.location ?? row.method ?? "")}</p>
                            <p className="mt-1 text-xs">{String(row.total ?? "")}</p>
                          </>
                        )}
                      </td>
                    )}
                    <td className="max-w-[300px] px-4 py-3">
                      {tab === "messages" ? (
                        <>
                          <p className="font-medium text-gray-200">{String(row.name)}</p>
                          <p className="text-xs text-gray-400">{String(row.email)}{row.phone ? ` · ${row.phone}` : ""}</p>
                          <p className="mt-1 text-gray-300">{String(row.message)}</p>
                        </>
                      ) : tab === "quotes" ? (
                        <>
                          <p className="font-medium text-gray-200">{String(row.phone)}</p>
                          <p className="text-xs text-gray-400">{String(row.email ?? "")} · {String(row.location)}</p>
                          {row.requirements && <p className="mt-1 text-xs text-gray-400">{String(row.requirements)}</p>}
                          {dynamicPreview(String(row.dynamicAnswers ?? "{}")) && (
                            <p className="mt-1 text-xs text-green-400/80">{dynamicPreview(String(row.dynamicAnswers ?? "{}"))}</p>
                          )}
                        </>
                      ) : (
                        <>
                          <p className="font-medium text-gray-200">{String(row.contactName ?? row.name ?? "")}</p>
                          <p className="text-xs text-gray-400">{String(row.contactPhone ?? row.phone ?? "")}</p>
                          {row.contactEmail && <p className="text-xs text-gray-400">{String(row.contactEmail)}</p>}
                        </>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-400">
                      {fmtDate(row.createdAt)}
                      {tab === "bookings" && row.preferredDate && (
                        <p className="mt-1">Pref: {String(row.preferredDate)}</p>
                      )}
                    </td>
                    {tab !== "messages" && (
                      <td className="px-4 py-3">
                        <select
                          className="select w-auto min-w-28 px-2 py-1.5 text-xs"
                          value={String(row.status ?? "new")}
                          onChange={(e) => setStatus(row, e.target.value)}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}