import fs from "node:fs";
import path from "node:path";

export function writeLogoFile(filename: string, bytes: Buffer) {
  writePublicImage(filename, bytes, "");
}

export function writePublicImage(filename: string, bytes: Buffer, folder = "uploads") {
  const apps = path.join(process.cwd(), "..");
  const relative = folder ? path.join("images", folder) : "images";
  for (const appName of ["website", "cms"]) {
    const directory = path.join(apps, appName, "public", relative);
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, filename), bytes);
  }
}
