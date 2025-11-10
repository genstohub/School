"use client";

import { useState, useEffect } from "react";
import { Card } from "./Components/ui/Card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

type Transaction = {
  id: number;
  type: "history" | "pending";
  date: string;
  time: string;
  amount: number;
};

export default function ConfirmSubscriptionSection() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "history", date: "2025-09-20", time: "10:30 AM", amount: 2000 },
    { id: 2, type: "history", date: "2025-09-22", time: "3:15 PM", amount: 3000 },
    { id: 3, type: "pending", date: "2025-09-25", time: "9:00 AM", amount: 2000 },
  ]);

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"history" | "pending">("history");

  // Simulate real-time backend confirmation
  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const pendingTx = prev.find((t) => t.type === "pending");
        if (pendingTx) {
          // Move first pending → history
          return prev.map((t) =>
            t.id === pendingTx.id ? { ...t, type: "history" } : t
          );
        }
        return prev;
      });
    }, 8000); // every 8s simulate confirmation

    return () => clearInterval(interval);
  }, []);

  const filteredData = transactions.filter((t) => t.type === activeTab);

  const handleOpen = (tab: "history" | "pending") => {
    setActiveTab(tab);
    setOpen(true);
  };

  return (
    <section className="py-12 px-6 md:px-16 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-8">Confirm Subscription</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card
          onClick={() => handleOpen("history")}
          className="cursor-pointer hover:shadow-lg transition p-6 flex flex-col items-center justify-center text-center"
        >
          <CheckCircle className="h-10 w-10 text-green-600 mb-2" />
          <h3 className="text-lg font-semibold">Subscription History</h3>
          <p className="text-gray-500">View all confirmed payments</p>
        </Card>

        <Card
          onClick={() => handleOpen("pending")}
          className="cursor-pointer hover:shadow-lg transition p-6 flex flex-col items-center justify-center text-center"
        >
          <AlertCircle className="h-10 w-10 text-yellow-500 mb-2" />
          <h3 className="text-lg font-semibold">Pending Transactions</h3>
          <p className="text-gray-500">View payments awaiting confirmation</p>
        </Card>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg w-full backdrop-blur-md">
          <DialogHeader>
            <DialogTitle>
              {activeTab === "history" ? "Subscription History" : "Pending Transactions"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {filteredData.length > 0 ? (
              filteredData.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center border rounded-lg p-3 bg-white shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">₦{t.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">
                        {t.date} • {t.time}
                      </p>
                    </div>
                  </div>
                  {t.type === "history" ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-yellow-500" />
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                {activeTab === "history"
                  ? "No subscription history yet."
                  : "No pending transactions."}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}