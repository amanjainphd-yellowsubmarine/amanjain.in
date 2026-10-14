import * as esbuild from "esbuild";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const hosting = path.join(root, "hosting");

function aliasPlugin(appRoot) {
  return {
    name: "at-alias",
    setup(build) {
      build.onResolve({ filter: /^@\// }, (args) => {
        const base = path.join(appRoot, args.path.slice(2));
        const extensions = [".tsx", ".ts", ".jsx", ".js"];
        for (const extension of extensions) {
          if (fs.existsSync(base + extension)) return { path: base + extension };
        }
        for (const extension of extensions) {
          const index = path.join(base, "index" + extension);
          if (fs.existsSync(index)) return { path: index };
        }
        return { path: base };
      });
    },
  };
}

const shims = path.join(root, "php/shims");
const shared = {
  bundle: true,
  format: "esm",
  jsx: "automatic",
  minify: true,
  legalComments: "none",
  target: "es2020",
  define: { "process.env.NODE_ENV": '"production"' },
  alias: {
    "next/link": path.join(shims, "link.tsx"),
    "next/image": path.join(shims, "image.tsx"),
    "next/font/google": path.join(shims, "font.ts"),
    "next/navigation": path.join(shims, "navigation.tsx"),
    "next/server": path.join(shims, "server.ts"),
  },
};

fs.mkdirSync(path.join(hosting, "assets"), { recursive: true });

await esbuild.build({
  ...shared,
  splitting: true,
  absWorkingDir: root,
  entryPoints: [path.join(root, "php/src/site.tsx")],
  outdir: path.join(hosting, "assets"),
  entryNames: "[name]",
  chunkNames: "chunks/[name]-[hash]",
  plugins: [aliasPlugin(path.join(root, "apps/website"))],
  nodePaths: [path.join(root, "apps/website/node_modules")],
});

await esbuild.build({
  ...shared,
  absWorkingDir: root,
  entryPoints: [path.join(root, "php/src/cms.tsx")],
  outfile: path.join(hosting, "assets/cms.js"),
  plugins: [aliasPlugin(path.join(root, "apps/cms"))],
  nodePaths: [path.join(root, "apps/cms/node_modules")],
});

const cli = path.join(root, "node_modules/@tailwindcss/cli/dist/index.mjs");
for (const name of ["site", "cms"]) {
  const result = spawnSync(process.execPath, [cli, "-i", path.join(root, `php/src/${name}.css`), "-o", path.join(hosting, `assets/${name}.css`)], {
    cwd: root,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

fs.cpSync(path.join(root, "content"), path.join(hosting, "storage/content"), { recursive: true });
fs.cpSync(path.join(root, "apps/website/public"), hosting, { recursive: true });
console.log("PHP site built in hosting/");
