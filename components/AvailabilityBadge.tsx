"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AvailabilityBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      const { data, error } = await supabase
        .from("settings")
        .select("is_open")
        .eq("id", 1)
        .single();

      if (!error && data) {
        setIsOpen(data.is_open);
      }
      setLoading(false);
    }

    fetchStatus();

    const channel = supabase
      .channel("settings-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "settings" },
        (payload) => {
          setIsOpen(payload.new.is_open);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100">
        <div className="w-3 h-3 rounded-full bg-gray-400 animate-pulse"></div>
        <span className="text-sm font-medium text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
        isOpen ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <div
        className={`w-3 h-3 rounded-full ${
          isOpen ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
      <span
        className={`text-sm font-medium ${
          isOpen ? "text-green-700" : "text-red-700"
        }`}
      >
        {isOpen ? "Open - Accepting Now" : "Currently Closed"}
      </span>
    </div>
  );
}
