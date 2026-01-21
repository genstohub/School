"use client";

import {
  GraduationCap,
  Settings,
  Zap,
  Flame,
  Wrench,
  Cpu,
  PenTool,
  Factory,
  Briefcase,
  Compass,
} from "lucide-react";

export default function MechanicalEngineeringPage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <GraduationCap className="w-16 h-16 mx-auto text-slate-700" />
        <h1 className="text-3xl font-bold mt-4 text-slate-900">B.Eng. Mechanical Engineering</h1>
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
          Mechanical Engineering involves the design, analysis, manufacturing, and 
          maintenance of mechanical systems. It combines physics and mathematics 
          principles with material science to create everything from micro-scale 
          sensors to massive spacecraft.
        </p>
      </div>

      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">
        Core Components
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card
          icon={<Compass className="w-8 h-8 text-blue-600" />}
          title="Engineering Mechanics"
          items={[
            "Statics & Dynamics",
            "Strength of Materials",
            "Kinematics of Machinery",
            "Mechanisms and Robotics",
          ]}
        />
        <Card
          icon={<Flame className="w-8 h-8 text-orange-600" />}
          title="Thermal & Fluid Sciences"
          items={[
            "Thermodynamics (Applied & Classical)",
            "Fluid Mechanics & Hydraulics",
            "Heat and Mass Transfer",
            "Internal Combustion Engines",
          ]}
        />
        <Card
          icon={<Settings className="w-8 h-8 text-slate-600" />}
          title="Design & Manufacturing"
          items={[
            "Machine Design & Component Analysis",
            "Manufacturing Processes & Workshop Technology",
            "CAD/CAM/CAE Systems",
            "Materials Science & Metallurgy",
          ]}
        />
        <Card
          icon={<PenTool className="w-8 h-8 text-indigo-600" />}
          title="Engineering Drawing"
          items={[
            "Technical Drawing & Sketching",
            "Geometric Dimensioning & Tolerancing (GD&T)",
            "3D Solid Modeling",
            "Assembly Drawings",
          ]}
        />
        <Card
          icon={<Zap className="w-8 h-8 text-yellow-600" />}
          title="Energy & Power Systems"
          items={[
            "Power Plant Engineering",
            "Renewable Energy Systems (Solar, Wind)",
            "Refrigeration & Air Conditioning (HVAC)",
            "Turbo-machinery",
          ]}
        />
        <Card
          icon={<Cpu className="w-8 h-8 text-emerald-600" />}
          title="Control & Mechatronics"
          items={[
            "Control Theory & Automation",
            "Instrumentation and Measurement",
            "Microprocessors in Mech Systems",
            "Hydraulic & Pneumatic Controls",
          ]}
        />
        <Card
          icon={<Factory className="w-8 h-8 text-red-700" />}
          title="Industrial Engineering"
          items={[
            "Operations Research",
            "Production Planning & Control",
            "Quality Assurance & Reliability",
            "Maintenance Engineering",
          ]}
        />
        <Card
          icon={<Briefcase className="w-8 h-8 text-gray-600" />}
          title="Professional Practice"
          items={[
            "Engineering Ethics & Law",
            "Project Management & Economics",
            "Industrial Training (SIWES)",
            "Final Year Research Project",
          ]}
        />
      </div>

      {/* Applications */}
      <div className="bg-slate-50 p-8 rounded-xl shadow border border-slate-200">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Industries & Career Paths
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h3 className="font-semibold text-blue-700">Automotive & Aerospace</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Vehicle design and aerodynamics</li>
              <li>Aircraft propulsion and structure</li>
              <li>Autonomous driving systems</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-700">Energy & Utilities</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Oil and Gas exploration/refining</li>
              <li>Nuclear and Thermal power plants</li>
              <li>Sustainable energy consulting</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-700">Manufacturing & Robotics</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Automated assembly lines</li>
              <li>Consumer electronics packaging</li>
              <li>Precision tooling and CNC machining</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-700">Bio-Mechanical Engineering</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Prosthetics and medical devices</li>
              <li>Biomechanical modeling of human joints</li>
              <li>Hospital equipment maintenance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Closing */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">
          Why Choose Mechanical Engineering?
        </h3>
        <p className="text-gray-700 mt-2">
          As one of the broadest engineering disciplines, Mechanical Engineering offers 
          unparalleled flexibility. Graduates are the &quot;builders of the world,&quot; 
          transforming abstract ideas into functional products. Whether it&apos;s 
          tackling climate change with clean energy or advancing healthcare with 
          surgical robots, mechanical engineers are at the forefront of technological 
          evolution.
        </p>
      </div>
    </div>
  );
}

/* Reusable Card Component */
function Card({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-50">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
      </div>
      <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}