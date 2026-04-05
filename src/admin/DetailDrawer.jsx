import { motion } from "framer-motion";
import { db } from "../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

const statusOptions = ["pending", "confirmed", "rejected"];

export default function DetailDrawer({ participant, onClose }) {
  const handleStatusChange = async (newStatus) => {
    try {
      const docRef = doc(db, "registrations", participant.id);
      await updateDoc(docRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface border-l border-white/10 z-50 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Participant Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-bg rounded-lg p-4">
              <label className="text-gray-400 text-sm">Registration ID</label>
              <p className="text-white font-mono text-lg">{participant.regId}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg rounded-lg p-4">
                <label className="text-gray-400 text-sm">Full Name</label>
                <p className="text-white">{participant.name}</p>
              </div>
              <div className="bg-bg rounded-lg p-4">
                <label className="text-gray-400 text-sm">Team Name</label>
                <p className="text-white">{participant.teamName}</p>
              </div>
            </div>

            <div className="bg-bg rounded-lg p-4">
              <label className="text-gray-400 text-sm">Email</label>
              <p className="text-white">{participant.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg rounded-lg p-4">
                <label className="text-gray-400 text-sm">Phone</label>
                <p className="text-white">{participant.phone}</p>
              </div>
              <div className="bg-bg rounded-lg p-4">
                <label className="text-gray-400 text-sm">Team Size</label>
                <p className="text-white">{participant.teamSize} members</p>
              </div>
            </div>

            <div className="bg-bg rounded-lg p-4">
              <label className="text-gray-400 text-sm">Domain</label>
              <p className="text-white">{participant.domain}</p>
            </div>

            <div className="bg-bg rounded-lg p-4">
              <label className="text-gray-400 text-sm">College</label>
              <p className="text-white">{participant.college}</p>
            </div>

            <div className="bg-bg rounded-lg p-4">
              <label className="text-gray-400 text-sm">Registration Date</label>
              <p className="text-white">
                {participant.createdAt?.toLocaleDateString() || "-"}
              </p>
            </div>

            <div className="bg-bg rounded-lg p-4">
              <label className="text-gray-400 text-sm">Status</label>
              <select
                value={participant.status || "pending"}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="mt-2 w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
