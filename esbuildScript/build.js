const glob = require("tiny-glob");
const { context } = require("esbuild");
const { envPlugin } = require("./envPlugin");

(async () => {
  const entryPoints = await glob("./app/javascript/*.*");
  const ctx = await context({
    entryPoints,
    bundle: true,
    sourcemap: true,
    outdir: "app/assets/builds",
    plugins: [envPlugin],
    loader: { ".js": "jsx" },
  });

  if(process.argv.some((x) => x === "--watch")) {
    await ctx.watch();
  }
  await ctx.serve();
})();
