const https = require("https");
const fs = require("fs");x
const path = require("path");
const { MongoClient } = require("mongodb");
const querystring = require("querystring");

const mongoUrl = "mongodb://localhost:27017";
const dbName = "clientDataDB";
let db, client;

// Read SSL certificate and private key
const options = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
};

// Connect to MongoDB
async function connectToDatabase() {
  try {
    client = await MongoClient.connect(mongoUrl); // Removed deprecated options
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the program if MongoDB connection fails
  }
}

// Create an HTTPS server
const server = https.createServer(options, (req, res) => {
  if (req.method === "POST" && req.url === "/submit") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const formData = querystring.parse(body);
      const clientData = {
        time: new Date().toISOString(),
        name: formData.name || "Unknown",
        email: formData.email || "Unknown",
        ip: req.connection.remoteAddress,
        userAgent: req.headers["user-agent"],
      };

      try {
        const collection = db.collection("clientLogs");
        await collection.insertOne(clientData);

        const logMessage = `Time: ${clientData.time}\nName: ${clientData.name}\nEmail: ${clientData.email}\nIP: ${clientData.ip}\nUser-Agent: ${clientData.userAgent}\n\n`;
        fs.appendFileSync(path.join(__dirname, "client_logs.txt"), logMessage);

        console.log("Client details logged:", clientData);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Thank you for submitting your details!</h1>");
      } catch (err) {
        console.error("Error logging client details:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 - Internal Server Error");
      }
    });
  } else {
    const filePath = path.join(
      __dirname,
      "public",
      req.url === "/" ? "index.html" : req.url ,
      req.url ==="/" ? "account-email.html" : req.url
    );
    const extname = path.extname(filePath);
    let contentType = "text/html";
    switch (extname) {
      case ".css":
        contentType = "text/css";
        break;
      case ".js":
        contentType = "text/javascript";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpeg";
        break;
      case ".ico":
        contentType = "image/x-icon";
        break;
      case ".json":
        contentType = "application/json";
        break;
      default:
        contentType = "text/html";
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 - Not Found");
        } else {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(`500 - Internal Server Error\n${err.code}`);
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  }
});

// Function to start the server
async function startServer() {
  await connectToDatabase();
  const PORT = 4433;
  server.listen(PORT, () => {
    console.log(`Server started at https://localhost:${PORT}`);
  });
}

// Graceful shutdown
function shutdownServer() {
  server.close(() => {
    console.log("Server shut down gracefully.");
    client.close();
    console.log("MongoDB connection closed.");
  });
}

process.on("SIGINT", () => {
  console.log("\nReceived SIGINT. Shutting down the server...");
  shutdownServer();
  process.exit(0);
});

// Start the server
startServer();
