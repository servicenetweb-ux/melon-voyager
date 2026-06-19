import type { ReactNode } from "react";

type SiteBackgroundProps = {
  image?: string | null;
  children: ReactNode;
  className?: string;
};

export default function SiteBackground({
  image,
  children,
  className = "",
}: SiteBackgroundProps) {
  return (
    <section
      className={`px-5 py-20 bg-slate-50 ${className}`}
      style={
        image
          ? {
              backgroundImage: `linear-gradient(rgba(255,255,255,.42), rgba(255,255,255,.50)), url(${image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {children}
    </section>
  );
}
