import { NextResponse } from "next/server";
import { writePublicImage } from "@/lib/header-files";

const imageTypes: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "image/x-icon": ".ico",
  "image/vnd.microsoft.icon": ".ico",
};

function publicHttps(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    const host = parsed.hostname.toLowerCase();
    if (!host || host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return false;
    if (host === "127.0.0.1" || host === "0.0.0.0" || host.startsWith("10.") || host.startsWith("192.168.") || host.startsWith("169.254.")) return false;
    return true;
  } catch {
    return false;
  }
}

async function readRemote(url: string, maxBytes: number) {
  if (!publicHttps(url)) return null;
  const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000) });
  if (!response.ok || !publicHttps(response.url)) return null;
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length > maxBytes) return null;
  return { bytes, type: response.headers.get("content-type")?.split(";")[0]?.trim() ?? "" };
}

async function saveRemote(url: string, prefix: string) {
  const file = await readRemote(url, 2_000_000);
  if (!file) return null;
  const extension = imageTypes[file.type];
  if (!extension) return null;
  if (file.type === "image/svg+xml" && file.bytes.length > 500_000) return null;
  const filename = `${prefix}-${Date.now().toString(36)}${extension}`;
  writePublicImage(filename, file.bytes);
  return `/images/uploads/${filename}`;
}

function linkedinVanity(url: string) {
  const match = url.match(/linkedin\.com\/in\/([A-Za-z0-9\-_%]+)/i);
  return match?.[1] ? decodeURIComponent(match[1]) : "";
}

function profileName(title: string) {
  const match = title.match(/^(.+?)\s[-–—|]/u);
  return match?.[1]?.trim() ?? "";
}

async function companyDomains(company: string) {
  const trimmed = company.trim();
  if (!trimmed) return [];
  const suggestFile = await readRemote(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(trimmed)}`, 200_000);
  const rows = suggestFile ? (JSON.parse(suggestFile.bytes.toString("utf8")) as { name?: string; domain?: string }[]) : [];
  const tokens = trimmed.toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length >= 2);
  return rows
    .flatMap((row) => {
      const domain = row.domain?.toLowerCase() ?? "";
      if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) return [];
      let score = 0;
      const name = (row.name ?? "").toLowerCase();
      for (const token of tokens) {
        if (domain.includes(token) || name.includes(token)) score += 3;
      }
      if (domain.includes("village") || domain.includes("review") || domain.includes("blog")) score -= 4;
      score -= domain.split(".").length;
      return [{ domain, score, length: domain.length }];
    })
    .sort((a, b) => b.score - a.score || a.length - b.length)
    .map((item) => item.domain);
}

function profileCompany(title: string, description: string) {
  const titled = title.match(/^(.+?)\s[-–—]\s(.+?)\s\|\s*LinkedIn/u);
  if (titled?.[2]) return titled[2].trim();
  const experienced = description.match(/Experience:\s*([^·|]+)/u);
  return experienced?.[1]?.trim() ?? "";
}

export async function POST(request: Request) {
  const body = (await request.json()) as { url?: string };
  const url = body.url?.trim() ?? "";
  if (!publicHttps(url)) {
    return NextResponse.json({ error: "Paste a full profile link, starting with https://" }, { status: 400 });
  }
  const metaFile = await readRemote(`https://api.microlink.io/?url=${encodeURIComponent(url)}`, 500_000);
  const meta = metaFile ? (JSON.parse(metaFile.bytes.toString("utf8")) as { status?: string; data?: { image?: { url?: string }; title?: string; description?: string } }) : null;
  const imageUrl = meta?.status === "success" ? meta.data?.image?.url ?? "" : "";
  const linkedinPhoto = linkedinVanity(url) ? `https://unavatar.io/linkedin/${encodeURIComponent(linkedinVanity(url))}` : "";
  const photo = (imageUrl ? await saveRemote(imageUrl, "profile") : null) ?? (linkedinPhoto ? await saveRemote(linkedinPhoto, "profile") : null);
  if (!photo) {
    return NextResponse.json({ error: "Could not download a photo from that profile." }, { status: 400 });
  }
  const title = meta?.status === "success" ? meta.data?.title ?? "" : "";
  const description = meta?.status === "success" ? meta.data?.description ?? "" : "";
  const name = profileName(title);
  const company = profileCompany(title, description);
  let logo: string | null = null;
  const domains = await companyDomains(company);
  for (const domain of domains) {
    const siteFile = await readRemote(`https://api.microlink.io/?url=${encodeURIComponent(`https://${domain}`)}&filter=logo`, 200_000);
    const site = siteFile ? (JSON.parse(siteFile.bytes.toString("utf8")) as { data?: { logo?: { url?: string } } }) : null;
    const logoUrl = site?.data?.logo?.url ?? "";
    if (logoUrl && !logoUrl.includes("licdn.com")) {
      logo = await saveRemote(logoUrl, "logo");
      if (logo) break;
    }
  }
  if (!logo && domains[0]) {
    logo = await saveRemote(`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domains[0])}&sz=128`, "logo");
  }
  return NextResponse.json({ photo, logo, name, company });
}
