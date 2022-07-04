import esbuild from "esbuild";

esbuild.build({
  nodePaths: ["node_modules"],
  entryPoints: ["./src-service/service.ts"],
  bundle: true,
  platform: "node",
  external: ["fsevents", "node-hid", "serialport"],
  outdir: ".build",
});
