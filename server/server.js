const app = require("./app");
const connectDB = require("./config/db");
const seedDefaultPolicies = require("./utils/seedPolicies");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDefaultPolicies();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
