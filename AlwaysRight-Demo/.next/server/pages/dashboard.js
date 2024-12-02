const CHUNK_PUBLIC_PATH = "server/pages/dashboard.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__60d4f6._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_f5c50d._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_0c9d94._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_b5bc80._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_9ffd2e._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/dashboard.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
