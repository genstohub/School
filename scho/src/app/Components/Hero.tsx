import Image from "next/image";



export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-[#014d61] to-[#036c73] px-4 sm:px-6 lg:px-20 py-16 md:py-20 overflow-hidden">
      {/* Multi-layer Animated Waves */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Back wave */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 800"
          preserveAspectRatio="none"
          className="w-[250%] h-full animate-wave-slowest opacity-50"
        >
          <defs>
            <linearGradient id="waveBack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cce7f0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#d13b0eff" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveBack)"
            d="M0 280 Q400 480 800 280 T1600 280 V800 H0 Z"
          />
        </svg>

        {/* Middle wave */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 800"
          preserveAspectRatio="none"
          className="absolute top-0 w-[220%] h-full animate-wave-slow opacity-70"
        >
          <defs>
            <linearGradient id="waveMiddle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bf0dadff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#99d6eb" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveMiddle)"
            d="M0 300 Q400 500 800 300 T1600 300 V800 H0 Z"
          />
        </svg>

        {/* Front wave */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 800"
          preserveAspectRatio="none"
          className="absolute top-0 w-[200%] h-full animate-wave-fast opacity-90"
        >
          <defs>
            <linearGradient id="waveFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d5cb10ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4a9b83ff" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveFront)"
            d="M0 320 Q400 520 800 320 T1600 320 V800 H0 Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-row flex-nowrap items-center gap-4 sm:gap-6 md:gap-10">
        {/* Left: Text */}
        <div className="text-white flex-1 min-w-[140px]">
          <h1 className="text-1xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Learn with Certified Tutors
          </h1>
          <p className="mt-3 xs:mt-4 sm:mt-5 text-xs xs:text-sm sm:text-lg text-gray-800 leading-relaxed">
            We love to study, and so do you. Discover the best online learning
            platform with easy access, study with your coursemate globally.
          </p>

          <div className="mt-4 xs:mt-5 sm:mt-6 flex flex-wrap gap-2 xs:gap-3 sm:gap-4">
            <button className="bg-sky-400 text-white px-4 xs:px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-md hover:bg-sky-500 transition">
              Got Class
            </button>
            <button className="border border-sky-400 text-sky-100 px-4 xs:px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-sky-500 hover:text-white transition">
              Explore Progress
            </button>
          </div>
        </div>

        {/* Right: Image */}
<div className="relative flex justify-center items-center flex-1 min-w-[240px] sm:min-w-[400px] md:min-w-[320px] lg:min-w-[350px] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
  <Image
    src="/images/join-removebg-preview.png"
    alt="A girl you know"
    fill
    priority
    className="object-contain mt-30 sm:mt-10 md:mt-22 lg:mt-28 drop-shadow-2xl"
  />
</div>
      </div>
    </section>
  );
}