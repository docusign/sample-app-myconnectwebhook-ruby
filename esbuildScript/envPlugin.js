const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const envPlugin = {
  name: "env",
  setup(build) {
    build.onResolve({ filter: /^env$/ }, (args) => ({
      path: args.path,
      namespace: "env-ns",
    }));

    build.onLoad({ filter: /.*/, namespace: "env-ns" }, async () => {
      const data = await fs.promises.readFile(path.resolve("./.env"), "utf8");
      const buf = Buffer.from(data);
      const config = dotenv.parse(buf);
      return {
        contents: JSON.stringify({ ...config, ...process.env }),
        loader: "json",
      };
    });
  },
};

module.exports.envPlugin = envPlugin;
