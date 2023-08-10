const express = require('express');
const mongoose = require('mongoose');

// Create an Express app
const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB locally
mongoose.connect('mongodb://127.0.0.1:27017/deploy-app', {
  useNewUrlParser: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a mongoose schema and model
const ContactSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
});

const Contact = mongoose.model('Contact', ContactSchema);

app.get('/', (req, res) => {
  res.send("You visited My App which deployed in AWS EC2");
});

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
