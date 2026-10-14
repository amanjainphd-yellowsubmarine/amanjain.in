"use client";

import { useEffect } from "react";

function cmsOrigin() {
  if (typeof window === "undefined") return "http://localhost:3001";
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return "http://localhost:3001";
  return window.location.origin;
}

const CMS_ORIGIN = cmsOrigin();

export function PreviewBridge() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("preview") !== "1") return;

    document.documentElement.classList.add("cms-preview");
    const style = document.createElement("style");
    style.textContent = `
      .cms-preview [data-edit] { cursor: pointer; }
      .cms-preview [data-edit].cms-hover { outline: 2px dashed #6d5ce7; outline-offset: -2px; }
      .cms-preview [data-edit].cms-target { outline: 3px solid #6d5ce7; outline-offset: -3px; box-shadow: inset 0 0 0 3px rgba(109, 92, 231, 0.18); }
    `;
    document.head.appendChild(style);

    function mark(id: string | null) {
      document.querySelectorAll(".cms-target").forEach((node) => node.classList.remove("cms-target"));
      if (!id) return;
      const nodes = document.querySelectorAll(`[data-edit="${CSS.escape(id)}"]`);
      nodes.forEach((node) => node.classList.add("cms-target"));
      nodes[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function onMessage(event: MessageEvent) {
      if (event.origin !== CMS_ORIGIN) return;
      if (event.data?.source !== "aman-cms") return;
      mark(typeof event.data.id === "string" ? event.data.id : null);
    }

    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const section = target?.closest("[data-edit]");
      if (!section) return;
      event.preventDefault();
      event.stopPropagation();
      const id = section.getAttribute("data-edit");
      mark(id);
      window.parent.postMessage({ source: "aman-site", id }, CMS_ORIGIN);
    }

    function onMove(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const section = target?.closest("[data-edit]") ?? null;
      document.querySelectorAll(".cms-hover").forEach((node) => {
        if (node !== section) node.classList.remove("cms-hover");
      });
      section?.classList.add("cms-hover");
    }

    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick, true);
    document.addEventListener("mouseover", onMove, true);
    window.parent.postMessage({ source: "aman-site", type: "ready" }, CMS_ORIGIN);

    return () => {
      document.documentElement.classList.remove("cms-preview");
      style.remove();
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("mouseover", onMove, true);
    };
  }, []);

  return null;
}
