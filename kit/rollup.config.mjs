import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
// import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import postcss from "rollup-plugin-postcss";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "ui/index.ts",
    output: {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    external: Object.keys(packageJson.peerDependencies ?? {}),
  },
  {
    input: "ui/index.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    plugins: [dts.default()],
  },
];
