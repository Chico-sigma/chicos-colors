const http = require("http");
const fs = require("fs");
const path = require("path");
const preferredPort = Number(process.env.PORT) || 3000;
const root = __dirname;
const dataFile = path.join(root, "favorites.json");
const mimeTypes = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json" };
function readFavorites() { try { return JSON.parse(fs.readFileSync(dataFile, "utf8")); } catch (error) { return []; } }
function send(response, status, body, type = "application/json") { response.writeHead(status, { "Content-Type": `${type}; charset=utf-8` }); response.end(type === "application/json" ? JSON.stringify(body) : body); }

function startServer(port) {
    const server = http.createServer((request, response) => {
        if (request.url === "/api/favorites" && request.method === "GET") return send(response, 200, readFavorites());
        if (request.url === "/api/favorites" && request.method === "PUT") {
            let body = "";
            request.on("data", (chunk) => { body += chunk; });
            request.on("end", () => { try { const favorites = JSON.parse(body).favorites; if (!Array.isArray(favorites)) throw new Error("Invalid favorites"); fs.writeFileSync(dataFile, JSON.stringify(favorites, null, 2)); send(response, 200, favorites); } catch (error) { send(response, 400, { error: "Invalid favorites payload" }); } });
            return;
        }
        const requestedPath = request.url === "/" ? "/index.html" : request.url.split("?")[0];
        const filePath = path.normalize(path.join(root, requestedPath));
        if (!filePath.startsWith(root)) return send(response, 403, { error: "Forbidden" });
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
