const CHUNK_PUBLIC_PATH = "server/pages/api/test-connection.js";
const runtime = require("../../chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/[root of the server]__fec642._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/src/pages/api/test-connection.ts [api] (ecmascript)\" } [api] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
