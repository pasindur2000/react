const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Endpoint to handle image uploads
app.post("/upload", upload.single("image"), (req, res) => {
  // Get uploaded image path
  const imagePath = req.file.path;

  // Path to the 3D model
  const modelPath = path.join(__dirname, "models", "apple2.obj");

  // Run a child process to apply texture map
  const process = spawn("python", ["apply_texture.py", imagePath, modelPath]);

  process.stdout.on("data", (data) => {
    // Texture mapping complete, send response
    const modelData = fs.readFileSync(
      path.join(__dirname, "models", "output.obj")
    );
    res.set("Content-Type", "text/plain");
    res.send(modelData);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
