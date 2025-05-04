const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());

app.get('/', (req, res) => {
    console.log("succes")
})

app.get('/api/test-connection', (req, res) => {
    res.json({ message: 'Connection successful!' });
});

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});
