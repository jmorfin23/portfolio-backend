const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const port = 5000; 

app.use(cors()); 

// app.get(route, callback)
app.get('/', (req, res) => {
    res.send("my first express server!");
}); 

app.use('/api', require('./routes.js')); 

//app.listen(port, [host], [backlog], [callback]])
app.listen(port, () => console.log(`server started on port ${port}`));