import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 10;

const domains = ["All", "Web", "App", "AI/ML", "IoT", "Open Innovation"];
const statuses = ["All", "pending", "confirmed", "rejected"];

export default function ParticipantsTable({ registrations, onRowClick }) {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return registrations.filter((r) => {
      const matchesSearch =
        r.name?.toLowerCase().includes(search.toLowerCase()) ||
        r.teamName?.toLowerCase().includes(search.toLowerCase()) ||
        r.college?.toLowerCase().includes(search.toLowerCase());
      const matchesDomain = domainFilter === "All" || r.domain === domainFilter;
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      return matchesSearch && matchesDomain && matchesStatus;
    });
  }, [registrations, search, domainFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="bg-surface border border-white/10 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, team, or college..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 px-4 py-2 bg-bg border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
        />
        <select
          value={domainFilter}
          onChange={(e) => {
            setDomainFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 bg-bg border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
        >
          {domains.map((d) => (
            <option key={d} value={d}>{d === "All" ? "All Domains" : d}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 bg-bg border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s === "All" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-bg">
            <tr>
              <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">Reg ID</th>
              <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">Team</th>
              <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">Domain</th>
              <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">College</th>
              <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No registrations found
                </td>
              </tr>
            ) : (
              paginated.map((r, idx) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => onRowClick(r)}
                  className="border-t border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-white font-mono text-sm">{r.regId}</td>
                  <td className="px-4 py-3 text-white">{r.name}</td>
                  <td className="px-4 py-3 text-gray-300">{r.teamName}</td>
                  <td className="px-4 py-3 text-gray-300">{r.domain}</td>
                  <td className="px-4 py-3 text-gray-300 truncate max-w-[150px]">{r.college}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">
                    {r.createdAt?.toLocaleDateString() || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        r.status === "confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : r.status === "rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {r.status || "pending"}
                    </span>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-bg border border-white/10 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-bg border border-white/10 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
