"use client";

import {
  GraduationCap,
  Zap,
  Cpu,
  Radio,
  Unplug,
  Settings,
  ShieldCheck,
  Activity,
  Lightbulb
} from "lucide-react";

export default function ElectricalEngineeringPage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-[#F1F5F9] rounded-2xl mb-4">
          <GraduationCap className="w-10 h-10 text-[#1E293B]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A]">B.Eng. Electrical/Electronics</h1>
        <p className="text-[#64748B] mt-2 max-w-3xl mx-auto">
          Advancing technology through the study of power systems, telecommunications, 
          and electronic circuitry to power the digital age.
        </p>
      </div>

      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-[#1E293B] mb-6 border-b pb-2">Core Curriculum</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <CourseCard
          icon={<Zap className="w-8 h-8 text-[#1E293B]" />}
          title="Power Systems"
          items={[
            "Electric Power Generation",
            "Transmission & Distribution",
            "High Voltage Engineering",
            "Renewable Energy Systems",
          ]}
        />
        <CourseCard
          icon={<Cpu className="w-8 h-8 text-[#1E293B]" />}
          title="Electronics & Circuits"
          items={[
            "Digital Electronics",
            "Analog Circuit Design",
            "Microprocessor Systems",
            "Semiconductor Devices",
          ]}
        />
        <CourseCard
          icon={<Radio className="w-8 h-8 text-[#1E293B]" />}
          title="Telecommunications"
          items={[
            "Signal Processing",
            "Communication Theory",
            "Wireless & Mobile Comm",
            "Electromagnetic Fields",
          ]}
        />
        <CourseCard
          icon={<Settings className="w-8 h-8 text-[#1E293B]" />}
          title="Control Systems"
          items={[
            "Linear Control Systems",
            "Robotics & Automation",
            "Instrumentation",
            "Feedback Systems",
          ]}
        />
        <CourseCard
          icon={<Activity className="w-8 h-8 text-[#1E293B]" />}
          title="Computing & Math"
          items={[
            "Engineering Mathematics",
            "Embedded Systems",
            "C++ for Engineers",
            "Numerical Analysis",
          ]}
        />
        <CourseCard
          icon={<Unplug className="w-8 h-8 text-[#1E293B]" />}
          title="Design & Safety"
          items={[
            "Electrical Installation",
            "Engineering Ethics",
            "Project Management",
            "Circuit Simulation (MATLAB)",
          ]}
        />
      </div>

      {/* Industry relevance */}
      <div className="bg-[#F8FAFC] p-8 rounded-xl border border-[#E2E8F0]">
        <h2 className="text-2xl font-semibold text-[#0F172A] mb-6">Specialization Areas</h2>
        <div className="grid md:grid-cols-2 gap-8 text-[#64748B]">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#1E293B] shrink-0" />
            <p><strong>Power Engineering:</strong> Designing stable grids and sustainable energy solutions.</p>
          </div>
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-[#1E293B] shrink-0" />
            <p><strong>Embedded Systems:</strong> Developing hardware/software for IoT and smart devices.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] hover:border-[#1E293B] transition-all duration-300 shadow-sm flex flex-col group">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#F8FAFC] rounded-lg group-hover:bg-[#1E293B] group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="font-bold text-lg text-[#0F172A]">{title}</h3>
      </div>
      <ul className="list-disc ml-6 space-y-1 text-[#64748B] text-sm">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}