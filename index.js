const express = require('express'); 
const app = express(); 
const cors = require('cors');  
const PORT = process.env.PORT || 5000; 
app.use(cors()); 

// app.get(route, callback)
app.get('/', (req, res) => {
    res.send("My express server!");
}); 

app.use('/api', require('./routes.js')); 

//app.listen(port, [host], [backlog], [callback]])
app.listen(PORT , () => console.log(`server started on port ${PORT}`));