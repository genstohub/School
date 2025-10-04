"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReceiptText } from "lucide-react";

type Transaction = {
  id: number;
  course: string;
  amount: number;
  date: string;
  status: "pending" | "confirmed";
  username: string;
  schoolId: string;
  bankName: string;
};

export default function ConfirmSubscription() {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      course: "B.Sc Computer Science",
      amount: 2000,
      date: new Date().toLocaleString(),
      status: "pending",
      username: "John Doe",
      schoolId: "UNILAG/CSC/22/001",
      bankName: "GTBank",
    },
    {
      id: 2,
      course: "B.Sc Mathematics",
      amount: 3000,
      date: new Date().toLocaleString(),
      status: "confirmed",
      username: "Mary Jane",
      schoolId: "JOSTUM/MTH/21/045",
      bankName: "Access Bank",
    },
  ]);

  // Simulate backend confirmation of pending transactions
  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const updated = [...prev];
        const pendingIndex = updated.findIndex((t) => t.status === "pending");
        if (pendingIndex !== -1) {
          updated[pendingIndex] = {
            ...updated[pendingIndex],
            status: "confirmed",
            date: new Date().toLocaleString(),
          };
        }
        return updated;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const history = transactions.filter((t) => t.status === "confirmed");
  const pending = transactions.filter((t) => t.status === "pending");

  return (
    <section className="py-16 bg-gray-50 px-6 lg:px-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Confirm Subscription
      </h2>

      {/* Card trigger */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white shadow-md p-6 rounded-xl text-center hover:shadow-lg transition flex flex-col items-center"
      >
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-3">
          <ReceiptText className="w-8 h-8" />
        </div>
        <h3 className="font-semibold text-lg">View Your Subscription</h3>
        <p className="text-gray-600 text-sm">Check history & pending status</p>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Subscription Status</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* History */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">
                Subscription History
              </h4>
              {history.length > 0 ? (
                <ul className="space-y-3 text-sm">
                  {history.map((t) => (
                    <li
                      key={t.id}
                      className="border p-3 rounded-lg bg-green-50 border-green-200"
                    >
                      <p className="font-medium">{t.course}</p>
                      <p>₦{t.amount}</p>
                      <p className="text-gray-700">👤 {t.username}</p>
                      <p className="text-gray-700">🎓 {t.schoolId}</p>
                      <p className="text-gray-700">🏦 {t.bankName}</p>
                      <p className="text-gray-500 text-xs">{t.date}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No history found.</p>
              )}
            </div>

            {/* Pending */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">
                Pending Transactions
              </h4>
              {pending.length > 0 ? (
                <ul className="space-y-3 text-sm">
                  {pending.map((t) => (
                    <li
                      key={t.id}
                      className="border p-3 rounded-lg bg-yellow-50 border-yellow-200"
                    >
                      <p className="font-medium">{t.course}</p>
                      <p>₦{t.amount}</p>
                      <p className="text-gray-700">👤 {t.username}</p>
                      <p className="text-gray-700">🎓 {t.schoolId}</p>
                      <p className="text-gray-700">🏦 {t.bankName}</p>
                      <p className="text-gray-500 text-xs">{t.date}</p>
                      <span className="text-yellow-600 font-semibold">
                        Pending...
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  No pending transactions.
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}