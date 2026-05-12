require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post('/create-checkout', async (req, res) => {
    try {
        const { amount } = req.body;
        
        const mID = process.env.CLOVER_MERCHANT_ID.trim();
        const apiKey = process.env.CLOVER_API_KEY.trim();

        const response = await axios({
            method: 'post',
            // CHANGE: This is the correct endpoint for Hosted Checkout sessions
            url: `https://apisandbox.dev.clover.com/invoicingcheckoutservice/v1/checkouts`, 
            data: {
                customer: {
                    
                    firstName: "Donor",
                    lastName: "User"
                },
                shoppingCart: {
                    lineItems: [
                        {
                            name: "Donation",
                            unitQty: 1,
                            price: parseInt(amount) // Still must be in cents
                        }
                    ]
                }
            },
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'X-Clover-Merchant-Id': mID, // REQUIRED: Send Merchant ID in the header for this API
                'Content-Type': 'application/json'
            }
        });

        // The URL is inside the response data
        res.json({ url: response.data.href });

    } catch (error) {
        // Detailed logging to help us see exactly what's wrong if it fails
        if (error.response) {
            console.error("Clover Response Error:", error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error("Connection Error:", error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});