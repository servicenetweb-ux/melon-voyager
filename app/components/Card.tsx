export default function Card({
  image,
  title,
  text,
  href,
}: {
  image?: string | null;
  title: string;
  text?: string | null;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="h-56 overflow-hidden bg-sky-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm font-bold text-sky-700">
            No image
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-sky-950">{title}</h3>
        <p className="mt-3 line-clamp-3 text-slate-600">{text}</p>
        <span className="mt-5 inline-block font-bold text-cyan-600">
          See more
        </span>
      </div>
    </a>
  );
}
