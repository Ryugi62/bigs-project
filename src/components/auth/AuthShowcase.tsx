export default function AuthShowcase({
  title,
  subtitle,
  highlights,
}: {
  title: string;
  subtitle: string;
  highlights: Array<{ title: string; description: string }>;
}) {
  return (
    <aside className="hidden w-full max-w-[460px] flex-col justify-evenly rounded-[32px] backdrop-blur lg:flex">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
          BIGS PAYMENTS
        </p>
        <h1 className="text-4xl font-bold leading-tight text-white">{title}</h1>
        <p className="text-base text-white/80">{subtitle}</p>
      </div>
      <ul className="space-y-5">
        {highlights.map((item) => (
          <li key={item.title} className="rounded-2xl border border-white/15 bg-white/8 p-5">
            <p className="text-lg font-semibold text-white">{item.title}</p>
            <p className="text-sm text-white/70">{item.description}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
