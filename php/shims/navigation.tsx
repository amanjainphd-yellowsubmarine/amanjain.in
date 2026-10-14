import { useEffect, useState } from "react";

export function usePathname() {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  return path;
}

export function useRouter() {
  return {
    push(href: string) {
      window.location.href = href;
    },
    replace(href: string) {
      window.location.replace(href);
    },
  };
}

export function notFound() {
  return null;
}
