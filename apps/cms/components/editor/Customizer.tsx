"use client";

import { Children, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/tab-session";

function siteOrigin() {
  if (typeof window === "undefined") return "http://localhost:3000";
  const host = window.location.hostname;
  const port = window.location.port;
  if ((host === "localhost" || host === "127.0.0.1") && port === "3001") return "http://localhost:3000";
  if (host.startsWith("cms.")) return `${window.location.protocol}//${host.slice(4)}`;
  return window.location.origin;
}

const SITE = siteOrigin();

function panelId(child: ReactNode) {
  if (!isValidElement(child)) return "";
  const props = child.props as { "data-panel"?: string; id?: string };
  return props["data-panel"] || props.id || "";
}

export function Customizer({
  backHref,
  title,
  sections,
  open,
  onOpen,
  previewPath,
  status,
  saving,
  onSubmit,
  children,
}: {
  backHref: string;
  title: string;
  sections: { id: string; label: string }[];
  open: string | null;
  onOpen: (id: string | null) => void;
  previewPath: string;
  status: string;
  saving: boolean;
  onSubmit: (event: React.FormEvent) => void;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const openRef = useRef(open);
  const sectionsRef = useRef(sections);
  const onOpenRef = useRef(onOpen);
  sectionsRef.current = sections;
  onOpenRef.current = onOpen;
  const [device, setDevice] = useState<"desktop" | "tablet" | "phone">("desktop");
  const [previewKey, setPreviewKey] = useState(0);
  const savedRef = useRef("");
  openRef.current = open;

  useEffect(() => {
    if (status.toLowerCase().startsWith("saved") && status !== savedRef.current) {
      savedRef.current = status;
      setPreviewKey((value) => value + 1);
    }
    if (!status.toLowerCase().startsWith("saved")) savedRef.current = "";
  }, [status]);

  function focusPreview(id: string | null) {
    frameRef.current?.contentWindow?.postMessage({ source: "aman-cms", id }, SITE);
  }

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== SITE) return;
      if (event.data?.source !== "aman-site") return;
      if (event.data.type === "ready") {
        focusPreview(openRef.current);
        return;
      }
      const id = event.data.id;
      if (typeof id !== "string") return;
      if (sectionsRef.current.some((section) => section.id === id)) {
        onOpenRef.current(id);
        return;
      }
      if (id === "header") router.push("/header");
      if (id === "footer") router.push("/settings");
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  useEffect(() => {
    focusPreview(open);
  }, [open, previewKey]);

  const current = sections.find((section) => section.id === open);
  const frameWidth = device === "phone" ? 390 : device === "tablet" ? 768 : "100%";
  const saved = status.toLowerCase().startsWith("saved");

  const fields = open ? Children.toArray(children).filter((child) => panelId(child) === open) : null;

  return (
    <div className="fixed inset-0 z-50 flex bg-[#f0f0f1] text-[#1d2327]">
      <form autoComplete="off" onSubmit={onSubmit} className="flex h-full w-[340px] shrink-0 flex-col border-r border-[#dcdcde] bg-white">
        <div className="flex items-center gap-3 border-b border-[#dcdcde] px-4 py-3">
          <a href={backHref} className="grid h-8 w-8 place-items-center rounded-full text-lg text-[#1d2327] hover:bg-[#f0f0f1]" aria-label="Back">
            ←
          </a>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{title}</p>
            <p className="text-xs text-[#646970]">Click the matching part on the page</p>
          </div>
          <button type="button" onClick={() => void logOut()} className="shrink-0 text-xs font-semibold text-[#646970] hover:text-[#1d2327]">
            Log out
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {current ? (
            <button type="button" onClick={() => onOpen(null)} className="flex w-full items-center gap-2 border-b border-[#dcdcde] px-4 py-3 text-left text-sm font-semibold hover:bg-[#f6f7f7]">
              <span aria-hidden="true">‹</span>
              {current.label}
            </button>
          ) : (
            <ul>
              {sections.map((section) => (
                <li key={section.id} className="border-b border-[#dcdcde]">
                  <button type="button" onClick={() => onOpen(section.id)} className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-[#f6f7f7]">
                    {section.label}
                    <span aria-hidden="true" className="text-[#8c8f94]">›</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className={current ? "grid gap-4 px-4 py-4" : "hidden"}>
            {fields}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 border-t border-[#dcdcde] bg-white px-4 py-3">
          <button type="submit" disabled={saving} className="rounded-full bg-[#6d5ce7] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {saving ? "Saving..." : "Save"}
          </button>
          <p className={`text-xs leading-5 ${saved ? "font-medium text-emerald-700" : "text-[#646970]"}`}>
            {status || "Save, then the page on the right updates."}
          </p>
        </div>
      </form>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center justify-center gap-2 border-b border-[#dcdcde] bg-white">
          {(
            [
              ["desktop", "Desktop"],
              ["tablet", "Tablet"],
              ["phone", "Phone"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setDevice(id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${device === id ? "bg-[#1d2327] text-white" : "text-[#1d2327] hover:bg-[#f0f0f1]"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 justify-center overflow-hidden bg-[#dcdcde] p-3">
          <iframe
            key={previewKey}
            ref={frameRef}
            title="Live website"
            src={`${SITE}${previewPath}${previewPath.includes("?") ? "&" : "?"}preview=1`}
            style={{ width: frameWidth }}
            className="h-full border-0 bg-white shadow"
            onLoad={() => focusPreview(openRef.current)}
          />
        </div>
      </div>
    </div>
  );
}
