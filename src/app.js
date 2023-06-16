// Library Imports
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

// Importing Routes
const userRoutes = require("./routes/userRoutes");
// Setting Up the App
const PORT = process.env.PORT || 3005;
const DB = "trocaUsers";

const app = express();

// Server Middleware
app.use(express.json());
app.use("*", cors({
    origin: "*"
}));

// Server Routes
app.use("/check", userRoutes);
// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}!!!👌👌👌`);
	mongoose
		.connect(process.env.MONGODB_URI, {
			dbName: DB,
		})
		.then(() => {
			console.log("Connected to MongoDB!!!🎉🎉🎉");
		})
		.catch((error) => {
			console.error(`⚠️⚠️⚠️ Error connecting to MongoDB: ${error}`);
			process.exit(1);
		});
});
