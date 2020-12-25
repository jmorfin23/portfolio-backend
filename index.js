const express = require('express'); 
const app = express(); 
const cors = require('cors');  
const PORT = process.env.PORT || 5000; 
const rateLimit = require("express-rate-limit");
 
 
const limiter = rateLimit({
  windowMs: 86400000, // 1 day 
  max: 3
});

app.use(cors()); 

// app.get(route, callback)
app.get('/', (req, res) => {
    res.send("My express server!");
}); 

app.use('/api', limiter,  require('./routes.js')); 

//app.listen(port, [host], [backlog], [callback]])
app.listen(PORT , () => console.log(`server started on port ${PORT}`));