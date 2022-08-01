const glob = require("tiny-glob");
const { build } = require("esbuild");
const { envPlugin } = require("./envPlugin");

(async () => {
  const entryPoints = await glob("./app/javascript/*.*");
  await build({
    entryPoints,
    bundle: true,
    sourcemap: true,
    outdir: "app/assets/builds",
    plugins: [envPlugin],
    loader: { ".js": "jsx" },
    watch: process.argv.some((x) => x === "--watch"),
  });
})();
