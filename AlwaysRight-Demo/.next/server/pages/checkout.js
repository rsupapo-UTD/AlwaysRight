const CHUNK_PUBLIC_PATH = "server/pages/checkout.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_30802e._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__f4e02f._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/analytics [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
