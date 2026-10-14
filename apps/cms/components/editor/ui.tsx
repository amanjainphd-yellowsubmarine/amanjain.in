"use client";

export const fieldClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15";

export function ImageButton({
  label,
  accept,
  onPick,
}: {
  label: string;
  accept: string;
  onPick: (file: File) => void;
}) {
  return (
    <label className="relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(109,92,231,0.28)] hover:brightness-110">
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M8 11V3.5M8 3.5 5.5 6M8 3.5 10.5 6M3 12.5h10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
      <input
        type="file"
        accept={accept}
        className="absolute h-px w-px overflow-hidden opacity-0"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onPick(file);
          event.target.value = "";
        }}
      />
    </label>
  );
}

export function MobilePhotoField({
  src,
  onPick,
  description,
}: {
  src?: string;
  onPick: (file: File) => void;
  description?: string;
}) {
  return (
    <div className="flex flex-wrap items-end gap-4 rounded-xl border border-dashed border-line bg-[#f7f8fb] p-3">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-24 w-auto rounded-lg bg-white object-contain" />
      ) : null}
      <div>
        <p className="text-sm font-semibold">Phone photo</p>
        <p className="mb-2 max-w-md text-xs text-muted">
          {description ?? "Shown on phones in the top banner. Upload a clear picture. Leave this empty to use the main photo."}
        </p>
        <ImageButton label={src ? "Change phone photo" : "Upload phone photo"} accept="image/png,image/jpeg,image/webp,image/gif" onPick={onPick} />
      </div>
    </div>
  );
}

export function EditorStatus({ status, saving }: { status: string; saving: boolean }) {
  const saved = status.toLowerCase().startsWith("saved");
  return (
    <div className="sticky bottom-0 z-30 -mx-6 mt-2 flex flex-wrap items-center gap-3 border-t border-line bg-white/95 px-6 py-3 backdrop-blur">
      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(109,92,231,0.28)] disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save"}
      </button>
      <p className={`text-sm ${saved ? "font-medium text-emerald-700" : "text-muted"}`}>
        {status || "The website updates only after you press Save."}
      </p>
    </div>
  );
}
