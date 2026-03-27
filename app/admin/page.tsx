"use client";

import { useState, useEffect } from "react";
import { supabase, Booking } from "@/lib/supabase";
import { SITE_CONFIG } from "@/config/site";
import { 
  Lock, Check, X, RefreshCw, LogOut, ToggleLeft, ToggleRight,
  Trash2, Calendar, Filter, AlertTriangle, XCircle, CheckCircle, Clock
} from "lucide-react";

type FilterType = "all" | "pending" | "accepted" | "rejected";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === SITE_CONFIG.adminPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  }

  async function fetchBookings() {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setBookings(data as Booking[]);
    setLoading(false);
  }

  async function fetchStatus() {
    const { data } = await supabase
      .from("settings")
      .select("is_open")
      .eq("id", 1)
      .single();
    if (data) setIsOpen(data.is_open);
  }

  async function toggleStatus() {
    const newValue = !isOpen;
    await supabase
      .from("settings")
      .update({ is_open: newValue })
      .eq("id", 1);
    setIsOpen(newValue);
  }

  async function updateBookingStatus(id: string, status: "accepted" | "rejected") {
    await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);
    fetchBookings();
  }

  async function deleteBooking(id: string) {
    await supabase
      .from("bookings")
      .delete()
      .eq("id", id);
    setShowDeleteConfirm(null);
    fetchBookings();
  }

  async function clearTodayBookings() {
    const today = new Date().toISOString().split("T")[0];
    await supabase
      .from("bookings")
      .delete()
      .gte("created_at", today);
    setShowClearConfirm(false);
    fetchBookings();
  }

  async function clearCompletedBookings() {
    await supabase
      .from("bookings")
      .delete()
      .in("status", ["accepted", "rejected"]);
    setShowClearConfirm(false);
    fetchBookings();
  }

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
      fetchStatus();

      const channel = supabase
        .channel("admin-changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "bookings" },
          () => fetchBookings()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter admin password"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full">
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card bg-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="card bg-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="card bg-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Accepted</p>
                <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
              </div>
            </div>
          </div>
          <div className="card bg-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Availability Status</h2>
              <p className="text-gray-600">
                Currently: <span className={isOpen ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {isOpen ? "Open - Accepting Walk-ins" : "Closed"}
                </span>
              </p>
            </div>
            <button
              onClick={toggleStatus}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isOpen
                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {isOpen ? (
                <>
                  <ToggleRight className="w-5 h-5" />
                  Close Shop
                </>
              ) : (
                <>
                  <ToggleLeft className="w-5 h-5" />
                  Open Shop
                </>
              )}
            </button>
          </div>
        </div>

        <div className="card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">Booking Requests</h2>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchBookings}
                className="flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>

          {showClearConfirm && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-red-800">Clear Bookings</p>
                  <p className="text-sm text-red-600 mt-1">Choose what to clear:</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button
                      onClick={clearCompletedBookings}
                      className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200"
                    >
                      Clear Accepted & Rejected
                    </button>
                    <button
                      onClick={clearTodayBookings}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                    >
                      Clear Today&apos;s Bookings
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <p className="text-gray-600 text-center py-8">Loading bookings...</p>
          ) : filteredBookings.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No bookings found.</p>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`p-4 rounded-lg border relative ${
                    booking.status === "pending"
                      ? "border-yellow-200 bg-yellow-50"
                      : booking.status === "accepted"
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  {showDeleteConfirm === booking.id && (
                    <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-lg z-10">
                      <div className="text-center">
                        <p className="text-gray-900 font-medium mb-2">Delete this booking?</p>
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                          >
                            Yes, Delete
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">{booking.name}</span>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            booking.status === "pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : booking.status === "accepted"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Phone: {booking.phone}</p>
                        <p>Car: {booking.car_model}</p>
                        <p>Service: {booking.service}</p>
                        {booking.notes && <p>Notes: {booking.notes}</p>}
                        <p className="text-xs text-gray-400">
                          Submitted: {new Date(booking.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(booking.id, "accepted")}
                            className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            <Check className="w-4 h-4" />
                            Accept
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, "rejected")}
                            className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setShowDeleteConfirm(booking.id)}
                        className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
