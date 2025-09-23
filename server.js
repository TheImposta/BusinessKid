const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Tell Express to serve everything inside "public"
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
