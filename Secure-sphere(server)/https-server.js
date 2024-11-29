const https = require("https");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const querystring = require("querystring");

// MongoDB connection URL and Database name
const url = "mongodb://localhost:27017"; // Change this if you're using a remote MongoDB
const dbName = "clientDataDB";
let db, client;

// Read SSL certificate and private key
const options = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")), // Use your private key
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")), // Use your certificate
};

// Connect to MongoDB
async function connectToDatabase() {
  try {
    client = await MongoClient.connect(url);
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
    // Handle form submission
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
        // Log to MongoDB
        const collection = db.collection("clientLogs"); // Create or use the collection "clientLogs"
        await collection.insertOne(clientData);

        // Log to client_logs.txt
        const logMessage = `Time: ${clientData.time}\nName: ${clientData.name}\nEmail: ${clientData.email}\nIP: ${clientData.ip}\nUser-Agent: ${clientData.userAgent}\n\n`;
        fs.appendFileSync(path.join(__dirname, "client_logs.txt"), logMessage);

        console.log("Client details logged:", clientData);

        // Respond to the client
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Thank you for submitting your details!</h1>");
      } catch (err) {
        console.error("Error logging client details:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 - Internal Server Error");
      }
    });
  } else {
    // Serve static files
    const filePath = path.join(
      __dirname,
      "public",
      req.url === "/" ? "index.html" : req.url
    );

    // Determine content type
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

    // Serve file
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === "ENOENT") {
          // File not found
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 - Not Found");
        } else {
          // Server error
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(`500 - Internal Server Error\n${err.code}`);
        }
      } else {
        // Serve content
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  }
});

// Function to start the server
function startServer() {
  const PORT = 4433;
  server.listen(PORT, () => {
    console.log(`Server started at https://localhost:${PORT}`);
  });
}



// Function to gracefully shut down the server
function shutdownServer() {
  server.close(() => {
    console.log("Server shut down gracefully.");
    client.close(); // Close MongoDB connection
    console.log("Server has been shutdown successfully."); // Log shutdown message in VS Code terminal
  });
}

// Log server starting message
connectToDatabase().then(() => {
  startServer();
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nReceived SIGINT. Shutting down the server...");
  shutdownServer();
  process.exit(0); // Exit the process after shutdown
});