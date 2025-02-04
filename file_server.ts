import { serve } from "https://deno.land/std@0.219.0/http/server.ts";
import { extname, join } from "https://deno.land/std@0.219.0/path/mod.ts";

const BASE_DIR = Deno.cwd(); // Current directory
const PORT = 8000;

console.log(`🚀 Server running at: http://localhost:${PORT}`);

serve(async (req) => {
  const url = new URL(req.url);
  let filePath = url.pathname === "/" ? "index.html" : url.pathname.substring(1);
  filePath = join(BASE_DIR, filePath);

  try {
    const file = await Deno.readFile(filePath);
    const contentType = getContentType(filePath);
    return new Response(file, {
      headers: { "content-type": contentType },
    });
  } catch {
    return new Response("404 - Not Found", { status: 404 });
  }
}, { port: PORT });

function getContentType(path: string): string {
  const ext = extname(path);
  return ext === ".html" ? "text/html"
       : ext === ".css" ? "text/css"
       : ext === ".js" ? "application/javascript"
       : ext === ".png" ? "image/png"
       : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg"
       : ext === ".svg" ? "image/svg+xml"
       : ext === ".ttf" ? "font/ttf"
       : "application/octet-stream";
}
