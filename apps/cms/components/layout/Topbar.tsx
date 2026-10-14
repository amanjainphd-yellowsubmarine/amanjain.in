function siteOrigin() {
  if (typeof window === "undefined") return "http://localhost:3000";
  const host = window.location.hostname;
  const port = window.location.port;
  if ((host === "localhost" || host === "127.0.0.1") && port === "3001") return "http://localhost:3000";
  if (host.startsWith("cms.")) return `${window.location.protocol}//${host.slice(4)}`;
  return window.location.origin;
}

export function Topbar({ title, hint }: { title: string; hint?: string }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-line bg-white/90 px-6 py-4 backdrop-blur">
      <div className="min-w-0">
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        {hint ? <p className="mt-0.5 text-sm text-muted">{hint}</p> : null}
      </div>
      <a
        href={siteOrigin()}
        className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-accent"
        target="_blank"
        rel="noreferrer"
      >
        View website
      </a>
    </header>
  );
}
