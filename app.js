require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Replace with your actual access token and API endpoint
const accessToken = process.env.ACCESS_TOKEN;
const apiEndpoint = 'https://fujifilm-xspace.com/admin/api/2023-10';

app.put('/addTags', (req, res) => {
  const { orderId, tags } = req.query;

  if (!orderId || !tags) {
      return res.status(400).send('Missing orderId or tags');
  }

  fetch(`${apiEndpoint}/orders/${orderId}.json`, {
      method: 'PUT',
      headers: { 
          'X-Shopify-Access-Token': accessToken,
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          order: {
              id: orderId,
              tags: tags
          }
      })
  })
  .then(response => {
      if (response.ok) {
          console.log('Order tag added successfully');
          return res.send('Order tag added successfully');
      } else {
          console.error('Failed to add order tag');
          return res.status(500).send('Failed to add order tag');
      }
  })
  .catch(error => {
      console.error('Fetch error:', error);
      return res.status(500).send('An error occurred');
  });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
