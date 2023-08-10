const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Create an Express app
const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose schema and model
const ContactSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
});

const Contact = mongoose.model('Contact', ContactSchema);



app.get('/', (req, res) => {
    res.send("You visited My App which deployed in AWS EC2");
})

// Define a route to display contacts
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});