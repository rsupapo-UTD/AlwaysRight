const CHUNK_PUBLIC_PATH = "server/pages/settings.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__7d2060._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_23df93._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_602048._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_4b1b99._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_eedd5b._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/settings.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
