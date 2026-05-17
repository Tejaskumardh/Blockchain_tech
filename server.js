const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');   // 👈 ADD

const app = express();
app.use(cors());                // 👈 ADD
const upload = multer();

app.post('/upload', upload.single('file'), async (req, res) => {
    console.log("Upload request received");   // 👈 ADD THIS

    try {
        const formData = new FormData();
        formData.append('file', req.file.buffer, {
            filename: 'file'
        });

        const response = await axios.post(
            'http://127.0.0.1:5001/api/v0/add',
            formData,
            {
                headers: formData.getHeaders()
            }
        );

        console.log("IPFS response:", response.data); // 👈 ADD

        res.json({ hash: response.data.Hash });

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));