import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
}

export default function FeatureCard({ icon, title }: FeatureCardProps) {
  return (
    <div className="bg-[#1C2128] hover:bg-[#21262D] transition rounded-2xl p-6 flex flex-col items-center text-center text-gray-300 cursor-pointer shadow-md">
      <div className="text-blue-400 mb-3">{icon}</div>
      <h3 className="text-sm font-semibold">{title}</h3>
    </div>
  );
}