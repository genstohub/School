import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: "down" | "up"; // default is down
}

export default function DiagonalSection({ children, direction = "down" }: Props) {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-r from-sky-50 to-sky-100 -z-10 ${
          direction === "down" ? "clip-diagonal-down" : "clip-diagonal-up"
        }`}
      ></div>
      {children}

      <style jsx>{`
        .clip-diagonal-down {
          clip-path: polygon(0 0, 100% 10%, 100% 100%, 0 90%);
        }
        .clip-diagonal-up {
          clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%);
        }
      `}</style>
    </section>
  );
}