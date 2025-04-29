const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/order.route");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

dotenv.config();

app.use("/api/orders", orderRoutes);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const startServer = async () => {
  try {
    // Find an available port starting from the specified PORT
    const findAvailablePort = async (startPort) => {
      try {
        await new Promise((resolve, reject) => {
          app.listen(startPort, () => {
            console.log(`Server is running on port ${startPort}`);
            resolve();
          }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
              reject(err);
            }
          });
        });
      } catch (err) {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${startPort} is in use, trying ${startPort + 1}`);
          return findAvailablePort(startPort + 1);
        }
        throw err;
      }
    };

    await findAvailablePort(PORT);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
