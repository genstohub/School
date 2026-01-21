"use client";

// Renamed the import slightly or just keep it if you plan to use shadcn cards later, 
// but for this specific design, we will use our custom 'CourseCard' below.
import {
  GraduationCap,
  Cpu,
  Database,
  Lock,
  Code2,
  Terminal,
  Layers,
  Briefcase,
  Share2,
} from "lucide-react";

export default function ComputerSciencePage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <GraduationCap className="w-16 h-16 mx-auto text-cyan-600" />
        <h1 className="text-3xl font-bold mt-4 text-slate-900">B.Sc. Computer Science</h1>
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
          Computer Science is the study of computation, automation, and information. 
          The program balances hardware architecture with advanced software engineering 
          and algorithmic theory to prepare students for the digital frontier.
        </p>
      </div>

      



      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-cyan-800 mb-6">Core Components</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <CourseCard
          icon={<Code2 className="w-8 h-8 text-cyan-600" />}
          title="Software Engineering"
          items={[
            "Object-Oriented Programming (Java, C++)",
            "Software Architecture & Design Patterns",
            "Mobile & Web App Development",
            "Software Testing & Quality Assurance",
          ]}
        />
        <CourseCard
          icon={<Layers className="w-8 h-8 text-blue-600" />}
          title="Theory & Algorithms"
          items={[
            "Data Structures & Algorithms",
            "Theory of Computation",
            "Compiler Construction",
            "Discrete Mathematics",
          ]}
        />
        <CourseCard
          icon={<Database className="w-8 h-8 text-indigo-600" />}
          title="Data Management"
          items={[
            "Relational Databases (SQL)",
            "NoSQL & Big Data Systems",
            "Data Mining & Warehousing",
            "Information Retrieval",
          ]}
        />
        <CourseCard
          icon={<Cpu className="w-8 h-8 text-slate-700" />}
          title="Systems & Architecture"
          items={[
            "Computer Organization",
            "Operating Systems Design",
            "Embedded Systems",
            "Digital Logic Design",
          ]}
        />
        <CourseCard
          icon={<Share2 className="w-8 h-8 text-emerald-600" />}
          title="Artificial Intelligence"
          items={[
            "Machine Learning & Neural Networks",
            "Natural Language Processing",
            "Computer Vision",
            "Expert Systems",
          ]}
        />
        <CourseCard
          icon={<Lock className="w-8 h-8 text-red-600" />}
          title="Security & Networks"
          items={[
            "Cryptography & Cyber Security",
            "Computer Networks & Protocols",
            "Cloud Computing Architecture",
            "Ethical Hacking",
          ]}
        />
        <CourseCard
          icon={<Terminal className="w-8 h-8 text-gray-600" />}
          title="Computational Tools"
          items={[
            "Unix/Linux Systems Programming",
            "Numerical Analysis",
            "Human-Computer Interaction (HCI)",
          ]}
        />
        <CourseCard
          icon={<Briefcase className="w-8 h-8 text-slate-500" />}
          title="Industry Readiness"
          items={[
            "IT Project Management",
            "SIWES (Industrial Attachment)",
            "Final Year Capstone Project",
          ]}
        />
      </div>

      {/* Applications Section */}
      <div className="bg-slate-900 text-slate-100 p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-6">Career Ecosystem</h2>
        <div className="grid md:grid-cols-2 gap-8 text-slate-300">
          <div>
            <h3 className="font-semibold text-white">Full-Stack Development</h3>
            <p className="text-sm mt-1">Building scalable web and mobile infrastructures for global tech firms and startups.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Cybersecurity & Defense</h3>
            <p className="text-sm mt-1">Protecting organizational assets through advanced encryption and threat detection.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Data Science & AI</h3>
            <p className="text-sm mt-1">Harnessing big data to build predictive models and automated decision systems.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Cloud Engineering</h3>
            <p className="text-sm mt-1">Managing distributed systems and virtualized infrastructure via AWS, Azure, or GCP.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Renamed locally to CourseCard to avoid conflict with shadcn/ui Card
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
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-50 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
      </div>
      <ul className="list-disc ml-6 text-gray-700 space-y-1 text-sm">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}