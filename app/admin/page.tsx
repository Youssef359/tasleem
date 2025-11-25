'use client'
import React, { useState, useMemo } from "react";

type SessionStatus = "Active" | "Pending" | "Closed";

interface SessionRecord {
  id: string;
  merchant: string;
  client: string;
  status: SessionStatus;
  date: string; 
}

interface SortState {
  key: keyof SessionRecord;
  dir: "asc" | "desc";
}

interface FilterState {
  q: string;
  status: "All" | SessionStatus;
}

interface StatusBadgeProps {
  status: SessionStatus;
}

interface PaginationProps {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}
const MOCK: SessionRecord[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `S-${1000 + i}`,
  merchant: `Merchant ${((i % 7) + 1)}`,
  client: `Client ${((i % 13) + 1)}`,
  status: ["Active", "Pending", "Closed"][i % 3] as SessionStatus,
  date: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
}));

const TOKENS = {
  bg: "#000000",
  text: "#FAFAFA",
  textAlt: "#FFFFFF",
  status: {
    Active: "#2BD57A",
    Pending: "#FFB547",
    Closed: "#FF6B6B",
  },
};

function StatusBadge({ status }: StatusBadgeProps) {
  const color = TOKENS.status[status];
  return (
    <span
      role="status"
      aria-label={`Session status: ${status}`}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-medium"
      style={{ background: "rgba(255,255,255,0.02)", color }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      ></span>
      {status}
    </span>
  );
}

function Pagination({ page, totalPages, onPage }: PaginationProps) {
  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPage(1)}
        disabled={page === 1}
        className="px-3 py-1 rounded-md text-sm"
        aria-label="Go to first page"
      >
        ⏮
      </button>

      <button
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1 rounded-md text-sm"
        aria-label="Previous page"
      >
        ◀
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          aria-current={p === page}
          className={`px-3 py-1 rounded-md text-sm ${
            p === page ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-md text-sm"
        aria-label="Next page"
      >
        ▶
      </button>

      <button
        onClick={() => onPage(totalPages)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-md text-sm"
        aria-label="Go to last page"
      >
        ⏭
      </button>
    </div>
  );
}

function FilterBar({ onFilterChange }: FilterBarProps) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<FilterState["status"]>("All");

  const handleInput = (value: string) => {
    setQ(value);
    onFilterChange({ q: value, status });
  };

  const handleStatus = (value: string) => {
    const st = value as FilterState["status"];
    setStatus(st);
    onFilterChange({ q, status: st });
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between w-full">
      <div className="flex items-center gap-3 w-full md:w-2/3">
        <input
          placeholder="Search by Session ID, Merchant or Client"
          value={q}
          onChange={(e) => handleInput(e.target.value)}
          className="w-full bg-transparent border border-white/6 rounded-md px-3 py-2 text-sm placeholder-white/40"
          aria-label="Search sessions"
        />

        <select
          value={status}
          onChange={(e) => handleStatus(e.target.value)}
          className="bg-transparent border border-white/6 rounded-md px-3 py-2 text-sm"
          aria-label="Filter by status"
        >
          <option>All</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>
      </div>

      <div className="flex gap-2 items-center">
        <button className="px-3 py-2 rounded-md bg-white/6 text-sm">
          Export
        </button>
        <button className="px-3 py-2 rounded-md bg-white/10 text-sm">
          New Session
        </button>
      </div>
    </div>
  );
}

export default function SessionsTablePage() {
  const [data] = useState<SessionRecord[]>(MOCK);
  const [sort, setSort] = useState<SortState>({ key: "date", dir: "desc" });
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [filters, setFilters] = useState<FilterState>({
    q: "",
    status: "All",
  });

  const filtered = useMemo(() => {
    const query = filters.q.trim().toLowerCase();
    return data.filter((r) => {
      if (filters.status !== "All" && r.status !== filters.status) return false;
      if (!query) return true;

      return (
        r.id.toLowerCase().includes(query) ||
        r.merchant.toLowerCase().includes(query) ||
        r.client.toLowerCase().includes(query)
      );
    });
  }, [data, filters]);

  const sorted = useMemo(() => {
    const s = [...filtered];
    s.sort((a, b) => {
      const dir = sort.dir === "asc" ? 1 : -1;

      if (sort.key === "date") {
        return dir * (new Date(a.date).getTime() - new Date(b.date).getTime());
      }

      return dir * a[sort.key].toString().localeCompare(b[sort.key].toString());
    });
    return s;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const pageData = sorted.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (key: keyof SessionRecord) => {
    setSort((prev) =>
      prev.key === key
        ? { ...prev, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  };

  return (
    <div
      style={{ background: TOKENS.bg, color: TOKENS.text }}
      className="min-h-screen p-6"
    >
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Admin — Sessions</h1>
        <p className="text-sm text-white/60 mt-1">
          Monitor sessions between merchants and clients. Click a row to open
          details.
        </p>
      </header>

      <section className="mb-4">
        <FilterBar
          onFilterChange={(f) => {
            setFilters(f);
            setPage(1);
          }}
        />
      </section>

      <section className="rounded-lg border border-white/6 overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-white/2">
            <tr className="text-left text-sm">
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => toggleSort("id")}
              >
                Session ID
              </th>

              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => toggleSort("merchant")}
              >
                Merchant Name
              </th>

              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => toggleSort("client")}
              >
                Client Name
              </th>

              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => toggleSort("status")}
              >
                Session Status
              </th>

              <th
                className="px-4 py-3 cursor-pointer whitespace-nowrap"
                onClick={() => toggleSort("date")}
              >
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {pageData.map((row) => (
              <tr
                key={row.id}
                tabIndex={0}
                className="border-t border-white/6 hover:bg-white/2 focus:bg-white/3 transition-colors duration-150 cursor-pointer"
                onClick={() =>
                  alert(`Open details for ${row.id} — implement slide-over`)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    alert(`Open details for ${row.id} — implement slide-over`);
                }}
                aria-label={`Session ${row.id} between ${row.merchant} and ${row.client}, status ${row.status}`}
              >
                <td
                  className="px-4 py-4 align-middle text-sm font-medium"
                  style={{ color: TOKENS.text }}
                >
                  {row.id}
                </td>

                <td className="px-4 py-4 align-middle text-sm">
                  {row.merchant}
                </td>

                <td className="px-4 py-4 align-middle text-sm">
                  {row.client}
                </td>

                <td className="px-4 py-4 align-middle text-sm">
                  <StatusBadge status={row.status} />
                </td>

                <td className="px-4 py-4 align-middle text-sm whitespace-nowrap">
                  {new Date(row.date).toLocaleString()}
                </td>
              </tr>
            ))}

            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-white/60"
                >
                  No sessions match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-3 border-t border-white/6">
          <div className="text-sm text-white/60">
            Showing {(page - 1) * perPage + 1}–
            {Math.min(page * perPage, sorted.length)} of {sorted.length}
          </div>

          <Pagination page={page} totalPages={totalPages} onPage={setPage} />
        </div>
      </section>
    </div>
  );
}
