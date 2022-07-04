import esbuild from "esbuild";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const watchMode = args.watch != null;
console.log(`Watchmode: ${watchMode}`);

esbuild.build({
  nodePaths: ["node_modules"],
  entryPoints: ["src-app/app.tsx"],
  bundle: true,
  sourcemap: true,
  outfile: "public/js/bundle.js",
  watch: watchMode,
});
