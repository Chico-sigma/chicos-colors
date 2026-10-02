const http = require("http");
const fs = require("fs");
const path = require("path");
const preferredPort = Number(process.env.PORT) || 3000;
const root = __dirname;
const dataFile = path.join(root, "favorites.json");
const mimeTypes = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp" };
function readFavorites() { try { return JSON.parse(fs.readFileSync(dataFile, "utf8")); } catch (error) { return []; } }
function send(response, status, body, type = "application/json") {
    const isText = type.startsWith("text/") || type === "application/json" || type === "image/svg+xml";
    response.writeHead(status, { "Content-Type": isText ? `${type}; charset=utf-8` : type });
    response.end(type === "application/json" ? JSON.stringify(body) : body);
}

function startServer(port) {
    const server = http.createServer((request, response) => {
        if (request.url === "/api/favorites" && request.method === "GET") return send(response, 200, readFavorites());
        if (request.url === "/api/favorites" && request.method === "PUT") {
            let body = "";
            request.on("data", (chunk) => { body += chunk; });
            request.on("end", () => { try { const favorites = JSON.parse(body).favorites; if (!Array.isArray(favorites)) throw new Error("Invalid favorites"); fs.writeFileSync(dataFile, JSON.stringify(favorites, null, 2)); send(response, 200, favorites); } catch (error) { send(response, 400, { error: "Invalid favorites payload" }); } });
            return;
        }
        let requestedPath;
        try {
            requestedPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
        } catch (error) {
            return send(response, 400, { error: "Invalid path" });
        }
        if (requestedPath === "/") requestedPath = "/index.html";
        if (requestedPath.startsWith("/assets/")) requestedPath = `/public${requestedPath}`;
        const filePath = path.resolve(root, `.${requestedPath}`);
        const relativePath = path.relative(root, filePath);
        if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) return send(response, 403, { error: "Forbidden" });
        fs.readFile(filePath, (error, data) => { if (error) return send(response, 404, { error: "Not found" }); send(response, 200, data, mimeTypes[path.extname(filePath)] || "application/octet-stream"); });
    });

    server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            const nextPort = port + 1;
            if (nextPort <= 3010) {
                console.warn(`Port ${port} is busy. Trying ${nextPort} instead.`);
                startServer(nextPort);
                return;
            }
        }
        throw error;
    });

    server.listen(port, () => console.log(`Chico's Colors is running at http://localhost:${port}`));
}

startServer(preferredPort);
