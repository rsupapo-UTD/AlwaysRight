const CHUNK_PUBLIC_PATH = "server/pages/analytics.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__afe5d3._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_49007e._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_8e106b._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_d1d7f0._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_be7207._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/analytics.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
