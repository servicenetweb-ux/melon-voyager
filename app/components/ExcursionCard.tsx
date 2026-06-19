type ExcursionCardProps = {
  image?: string | null;
  title: string;
  href: string;
  availableDays?: string | null;
  departureTime?: string | null;
  categoryName?: string | null;
};

export default function ExcursionCard({
  image,
  title,
  href,
  availableDays,
  departureTime,
  categoryName,
}: ExcursionCardProps) {
  return (
    <a
      href={href}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="h-60 overflow-hidden bg-sky-100">
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
      <div className="min-h-44 p-5">
        {categoryName ? (
          <p className="mb-2 text-xs font-bold uppercase text-cyan-700">
            {categoryName}
          </p>
        ) : null}
        <h3 className="text-xl font-black text-sky-950">{title}</h3>
        <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600">
          {availableDays ? <p>Days: {availableDays}</p> : null}
          {departureTime ? <p>Dep. Time: {departureTime}</p> : null}
        </div>
      </div>
    </a>
  );
}
