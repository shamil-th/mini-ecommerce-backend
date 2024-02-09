const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connect')

const app = express();


dotenv.config()
const PORT = process.env.PORT || 8080


app.use(morgan('tiny'));

// mongodb connection
connectDB();


app.use(express.json());

app.use(cors());

app.use(bodyparser.urlencoded({extended:true}))

app.use("/products", express.static(path.resolve(__dirname,"products")));
app.use("/cart", express.static(path.resolve(__dirname,"cart")));

app.use('/products',require('./server/routes/productRouter'));
app.use('/cart',require('./server/routes/cartRouter'));


app.listen(PORT, () => {
    console.log(`app is running on port http://localhost:${PORT}`);
})