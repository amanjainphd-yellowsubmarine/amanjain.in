export async function logOut() {
  await fetch("/api/logout", { method: "POST" }).catch(() => null);
  window.location.href = "/login";
}
