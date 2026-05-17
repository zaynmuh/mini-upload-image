const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello Zen, welcome to backend engineering");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});