const express = require("express");
const app = express();
const hotelRoutes = require("./routes/hotelRoutes");

app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/test", (req, resp) => {
  resp.send([{ item: 1, name: "milk" }]);
});

app.use("/hotels", hotelRoutes);
