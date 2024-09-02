const express = require('express');
const cors = require('cors');
const router = require('./routes/index.js');
const morgan = require('morgan');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();   

const app = express();  
const corsOptions = {
  origin: [process.env.CLIENT_PORT_LOCAL,process.env.ADMIN_PORT_LOCAL],
  credentials: true, 
};
app.use(cors(corsOptions));    
// app.use(cors());    
app.use(express.json());   
app.use(express.static(path.join(__dirname, "./middlewares/public"))); 
morgan.token("custom-date", (req, res) => {   
  return new Date().toUTCString(); 
});
app.use(
  morgan(
    ":custom-date :method :url :status :res[content-length] - :response-time ms"
  )
);
console.log(morgan);
app.use('/api',router);

module.exports = app;
