const app = require("./server");
const connectDatabase = require("./config/db");

async function startDevelopmentServer() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("Set a JWT_SECRET with at least 32 characters in backend/.env before starting the API.");
  }

  await connectDatabase();
  const port = Number(process.env.PORT) || 5000;
  app.listen(port, () => console.log(`Chico's Colors API development server listening on http://localhost:${port}`));
}

startDevelopmentServer().catch((error) => {
  console.error("Unable to start local API:", error.message);
  process.exitCode = 1;
});
