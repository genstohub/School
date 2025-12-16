import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
        mt-8
        flex
        items-start                 /* 👈 mobile: no vertical centering */
        sm:items-center             /* 👈 tablet+ center */
        justify-center
        bg-slate-50
        px-4 sm:px-6 lg:px-12
        pt-16 pb-8                  /* 👈 mobile spacing control */
        sm:min-h-screen             /* 👈 only tablet & desktop */
      "
    >
      <div className="relative w-full max-w-md sm:max-w-xl lg:max-w-4xl overflow-hidden rounded-3xl shadow-2xl">
        
        {/* Background Image */}
        <Image
          src="/images/ChatGPT Image.png"
          alt="Learning and Practice Environment"
          width={1200}
          height={800}
          className="h-[360px] sm:h-[480px] lg:h-[520px] w-full object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-white/85 via-white/50 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 w-full p-5 sm:p-6 lg:p-10 text-gray-900">
          
          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
              Practical Learning
            </h1>

            <span className="text-sm sm:text-base lg:text-lg font-medium text-sky-900">
              Learn • Practice • Apply
            </span>
          </div>

          {/* Description */}
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
            A modern learning environment designed to help students and professionals
            gain real-world skills through guided practice, projects, and hands-on
            application beyond the classroom.
          </p>

          {/* Focus Areas */}
<div className="mt-4 justify-center flex flex-row gap-1 overflow-x-auto scrollbar-hide">
  <span className="shrink-0 rounded-full bg-sky-500 px-2 py-1 text-xs sm:text-sm whitespace-nowrap">
    Base learning
  </span>

  <span className="shrink-0 rounded-full bg-sky-100 px-2 py-1 text-xs sm:text-sm whitespace-nowrap text-sky-900">
    Practice
  </span>

  <span className="shrink-0 rounded-full bg-sky-500 px-2 py-1 text-xs sm:text-sm whitespace-nowrap">
    Mentorship
  </span>
</div>

      {/* CTA Button */}
<Link href="/sign-up" className="mt-6 inline-block">
  <span
    className="block w-full sm:w-auto rounded-xl bg-white px-6 py-3 text-sm sm:text-base font-semibold text-black transition hover:bg-gray-200 text-center"
  >
    Start Learning
  </span>
</Link>
        </div>
      </div>
    </section>
  );
}