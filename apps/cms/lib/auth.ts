import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "cms_session";

const SECRET = "a6f219926620691665ce5a06fa2ee008faa966093499476055d93c9bfc58bec2";
const DUMMY_HASH = "4d5ec86543dd881a53562b5971179135:d96a34b15e536511e48de472df1daa4af36c7642843c3fad6cb88eb7684becf0";

const admins = [
  {
    email: "govindsawarnguru@gmail.com",
    passwordHash: "e86c1445c4a0ba9edce15383e5cc27d0:781dea63ac7f307eacb5a1b2bcdbfdafee7025a8fb7227bdc7834d304ddfcfc6",
  },
  {
    email: "jainimpactlabs@gmail.com",
    passwordHash: "77cda9f9a933300e3838cfcc12134b19:2f82a55c2f0f24afdd085da03a30f36dbbb0c54108b5ec28c6c97165a4fda167",
  },
];

function verifyPassword(password: string, stored: string) {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const actual = scryptSync(password, salt, 32);
  const expected = Buffer.from(key, "hex");
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

export function checkAdmin(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  const admin = admins.find((item) => item.email === normalized);
  const matches = verifyPassword(password, admin?.passwordHash ?? DUMMY_HASH);
  return matches && admin ? admin.email : null;
}

export function createSession(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + 1000 * 60 * 60 * 18 })).toString("base64url");
  const signature = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function readSession(token: string | undefined) {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", SECRET).update(payload).digest("base64url");
  const actual = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  if (actual.length !== wanted.length || !timingSafeEqual(actual, wanted)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { email?: unknown; exp?: unknown };
    if (typeof data.email !== "string" || typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data.email;
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 18,
  };
}
