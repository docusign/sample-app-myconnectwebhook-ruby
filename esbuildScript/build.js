const glob = require("tiny-glob");
const { build, context } = require("esbuild");
const { envPlugin } = require("./envPlugin");

(async () => {
  const entryPoints = await glob("./app/javascript/*.*");
  const options = {
    entryPoints,
    bundle: true,
    sourcemap: true,
    outdir: "app/assets/builds",
    plugins: [envPlugin],
    loader: { ".js": "jsx" }
  };

  if (process.argv.some((x) => x === "--watch")) {
    const ctx = await context(options);
    await ctx.watch();
    console.log("Watching for changes...");
  } else {
    await build(options);
    console.log("Build complete.");
  }
})();