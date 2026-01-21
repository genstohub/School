"use client";

import {
  GraduationCap,
  HardHat,
  Ruler,
  Building2,
  Droplets,
  Truck,
  ShieldCheck,
  Map,
  Briefcase,
} from "lucide-react";

export default function CivilEngineeringPage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-[#F1F5F9] rounded-2xl mb-4">
          <GraduationCap className="w-10 h-10 text-[#1E293B]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A]">B.Eng Civil Engineering</h1>
        <p className="text-[#64748B] mt-2 max-w-3xl mx-auto">
          Training professionals to design and manage the infrastructure of modern 
          civilization—from skyscrapers and bridges to water treatment and transport systems.
        </p>
      </div>

      

      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-[#1E293B] mb-6 border-b pb-2">Core Curriculum</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <CourseCard
          icon={<Building2 className="w-8 h-8 text-[#1a4385]" />}
          title="Structural Analysis"
          items={[
            "Theory of Structures",
            "Design of Reinforced Concrete",
            "Steel and Timber Design",
            "Structural Mechanics",
          ]}
        />
        <CourseCard
          icon={<Map className="w-8 h-8 text-[#1a4385]" />}
          title="Geotechnical Engineering"
          items={[
            "Soil Mechanics",
            "Foundation Engineering",
            "Engineering Geology",
            "Rock Mechanics",
          ]}
        />
        <CourseCard
          icon={<Droplets className="w-8 h-8 text-[#1a4385]" />}
          title="Water & Environmental"
          items={[
            "Fluid Mechanics",
            "Hydrology & Water Resources",
            "Environmental Engineering",
            "Sanitary Engineering",
          ]}
        />
        <CourseCard
          icon={<Truck className="w-8 h-8 text-[#1a4385]" />}
          title="Transportation"
          items={[
            "Highway Engineering",
            "Traffic Engineering",
            "Railway and Airport Engineering",
            "Pavement Design",
          ]}
        />
        <CourseCard
          icon={<Ruler className="w-8 h-8 text-[#1a4385]" />}
          title="Surveying & Geomatics"
          items={[
            "Land Surveying",
            "GIS & Remote Sensing",
            "Engineering Mathematics",
            "AutoCAD & BIM",
          ]}
        />
        <CourseCard
          icon={<Briefcase className="w-8 h-8 text-[#1a4385]" />}
          title="Management & Law"
          items={[
            "Construction Management",
            "Civil Engineering Law",
            "Quantity Surveying basics",
            "Project Finance",
          ]}
        />
      </div>

      {/* Professional Applications */}
      <div className="bg-[#F8FAFC] p-8 rounded-xl border border-[#E2E8F0]">
        <h2 className="text-2xl font-semibold text-[#0F172A] mb-6">Career Paths</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ul className="space-y-3 text-[#64748B]">
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1E293B] mt-1" />
              <span><strong>Structural Engineer:</strong> Designing safe, load-bearing frames.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1E293B] mt-1" />
              <span><strong>Project Manager:</strong> Overseeing construction sites and budgets.</span>
            </li>
          </ul>
          <ul className="space-y-3 text-[#64748B]">
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1E293B] mt-1" />
              <span><strong>Urban Planner:</strong> Designing city layouts and infrastructure.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1E293B] mt-1" />
              <span><strong>Environmental Consultant:</strong> Managing water and waste systems.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Fixed: Added the missing CourseCard component definition
function CourseCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] hover:border-[#1E293B] transition-all duration-300 shadow-sm flex flex-col group">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#F8FAFC] rounded-lg group-hover:bg-[#cdd4de] group-hover:text-white transition-colors duration-300">
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