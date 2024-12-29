// // // // // // // // // const mongoose = require('mongoose');
// // // // // // // // // const dotenv = require('dotenv');
// // // // // // // // // const express = require('express');
// // // // // // // // // const cloudinary = require('cloudinary').v2;
// // // // // // // // // const multer = require('multer');
// // // // // // // // // const cors = require('cors');

// // // // // // // // // dotenv.config();

// // // // // // // // // const app = express();
// // // // // // // // // app.use(express.json());
// // // // // // // // // app.use(cors());

// // // // // // // // // // MongoDB connection with error handling
// // // // // // // // // mongoose.connect(process.env.MONGO_URL, {
// // // // // // // // //   useNewUrlParser: true,
// // // // // // // // //   useUnifiedTopology: true,
// // // // // // // // //   serverSelectionTimeoutMS: 5000, // 5 seconds for server selection
// // // // // // // // // })
// // // // // // // // //   .then(() => {
// // // // // // // // //     console.log('Connected to MongoDB');
// // // // // // // // //   })
// // // // // // // // //   .catch((err) => {
// // // // // // // // //     console.error('MongoDB Connection Error:', err);
// // // // // // // // //   });

// // // // // // // // // // Cloudinary config
// // // // // // // // // cloudinary.config({
// // // // // // // // //   cloud_name: process.env.CLOUDINARY_NAME,
// // // // // // // // //   api_key: process.env.CLOUDINARY_API_KEY,
// // // // // // // // //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // // // // // // // // });

// // // // // // // // // // Multer setup for handling image upload
// // // // // // // // // const storage = multer.memoryStorage();
// // // // // // // // // const upload = multer({ storage: storage });

// // // // // // // // // // Schema for storing text and image data
// // // // // // // // // const DataSchema = new mongoose.Schema({
// // // // // // // // //   text: String,
// // // // // // // // //   imageUrl: String,
// // // // // // // // // });
// // // // // // // // // const Data = mongoose.model('Data', DataSchema);

// // // // // // // // // // Route for handling file upload
// // // // // // // // // app.post('/upload', upload.single('image'), async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     // Log request data from frontend
// // // // // // // // //     console.log('Request Body:', req.body); // Text data
// // // // // // // // //     console.log('Request File:', req.file); // Uploaded file

// // // // // // // // //     if (!req.body.text || !req.file) {
// // // // // // // // //       console.error('Missing text or image data.');
// // // // // // // // //       return res.status(400).json({ message: 'Missing text or image.' });
// // // // // // // // //     }

// // // // // // // // //     // Upload image to Cloudinary
// // // // // // // // //     cloudinary.uploader.upload_stream(
// // // // // // // // //       { resource_type: 'auto' },
// // // // // // // // //       async (error, result) => {
// // // // // // // // //         if (error) {
// // // // // // // // //           console.error('Cloudinary Upload Error:', error); // Log Cloudinary upload error
// // // // // // // // //           return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
// // // // // // // // //         }

// // // // // // // // //         // Log Cloudinary result
// // // // // // // // //         console.log('Cloudinary Upload Result:', result);

// // // // // // // // //         // Save text and image URL in the database
// // // // // // // // //         const newData = new Data({
// // // // // // // // //           text: req.body.text,
// // // // // // // // //           imageUrl: result.secure_url,
// // // // // // // // //         });

// // // // // // // // //         // Ensure the MongoDB operation is completed
// // // // // // // // //         try {
// // // // // // // // //           await newData.save();
// // // // // // // // //           console.log('Data Saved:', newData);
// // // // // // // // //           res.status(200).json({ message: 'Data saved successfully', data: newData });
// // // // // // // // //         } catch (err) {
// // // // // // // // //           console.error('MongoDB Save Error:', err);
// // // // // // // // //           res.status(500).json({ message: 'Error saving data to database', error: err });
// // // // // // // // //         }
// // // // // // // // //       }
// // // // // // // // //     ).end(req.file.buffer);
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Server Error:', error); // Log any unexpected server errors
// // // // // // // // //     res.status(500).json({ message: 'Server error', error });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // app.listen(process.env.PORT || 8080, () => {
// // // // // // // // //   console.log(`Server running on port ${process.env.PORT || 8080}`);
// // // // // // // // // });

// // // // // // // // const mongoose = require('mongoose');
// // // // // // // // const dotenv = require('dotenv');
// // // // // // // // const express = require('express');
// // // // // // // // const cloudinary = require('cloudinary').v2;
// // // // // // // // const multer = require('multer');
// // // // // // // // const cors = require('cors');
// // // // // // // // const http = require('http');
// // // // // // // // const socketIo = require('socket.io');

// // // // // // // // dotenv.config();

// // // // // // // // const app = express();
// // // // // // // // const server = http.createServer(app);  // Create HTTP server
// // // // // // // // const io = socketIo(server);  // Integrate Socket.io

// // // // // // // // app.use(express.json());
// // // // // // // // app.use(cors());

// // // // // // // // // MongoDB connection
// // // // // // // // mongoose.connect(process.env.MONGO_URL, {
// // // // // // // //   useNewUrlParser: true,
// // // // // // // //   useUnifiedTopology: true,
// // // // // // // // })
// // // // // // // //   .then(() => {
// // // // // // // //     console.log('Connected to MongoDB');
// // // // // // // //   })
// // // // // // // //   .catch((err) => {
// // // // // // // //     console.error('MongoDB Connection Error:', err);
// // // // // // // //   });

// // // // // // // // // Cloudinary config
// // // // // // // // cloudinary.config({
// // // // // // // //   cloud_name: process.env.CLOUDINARY_NAME,
// // // // // // // //   api_key: process.env.CLOUDINARY_API_KEY,
// // // // // // // //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // // // // // // // });

// // // // // // // // // Multer setup for handling image upload
// // // // // // // // const storage = multer.memoryStorage();
// // // // // // // // const upload = multer({ storage: storage });

// // // // // // // // // Schema for storing text and image data
// // // // // // // // const DataSchema = new mongoose.Schema({
// // // // // // // //   text: String,
// // // // // // // //   imageUrl: String,
// // // // // // // // });
// // // // // // // // const Data = mongoose.model('Data', DataSchema);

// // // // // // // // // Route for handling file upload
// // // // // // // // app.post('/upload', upload.single('image'), async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     console.log('Request Body:', req.body);
// // // // // // // //     console.log('Request File:', req.file);

// // // // // // // //     if (!req.body.text || !req.file) {
// // // // // // // //       return res.status(400).json({ message: 'Missing text or image.' });
// // // // // // // //     }

// // // // // // // //     // Upload image to Cloudinary
// // // // // // // //     cloudinary.uploader.upload_stream(
// // // // // // // //       { resource_type: 'auto' },
// // // // // // // //       async (error, result) => {
// // // // // // // //         if (error) {
// // // // // // // //           return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
// // // // // // // //         }

// // // // // // // //         console.log('Cloudinary Upload Result:', result);

// // // // // // // //         // Save text and image URL in MongoDB
// // // // // // // //         const newData = new Data({
// // // // // // // //           text: req.body.text,
// // // // // // // //           imageUrl: result.secure_url,
// // // // // // // //         });

// // // // // // // //         try {
// // // // // // // //           await newData.save();
// // // // // // // //           console.log('Data Saved:', newData);

// // // // // // // //           // Emit the new data to all connected clients
// // // // // // // //           io.emit('newData', newData);  // Emit the 'newData' event to all clients

// // // // // // // //           res.status(200).json({ message: 'Data saved successfully', data: newData });
// // // // // // // //         } catch (err) {
// // // // // // // //           console.error('MongoDB Save Error:', err);
// // // // // // // //           res.status(500).json({ message: 'Error saving data to database', error: err });
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //     ).end(req.file.buffer);
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Server Error:', error);
// // // // // // // //     res.status(500).json({ message: 'Server error', error });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // server.listen(process.env.PORT || 8080, () => {
// // // // // // // //   console.log(`Server running on port ${process.env.PORT || 8080}`);
// // // // // // // // });


// // // // // // // const express = require('express');
// // // // // // // const cors = require('cors');
// // // // // // // const http = require('http');
// // // // // // // const socketIo = require('socket.io');
// // // // // // // const mongoose = require('mongoose');
// // // // // // // const dotenv = require('dotenv');
// // // // // // // const cloudinary = require('cloudinary').v2;
// // // // // // // const multer = require('multer');

// // // // // // // dotenv.config();

// // // // // // // // Create Express app
// // // // // // // const app = express();
// // // // // // // const server = http.createServer(app);  // HTTP server
// // // // // // // const io = socketIo(server);  // Socket.io for real-time events

// // // // // // // // Allow requests from localhost:3000 (Frontend React)
// // // // // // // app.use(cors({ 
// // // // // // //   origin: 'http://localhost:3000',  // allow React app on localhost:3000 to make requests
// // // // // // //   methods: ['GET', 'POST'],  // specify allowed methods
// // // // // // //   allowedHeaders: ['Content-Type']  // specify allowed headers
// // // // // // // }));

// // // // // // // app.use(express.json());

// // // // // // // // MongoDB connection
// // // // // // // mongoose.connect(process.env.MONGO_URL, {
// // // // // // //   useNewUrlParser: true,
// // // // // // //   useUnifiedTopology: true,
// // // // // // // })
// // // // // // //   .then(() => console.log('Connected to MongoDB'))
// // // // // // //   .catch((err) => console.error('MongoDB Connection Error:', err));

// // // // // // // // Cloudinary config
// // // // // // // cloudinary.config({
// // // // // // //   cloud_name: process.env.CLOUDINARY_NAME,
// // // // // // //   api_key: process.env.CLOUDINARY_API_KEY,
// // // // // // //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // // // // // // });

// // // // // // // // Multer setup for image upload
// // // // // // // const storage = multer.memoryStorage();
// // // // // // // const upload = multer({ storage: storage });

// // // // // // // // Schema for storing text and image data
// // // // // // // const DataSchema = new mongoose.Schema({
// // // // // // //   text: String,
// // // // // // //   imageUrl: String,
// // // // // // // });
// // // // // // // const Data = mongoose.model('Data', DataSchema);

// // // // // // // // Route for handling file upload
// // // // // // // app.post('/upload', upload.single('image'), async (req, res) => {
// // // // // // //   try {
// // // // // // //     console.log('Request Body:', req.body);
// // // // // // //     console.log('Request File:', req.file);

// // // // // // //     if (!req.body.text || !req.file) {
// // // // // // //       return res.status(400).json({ message: 'Missing text or image.' });
// // // // // // //     }

// // // // // // //     // Upload image to Cloudinary
// // // // // // //     cloudinary.uploader.upload_stream(
// // // // // // //       { resource_type: 'auto' },
// // // // // // //       async (error, result) => {
// // // // // // //         if (error) {
// // // // // // //           return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
// // // // // // //         }

// // // // // // //         console.log('Cloudinary Upload Result:', result);

// // // // // // //         // Save text and image URL in MongoDB
// // // // // // //         const newData = new Data({
// // // // // // //           text: req.body.text,
// // // // // // //           imageUrl: result.secure_url,
// // // // // // //         });

// // // // // // //         try {
// // // // // // //           await newData.save();
// // // // // // //           console.log('Data Saved:', newData);

// // // // // // //           // Emit the new data to all connected clients
// // // // // // //           io.emit('newData', newData);  // Emit the 'newData' event to all clients

// // // // // // //           res.status(200).json({ message: 'Data saved successfully', data: newData });
// // // // // // //         } catch (err) {
// // // // // // //           console.error('MongoDB Save Error:', err);
// // // // // // //           res.status(500).json({ message: 'Error saving data to database', error: err });
// // // // // // //         }
// // // // // // //       }
// // // // // // //     ).end(req.file.buffer);
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Server Error:', error);
// // // // // // //     res.status(500).json({ message: 'Server error', error });
// // // // // // //   }
// // // // // // // });

// // // // // // // server.listen(process.env.PORT || 8080, () => {
// // // // // // //   console.log(`Server running on port ${process.env.PORT || 8080}`);
// // // // // // // });


// // // // // // const express = require('express');
// // // // // // const cors = require('cors');
// // // // // // const http = require('http');
// // // // // // const socketIo = require('socket.io');
// // // // // // const mongoose = require('mongoose');
// // // // // // const cloudinary = require('cloudinary').v2;
// // // // // // const multer = require('multer');
// // // // // // const dotenv = require('dotenv');

// // // // // // // Load environment variables from .env file
// // // // // // dotenv.config();

// // // // // // const app = express();
// // // // // // const server = http.createServer(app);  // HTTP server for Socket.io
// // // // // // const io = socketIo(server);  // Socket.io instance for real-time events

// // // // // // // CORS configuration
// // // // // // app.use(cors({
// // // // // //   origin: 'http://localhost:3000',  // Allow frontend requests from React (localhost:3000)
// // // // // //   methods: ['GET', 'POST'],
// // // // // //   allowedHeaders: ['Content-Type']
// // // // // // }));

// // // // // // // Middleware for parsing JSON
// // // // // // app.use(express.json());

// // // // // // // Connect to MongoDB
// // // // // // mongoose.connect(process.env.MONGO_URL, {
// // // // // //   useNewUrlParser: true,
// // // // // //   useUnifiedTopology: true,
// // // // // // })
// // // // // //   .then(() => console.log('Connected to MongoDB'))
// // // // // //   .catch((err) => console.log('MongoDB Connection Error:', err));

// // // // // // // Cloudinary configuration
// // // // // // cloudinary.config({
// // // // // //   cloud_name: process.env.CLOUDINARY_NAME,
// // // // // //   api_key: process.env.CLOUDINARY_API_KEY,
// // // // // //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // // // // // });

// // // // // // // Define a Mongoose schema for storing text and image URL
// // // // // // const DataSchema = new mongoose.Schema({
// // // // // //   text: String,
// // // // // //   imageUrl: String,
// // // // // // });

// // // // // // const Data = mongoose.model('Data', DataSchema);

// // // // // // // Multer configuration for handling file uploads in memory
// // // // // // const storage = multer.memoryStorage();
// // // // // // const upload = multer({ storage: storage });

// // // // // // // Route to handle image upload
// // // // // // app.post('/upload', upload.single('image'), async (req, res) => {
// // // // // //   try {
// // // // // //     console.log('Request Body:', req.body);
// // // // // //     console.log('Request File:', req.file);

// // // // // //     if (!req.body.text || !req.file) {
// // // // // //       return res.status(400).json({ message: 'Missing text or image.' });
// // // // // //     }

// // // // // //     // Upload image to Cloudinary
// // // // // //     cloudinary.uploader.upload_stream(
// // // // // //       { resource_type: 'auto' },
// // // // // //       async (error, result) => {
// // // // // //         if (error) {
// // // // // //           return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
// // // // // //         }

// // // // // //         console.log('Cloudinary Upload Result:', result);

// // // // // //         // Save text and image URL to MongoDB
// // // // // //         const newData = new Data({
// // // // // //           text: req.body.text,
// // // // // //           imageUrl: result.secure_url,
// // // // // //         });

// // // // // //         try {
// // // // // //           await newData.save();
// // // // // //           console.log('Data Saved:', newData);

// // // // // //           // Emit the new data to all connected clients using Socket.io
// // // // // //           io.emit('newData', newData);  // This sends the new data to the frontend

// // // // // //           res.status(200).json({ message: 'Data saved successfully', data: newData });
// // // // // //         } catch (err) {
// // // // // //           console.log('MongoDB Save Error:', err);
// // // // // //           res.status(500).json({ message: 'Error saving data to database', error: err });
// // // // // //         }
// // // // // //       }
// // // // // //     ).end(req.file.buffer);
// // // // // //   } catch (error) {
// // // // // //     console.log('Server Error:', error);
// // // // // //     res.status(500).json({ message: 'Server error', error });
// // // // // //   }
// // // // // // });

// // // // // // // Start server
// // // // // // server.listen(process.env.PORT || 8080, () => {
// // // // // //   console.log(`Server running on port ${process.env.PORT || 8080}`);
// // // // // // });
// // // // // const express = require('express');
// // // // // const cors = require('cors');
// // // // // const http = require('http');
// // // // // const socketIo = require('socket.io');
// // // // // const mongoose = require('mongoose');
// // // // // const cloudinary = require('cloudinary').v2;
// // // // // const multer = require('multer');
// // // // // const dotenv = require('dotenv');

// // // // // // Load environment variables from .env file
// // // // // dotenv.config();

// // // // // const app = express();
// // // // // const server = http.createServer(app);  // HTTP server for Socket.io
// // // // // const io = socketIo(server);  // Socket.io instance for real-time events

// // // // // // CORS configuration
// // // // // app.use(cors({
// // // // //   origin: 'http://localhost:3000',  // Allow frontend requests from React (localhost:3000)
// // // // //   methods: ['GET', 'POST'],
// // // // //   allowedHeaders: ['Content-Type']
// // // // // }));

// // // // // // Middleware for parsing JSON
// // // // // app.use(express.json());

// // // // // // Connect to MongoDB
// // // // // mongoose.connect(process.env.MONGO_URL, {
// // // // //   useNewUrlParser: true,
// // // // //   useUnifiedTopology: true,
// // // // // })
// // // // //   .then(() => console.log('Connected to MongoDB'))
// // // // //   .catch((err) => console.log('MongoDB Connection Error:', err));

// // // // // // Cloudinary configuration
// // // // // cloudinary.config({
// // // // //   cloud_name: process.env.CLOUDINARY_NAME,
// // // // //   api_key: process.env.CLOUDINARY_API_KEY,
// // // // //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // // // // });

// // // // // // Define a Mongoose schema for storing text and image URL
// // // // // const DataSchema = new mongoose.Schema({
// // // // //   text: String,
// // // // //   imageUrl: String,
// // // // // });

// // // // // const Data = mongoose.model('Data', DataSchema);

// // // // // // Multer configuration for handling file uploads in memory
// // // // // const storage = multer.memoryStorage();
// // // // // const upload = multer({ storage: storage });

// // // // // // Route to handle image upload
// // // // // app.post('/upload', upload.single('image'), async (req, res) => {
// // // // //   try {
// // // // //     console.log('Request Body:', req.body);
// // // // //     console.log('Request File:', req.file);

// // // // //     if (!req.body.text || !req.file) {
// // // // //       return res.status(400).json({ message: 'Missing text or image.' });
// // // // //     }

// // // // //     // Upload image to Cloudinary
// // // // //     cloudinary.uploader.upload_stream(
// // // // //       { resource_type: 'auto' },
// // // // //       async (error, result) => {
// // // // //         if (error) {
// // // // //           return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
// // // // //         }

// // // // //         console.log('Cloudinary Upload Result:', result);

// // // // //         // Save text and image URL to MongoDB
// // // // //         const newData = new Data({
// // // // //           text: req.body.text,
// // // // //           imageUrl: result.secure_url,
// // // // //         });

// // // // //         try {
// // // // //           await newData.save();
// // // // //           console.log('Data Saved:', newData);

// // // // //           // Emit the new data to all connected clients using Socket.io
// // // // //           io.emit('newData', newData);  // This sends the new data to the frontend

// // // // //           res.status(200).json({ message: 'Data saved successfully', data: newData });
// // // // //         } catch (err) {
// // // // //           console.log('MongoDB Save Error:', err);
// // // // //           res.status(500).json({ message: 'Error saving data to database', error: err });
// // // // //         }
// // // // //       }
// // // // //     ).end(req.file.buffer);
// // // // //   } catch (error) {
// // // // //     console.log('Server Error:', error);
// // // // //     res.status(500).json({ message: 'Server error', error });
// // // // //   }
// // // // // });

// // // // // // Start server
// // // // // server.listen(process.env.PORT || 8080, () => {
// // // // //   console.log(`Server running on port ${process.env.PORT || 8080}`);
// // // // // });


// // // // const express = require("express");
// // // // const cors = require("cors");
// // // // const http = require("http");
// // // // const socketIo = require("socket.io");
// // // // const mongoose = require("mongoose");
// // // // const cloudinary = require("cloudinary").v2;
// // // // const multer = require("multer");
// // // // const dotenv = require("dotenv");

// // // // dotenv.config();

// // // // const app = express();
// // // // const server = http.createServer(app);
// // // // const io = socketIo(server);

// // // // // CORS configuration
// // // // app.use(
// // // //   cors({
// // // //     origin: "http://localhost:3000",
// // // //     methods: ["GET", "POST", "PUT"],
// // // //     allowedHeaders: ["Content-Type"],
// // // //   })
// // // // );

// // // // // Middleware for parsing JSON
// // // // app.use(express.json());

// // // // // Connect to MongoDB
// // // // mongoose
// // // //   .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// // // //   .then(() => console.log("Connected to MongoDB"))
// // // //   .catch((err) => console.error("MongoDB Connection Error:", err));

// // // // // Cloudinary configuration
// // // // cloudinary.config({
// // // //   cloud_name: process.env.CLOUDINARY_NAME,
// // // //   api_key: process.env.CLOUDINARY_API_KEY,
// // // //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // // // });

// // // // // Mongoose schema
// // // // const DataSchema = new mongoose.Schema({
// // // //   text: String,
// // // //   imageUrl: String,
// // // // });

// // // // const Data = mongoose.model("Data", DataSchema);

// // // // // Multer configuration
// // // // const storage = multer.memoryStorage();
// // // // const upload = multer({ storage: storage });

// // // // // Fetch all data
// // // // app.get("/data", async (req, res) => {
// // // //   try {
// // // //     const data = await Data.find();
// // // //     res.status(200).json(data);
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: "Error fetching data", error });
// // // //   }
// // // // });

// // // // // Upload new data
// // // // app.post("/upload", upload.single("image"), async (req, res) => {
// // // //   try {
// // // //     if (!req.body.text || !req.file) {
// // // //       return res.status(400).json({ message: "Missing text or image." });
// // // //     }

// // // //     cloudinary.uploader
// // // //       .upload_stream({ resource_type: "auto" }, async (error, result) => {
// // // //         if (error) {
// // // //           return res
// // // //             .status(500)
// // // //             .json({ message: "Error uploading image to Cloudinary", error });
// // // //         }

// // // //         const newData = new Data({
// // // //           text: req.body.text,
// // // //           imageUrl: result.secure_url,
// // // //         });

// // // //         await newData.save();
// // // //         io.emit("newData", newData);
// // // //         res.status(200).json({ message: "Data saved successfully", data: newData });
// // // //       })
// // // //       .end(req.file.buffer);
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: "Server error", error });
// // // //   }
// // // // });

// // // // // Update existing data
// // // // app.put("/data/:id", upload.single("image"), async (req, res) => {
// // // //   try {
// // // //     const { id } = req.params;
// // // //     const updatedFields = { text: req.body.text };

// // // //     if (req.file) {
// // // //       const result = await cloudinary.uploader.upload_stream({
// // // //         resource_type: "auto",
// // // //       }).end(req.file.buffer);
// // // //       updatedFields.imageUrl = result.secure_url;
// // // //     }

// // // //     const updatedData = await Data.findByIdAndUpdate(id, updatedFields, {
// // // //       new: true,
// // // //     });

// // // //     io.emit("newData", updatedData);
// // // //     res.status(200).json({ message: "Data updated successfully", data: updatedData });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: "Error updating data", error });
// // // //   }
// // // // });

// // // // // Start server
// // // // server.listen(process.env.PORT || 8080, () => {
// // // //   console.log(`Server running on port ${process.env.PORT || 8080}`);
// // // // });


// // // const express = require("express");
// // // const cors = require("cors");
// // // const http = require("http");
// // // const socketIo = require("socket.io");
// // // const mongoose = require("mongoose");
// // // const cloudinary = require("cloudinary").v2;
// // // const multer = require("multer");
// // // const dotenv = require("dotenv");

// // // dotenv.config();

// // // const app = express();
// // // const server = http.createServer(app);
// // // const io = socketIo(server);

// // // // CORS configuration
// // // app.use(
// // //   cors({
// // //     origin: "http://localhost:3000",
// // //     methods: ["GET", "POST", "PUT", "DELETE"],
// // //     allowedHeaders: ["Content-Type"],
// // //   })
// // // );
// // // app.use(express.json());

// // // // Connect to MongoDB
// // // mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// // // // Cloudinary configuration
// // // cloudinary.config({
// // //   cloud_name: process.env.CLOUDINARY_NAME,
// // //   api_key: process.env.CLOUDINARY_API_KEY,
// // //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // // });

// // // // Mongoose schema
// // // const DataSchema = new mongoose.Schema({
// // //   text: String,
// // //   imageUrl: String,
// // // });

// // // const Data = mongoose.model("Data", DataSchema);

// // // // Multer configuration
// // // const storage = multer.memoryStorage();
// // // const upload = multer({ storage });

// // // // Fetch all data
// // // app.get("/data", async (req, res) => {
// // //   const data = await Data.find();
// // //   res.json(data);
// // // });

// // // // Upload new data
// // // app.post("/upload", upload.single("image"), async (req, res) => {
// // //   cloudinary.uploader.upload_stream({ resource_type: "auto" }, async (err, result) => {
// // //     if (err) return res.status(500).json({ message: "Cloudinary Error" });

// // //     const newData = await Data.create({ text: req.body.text, imageUrl: result.secure_url });
// // //     io.emit("newData", newData);
// // //     res.json(newData);
// // //   }).end(req.file.buffer);
// // // });

// // // // Update data
// // // app.put("/data/:id", upload.single("image"), async (req, res) => {
// // //   const updatedFields = { text: req.body.text };
// // //   if (req.file) {
// // //     const result = await cloudinary.uploader.upload_stream({ resource_type: "auto" }).end(req.file.buffer);
// // //     updatedFields.imageUrl = result.secure_url;
// // //   }
// // //   const updatedData = await Data.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
// // //   io.emit("newData", updatedData);
// // //   res.json(updatedData);
// // // });

// // // // Delete data
// // // app.delete("/data/:id", async (req, res) => {
// // //   await Data.findByIdAndDelete(req.params.id);
// // //   io.emit("deleteData", req.params.id);
// // //   res.json({ message: "Deleted successfully" });
// // // });

// // // // Start the server
// // // server.listen(8080, () => console.log("Server running on http://localhost:8080"));


// // const express = require("express");
// // const multer = require("multer");
// // const cors = require("cors");
// // const mongoose = require("mongoose");
// // const { Server } = require("socket.io");
// // const http = require("http");

// // const app = express();
// // const server = http.createServer(app);
// // const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Database connection
// // mongoose.connect("mongodb://127.0.0.1:27017/uploads", {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// // const dataSchema = new mongoose.Schema({
// //   text: String,
// //   imageUrl: String,
// // });
// // const Data = mongoose.model("Data", dataSchema);

// // // Multer setup for file uploads
// // const storage = multer.memoryStorage();
// // const upload = multer({ storage });

// // // Routes
// // app.get("/data", async (req, res) => {
// //   try {
// //     const allData = await Data.find();
// //     res.json(allData);
// //   } catch (error) {
// //     res.status(500).json({ message: "Failed to fetch data" });
// //   }
// // });

// // app.post("/data", upload.single("image"), async (req, res) => {
// //   const imageUrl = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
// //   const newData = new Data({ text: req.body.text, imageUrl });
// //   try {
// //     const savedData = await newData.save();
// //     io.emit("newData", savedData);
// //     res.json(savedData);
// //   } catch (error) {
// //     res.status(500).json({ message: "Failed to save data" });
// //   }
// // });

// // app.put("/data/:id", upload.single("image"), async (req, res) => {
// //   const updatedFields = { text: req.body.text };

// //   if (req.file) {
// //     updatedFields.imageUrl = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
// //   }

// //   try {
// //     const updatedData = await Data.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
// //     io.emit("newData", updatedData);
// //     res.json(updatedData);
// //   } catch (error) {
// //     res.status(500).json({ message: "Failed to update data" });
// //   }
// // });

// // app.delete("/data/:id", async (req, res) => {
// //   try {
// //     await Data.findByIdAndDelete(req.params.id);
// //     io.emit("deleteData", req.params.id);
// //     res.json({ message: "Data deleted" });
// //   } catch (error) {
// //     res.status(500).json({ message: "Failed to delete data" });
// //   }
// // });

// // // Socket.IO connection
// // io.on("connection", (socket) => {
// //   console.log("A user connected");
// //   socket.on("disconnect", () => {
// //     console.log("A user disconnected");
// //   });
// // });

// // // Start server
// // server.listen(8080, () => console.log("Server running on http://localhost:8080"));

// //newone

// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const { Server } = require("socket.io");
// const http = require("http");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Database connection
// mongoose.connect("mongodb://127.0.0.1:27017/uploads", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const dataSchema = new mongoose.Schema({
//   heading: String,
//   description: String,
//   role: String,
//   text: String,
//   imageUrl: String,
// });
// const Data = mongoose.model("Data", dataSchema);

// // Multer setup for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Routes
// app.get("/data", async (req, res) => {
//   try {
//     const allData = await Data.find();
//     res.json(allData);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch data" });
//   }
// });

// app.post("/data", upload.single("image"), async (req, res) => {
//   const { heading, description, role, text } = req.body;
//   const imageUrl = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
//   const newData = new Data({ heading, description, role, text, imageUrl });
//   try {
//     const savedData = await newData.save();
//     io.emit("newData", savedData);
//     res.json(savedData);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to save data" });
//   }
// });

// app.put("/data/:id", upload.single("image"), async (req, res) => {
//   const { heading, description, role, text } = req.body;
//   const updatedFields = { heading, description, role, text };

//   if (req.file) {
//     updatedFields.imageUrl = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
//   }

//   try {
//     const updatedData = await Data.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
//     io.emit("newData", updatedData);
//     res.json(updatedData);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update data" });
//   }
// });

// app.delete("/data/:id", async (req, res) => {
//   try {
//     await Data.findByIdAndDelete(req.params.id);
//     io.emit("deleteData", req.params.id);
//     res.json({ message: "Data deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete data" });
//   }
// });

// // Socket.IO connection
// io.on("connection", (socket) => {
//   console.log("A user connected");
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// // Start server
// server.listen(8080, () => console.log("Server running on http://localhost:8080"));

//newapi


const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/uploads", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataSchema = new mongoose.Schema({
  heading: String,
  description: String,
  role: String,
  text: String,
  imageUrl: String,
});
const Data = mongoose.model("Data", dataSchema);

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
app.get("/data", async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

app.post("/data", upload.single("image"), async (req, res) => {
  const { heading, description, role, text } = req.body;

  // Ensure all fields are being sent
  if (!heading || !description || !role || !text) {
    return res.status(400).json({ message: "All fields must be provided" });
  }

  const imageUrl = req.file ? `data:image/jpeg;base64,${req.file.buffer.toString("base64")}` : null;
  const newData = new Data({ heading, description, role, text, imageUrl });

  try {
    const savedData = await newData.save();
    io.emit("newData", savedData);
    res.json(savedData);
  } catch (error) {
    res.status(500).json({ message: "Failed to save data" });
  }
});

app.put("/data/:id", upload.single("image"), async (req, res) => {
  const { heading, description, role, text } = req.body;
  const updatedFields = { heading, description, role, text };

  // Update image if uploaded
  if (req.file) {
    updatedFields.imageUrl = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
  }

  try {
    const updatedData = await Data.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    io.emit("newData", updatedData);
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: "Failed to update data" });
  }
});

app.delete("/data/:id", async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    io.emit("deleteData", req.params.id);
    res.json({ message: "Data deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete data" });
  }
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start server
server.listen(8080, () => console.log("Server running on http://localhost:8080"));
