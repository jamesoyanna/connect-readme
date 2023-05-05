const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello Api");
})

const PORT = 5000;
app.listen(PORT , () => {
    console.log(`Server listening on ${PORT}`);
});
