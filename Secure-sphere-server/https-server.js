
const https = require("https");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const mongoUrl = "mongodb://localhost:27017";
const dbName = "clientDataDB";
let db, client;

// SSL options
const options = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),

};


const mimetypes = {
  css: "text/css",
  html: "text/html",
  ico: "image/x-icon",
  jpg: "image/jpeg",
  js: "application/javascript",
  json: "application/json",
  png: "image/png",
};

// Connect to MongoDB
async function connectToDatabase() {
  try {
    client = await MongoClient.connect(mongoUrl);
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); 
  }
}

async function insertClientData(collectionName, clientData) {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(clientData);
    console.log(`Inserted data into '${collectionName}' with _id: ${result.insertedId}`);
  } catch (err) {
    console.error(`Error inserting data into '${collectionName}':`, err);
  }
}

async function handleFormSubmission(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      console.log("Raw form data received:", body);

      const formData = new URLSearchParams(body);
      const clientData = {
        time: new Date().toISOString(),
        name: formData.get("name") || "Unknown",
        email: formData.get("email") || "Unknown",
        ip: req.connection.remoteAddress || req.socket.remoteAddress,
        userAgent: req.headers["user-agent"],
      };

      console.log("Parsed client data:", clientData);


      await insertClientData("clients", clientData);
      await insertClientData("clientLogs", clientData);

      
      const logMessage = `Time: ${clientData.time}\nName: ${clientData.name}\nEmail: ${clientData.email}\nIP: ${clientData.ip}\nUser-Agent: ${clientData.userAgent}\n\n`;
      fs.appendFileSync(path.join(__dirname, "client_logs.txt"), logMessage);
      console.log("Client details logged to file.");

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Thank you for submitting your details!</h1>");
    } catch (err) {
      console.error("Error processing form submission:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 - Internal Server Error");
    }
  });
}


function serveStaticFiles(req, res) {
  const safePath = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(__dirname, "public", safePath);
  const extname = path.extname(filePath).substring(1); 
  const contentType = mimetypes[extname] || "application/octet-stream";

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Not Found");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`500 - Internal Server Error\n${err.code}`);
      }
    } else if (stats.isDirectory()) {
      const landingPageFilePath = path.join(filePath, "landingpage.html");
      serveFile(landingPageFilePath, "text/html", res);
    } else {
      serveFile(filePath, contentType, res);
    }
  });
}


function serveFile(filePath, contentType, res) {
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

// HTTPS server
const server = https.createServer(options, (req, res) => {
  if (req.method === "POST" && req.url === "/submit") {
    handleFormSubmission(req, res);
  } else {
    serveStaticFiles(req, res);
  }
});

async function startServer() {
  await connectToDatabase();
  const PORT = 4433;
  server.listen(PORT, () => {
    console.log(`Server started at https://localhost:${PORT}`);
  });
}


function shutdownServer() {
  server.close(() => {
    console.log("Server shut down gracefully.");
    if (client) client.close();
    console.log("MongoDB connection closed.");
  });
}

process.on("SIGINT", () => {
  console.log("\nReceived SIGINT. Shutting down the server...");
  shutdownServer();
  process.exit(0);
});

startServer();


/*
const https = require("https");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const url = require("url");
const mongoUrl = "mongodb://localhost:27017";
const dbName = "clientDataDB";
let db, client;

// SSL options
const options = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
};

// MongoDB connection
async function connectToDatabase() {
  try {
    client = await MongoClient.connect(mongoUrl);
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); 
  }
}

// Search functionality
async function handleSearch(req, res) {
  const queryParams = url.parse(req.url, true).query;
  const searchQuery = queryParams.q || "";

  try {
    const collection = db.collection("clients");
    const searchResults = await collection.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    }).toArray();
    
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(searchResults));
  } catch (err) {
    console.error("Error fetching search results:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 - Internal Server Error");
  }
}

// FAQ fetching functionality
async function handleFAQs(req, res) {
  try {
    const collection = db.collection("faqs");
    const faqs = await collection.find().toArray();
    
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(faqs));
  } catch (err) {
    console.error("Error fetching FAQs:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 - Internal Server Error");
  }
}

// Handle form submissions (existing code)
async function handleFormSubmission(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const formData = new URLSearchParams(body);
      const clientData = {
        time: new Date().toISOString(),
        name: formData.get("name") || "Unknown",
        email: formData.get("email") || "Unknown",
        ip: req.connection.remoteAddress || req.socket.remoteAddress,
        userAgent: req.headers["user-agent"],
      };

      await insertClientData("clients", clientData);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Thank you for submitting your details!</h1>");
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 - Internal Server Error");
    }
  });
}

// Function to serve static files (existing code)
function serveStaticFiles(req, res) {
  const safePath = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(__dirname, "public", safePath);
  const extname = path.extname(filePath).substring(1); 
  const contentType = mimetypes[extname] || "application/octet-stream";

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Not Found");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`500 - Internal Server Error\n${err.code}`);
      }
    } else if (stats.isDirectory()) {
      const landingPageFilePath = path.join(filePath, "landingpage.html");
      serveFile(landingPageFilePath, "text/html", res);
    } else {
      serveFile(filePath, contentType, res);
    }
  });
}

// Serve file (existing code)
function serveFile(filePath, contentType, res) {
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

// Create HTTPS server with added API routes
const server = https.createServer(options, (req, res) => {
  const { method, url } = req;

  if (method === "POST" && url === "/submit") {
    handleFormSubmission(req, res);
  } else if (method === "GET" && url.startsWith("/api/search")) {
    handleSearch(req, res);
  } else if (method === "GET" && url === "/api/faqs") {
    handleFAQs(req, res);
  } else {
    serveStaticFiles(req, res);
  }
});

// Start the server
async function startServer() {
  await connectToDatabase();
  const PORT = 4433;
  server.listen(PORT, () => {
    console.log(`Server started at https://localhost:${PORT}`);
  });
}

function shutdownServer() {
  server.close(() => {
    console.log("Server shut down gracefully.");
    if (client) client.close();
    console.log("MongoDB connection closed.");
  });
}

process.on("SIGINT", () => {
  console.log("\nReceived SIGINT. Shutting down the server...");
  shutdownServer();
  process.exit(0);
});

startServer();
*/