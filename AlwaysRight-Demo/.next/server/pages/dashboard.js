const CHUNK_PUBLIC_PATH = "server/pages/dashboard.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_f5c50d._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_d2b7ad._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_8ec771._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_149c2e._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__5c02a9._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/dashboard.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
